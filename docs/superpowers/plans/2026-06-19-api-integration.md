# API Integration Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace all mock/localStorage data in TabunganQurban with real API calls to BackendDKM at `https://api.masjidkassiti.id/v1/`.

**Architecture:** API service layer (`src/services/`) wrapping native `fetch()`, consumed by refactored Pinia store (`src/stores/qurban.js`). API-first with localStorage cache fallback only when server is unreachable. Loading skeletons, error toasts, and retry buttons for all async operations.

**Tech Stack:** Vue 3, Pinia, native fetch API, Vite env vars, TailwindCSS v4

## Global Constraints

- No new HTTP library (no axios) — use native `fetch()` with thin wrapper
- All Qurban endpoints are public (no auth headers needed)
- Use snake_case field names from API directly in views (no client-side rename)
- Base URL configured via `VITE_API_BASE_URL` environment variable
- Cache fallback banner only shows when API actually fails (not time-based)
- Preserve all existing UI/animations — only change data source and add loading/error states

---

### Task 1: Environment Configuration & API Service Layer

**Files:**
- Create: `src/services/api.js`
- Create: `src/services/qurbanApi.js`
- Create: `.env`
- Create: `.env.example`

**Interfaces:**
- Produces:
  - `apiGet(endpoint: string, params?: object): Promise<{ success: boolean, data: any, message: string }>`
  - `apiPost(endpoint: string, body?: object): Promise<{ success: boolean, data: any, message: string }>`
  - `fetchDashboardStats(): Promise<{ period, summary, animals, pending_transactions, recent_transactions }>`
  - `fetchShohibuls(filters?: { search?, status?, type? }): Promise<Shohibul[]>`
  - `fetchShohibulDetail(id: number): Promise<Shohibul>`
  - `searchShohibuls(query: string): Promise<{ id, name, phone, address }[]>`
  - `registerShohibul(payload: { name, phone, address, target_type, initial_amount, payment_method }): Promise<{ shohibul, transaction, payment }>`
  - `fetchTransactions(filters?: { status?, payment_method?, date_from?, date_to?, per_page?, page? }): Promise<PaginatedResponse>`
  - `createDeposit(payload: { shohibul_id, amount, payment_method }): Promise<{ transaction, payment }>`
  - `fetchActivePeriod(): Promise<Period>`
  - `fetchAnimalGroups(): Promise<AnimalGroup[]>`

- [ ] **Step 1: Create `.env` and `.env.example`**

Create `.env`:
```
VITE_API_BASE_URL=https://api.masjidkassiti.id/v1
```

Create `.env.example`:
```
VITE_API_BASE_URL=https://api.masjidkassiti.id/v1
```

- [ ] **Step 2: Create `src/services/api.js`**

```js
const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://api.masjidkassiti.id/v1'
const TIMEOUT_MS = 10000

class ApiError extends Error {
  constructor(message, status, errors = null) {
    super(message)
    this.name = 'ApiError'
    this.status = status
    this.errors = errors
  }
}

async function request(endpoint, options = {}) {
  const controller = new AbortController()
  const timeoutId = setTimeout(() => controller.abort(), TIMEOUT_MS)

  const url = new URL(`${BASE_URL}${endpoint}`)

  if (options.params) {
    Object.entries(options.params).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== '') {
        url.searchParams.append(key, value)
      }
    })
  }

  try {
    const response = await fetch(url.toString(), {
      ...options,
      signal: controller.signal,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        ...options.headers,
      },
    })

    const data = await response.json()

    if (!response.ok) {
      throw new ApiError(
        data.message || `Request failed with status ${response.status}`,
        response.status,
        data.errors || null
      )
    }

    return data
  } catch (error) {
    if (error instanceof ApiError) throw error
    if (error.name === 'AbortError') {
      throw new ApiError('Koneksi timeout. Periksa jaringan Anda.', 0)
    }
    throw new ApiError('Tidak dapat terhubung ke server.', 0)
  } finally {
    clearTimeout(timeoutId)
  }
}

export async function apiGet(endpoint, params = {}) {
  return request(endpoint, { method: 'GET', params })
}

export async function apiPost(endpoint, body = {}) {
  return request(endpoint, {
    method: 'POST',
    body: JSON.stringify(body),
  })
}

export { ApiError }
```

- [ ] **Step 3: Create `src/services/qurbanApi.js`**

```js
import { apiGet, apiPost } from './api.js'

// Dashboard
export function fetchDashboardStats() {
  return apiGet('/qurban/dashboard/stats')
}

// Period config
export function fetchActivePeriod() {
  return apiGet('/qurban/config/active')
}

// Shohibuls
export function fetchShohibuls(filters = {}) {
  return apiGet('/qurban/shohibuls', filters)
}

export function fetchShohibulDetail(id) {
  return apiGet(`/qurban/shohibuls/${id}`)
}

export function searchShohibuls(query) {
  return apiGet('/qurban/shohibuls/search', { q: query })
}

export function registerShohibul(payload) {
  return apiPost('/qurban/shohibuls/register', payload)
}

// Transactions
export function fetchTransactions(filters = {}) {
  return apiGet('/qurban/transactions', filters)
}

export function createDeposit(payload) {
  return apiPost('/qurban/transactions/deposit', payload)
}

// Animal Groups
export function fetchAnimalGroups() {
  return apiGet('/qurban/groups')
}
```

- [ ] **Step 4: Verify API connectivity**

Run from browser console or a quick test:
```bash
curl -s https://api.masjidkassiti.id/v1/qurban/dashboard/stats | head -c 200
```
Expected: JSON response with `{ success: true, data: { period: ..., summary: ... } }`

- [ ] **Step 5: Commit**

```bash
git add src/services/ .env .env.example
git commit -m "feat: add API service layer with fetch wrapper and qurban API functions"
```

---

### Task 2: Toast Notification System

**Files:**
- Create: `src/composables/useToast.js`
- Create: `src/components/ui/ToastNotification.vue`
- Modify: `src/App.vue`

**Interfaces:**
- Produces:
  - `useToast(): { toasts: Ref<Toast[]>, success(msg: string): void, error(msg: string): void, warning(msg: string): void }`
  - `<ToastNotification />` — global component, no props needed

- [ ] **Step 1: Create `src/composables/useToast.js`**

```js
import { ref } from 'vue'

const toasts = ref([])
let toastId = 0

function addToast(message, type = 'info', duration = 4000) {
  const id = ++toastId
  toasts.value.push({ id, message, type, visible: true })

  // Max 3 visible
  if (toasts.value.length > 3) {
    toasts.value.shift()
  }

  setTimeout(() => {
    removeToast(id)
  }, duration)
}

function removeToast(id) {
  const index = toasts.value.findIndex(t => t.id === id)
  if (index !== -1) {
    toasts.value[index].visible = false
    setTimeout(() => {
      toasts.value = toasts.value.filter(t => t.id !== id)
    }, 300)
  }
}

export function useToast() {
  return {
    toasts,
    success: (msg) => addToast(msg, 'success'),
    error: (msg) => addToast(msg, 'error', 6000),
    warning: (msg) => addToast(msg, 'warning', 5000),
    remove: removeToast,
  }
}
```

- [ ] **Step 2: Create `src/components/ui/ToastNotification.vue`**

```vue
<template>
  <Teleport to="body">
    <div class="fixed top-4 left-1/2 -translate-x-1/2 sm:left-auto sm:translate-x-0 sm:right-4 z-[100] flex flex-col gap-2 w-[90vw] sm:w-80 pointer-events-none">
      <TransitionGroup name="toast">
        <div
          v-for="toast in toasts"
          :key="toast.id"
          class="pointer-events-auto rounded-xl px-4 py-3 shadow-lg border backdrop-blur-xl flex items-start gap-3 cursor-pointer transition-all duration-300"
          :class="toastClasses(toast.type)"
          @click="remove(toast.id)"
        >
          <div class="shrink-0 mt-0.5">
            <svg v-if="toast.type === 'success'" class="w-5 h-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <svg v-else-if="toast.type === 'error'" class="w-5 h-5 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <svg v-else class="w-5 h-5 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>
          <p class="text-sm font-medium leading-tight flex-1">{{ toast.message }}</p>
        </div>
      </TransitionGroup>
    </div>
  </Teleport>
</template>

<script setup>
import { useToast } from '@/composables/useToast'

const { toasts, remove } = useToast()

const toastClasses = (type) => ({
  'bg-white/95 dark:bg-gray-800/95 border-green-200 dark:border-green-800/40 text-green-800 dark:text-green-200': type === 'success',
  'bg-white/95 dark:bg-gray-800/95 border-red-200 dark:border-red-800/40 text-red-800 dark:text-red-200': type === 'error',
  'bg-white/95 dark:bg-gray-800/95 border-amber-200 dark:border-amber-800/40 text-amber-800 dark:text-amber-200': type === 'warning',
})
</script>

<style scoped>
.toast-enter-active {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}
.toast-leave-active {
  transition: all 0.3s cubic-bezier(0.4, 0, 1, 1);
}
.toast-enter-from {
  opacity: 0;
  transform: translateY(-12px) scale(0.95);
}
.toast-leave-to {
  opacity: 0;
  transform: translateY(-8px) scale(0.95);
}
.toast-move {
  transition: transform 0.3s ease;
}
</style>
```

- [ ] **Step 3: Mount ToastNotification in `src/App.vue`**

Add import and component at the top of `<script setup>`:
```js
import ToastNotification from '@/components/ui/ToastNotification.vue'
```

Add `<ToastNotification />` just inside the root div in template (after the closing `</div>` of the dark mode wrapper, before the template end):
```vue
<!-- Inside template, after the main dark wrapper div -->
<ToastNotification />
```

- [ ] **Step 4: Commit**

```bash
git add src/composables/useToast.js src/components/ui/ToastNotification.vue src/App.vue
git commit -m "feat: add toast notification system"
```

---

### Task 3: Loading Skeleton & Error Retry Components

**Files:**
- Create: `src/components/ui/LoadingSkeleton.vue`
- Create: `src/components/ui/RetryError.vue`
- Create: `src/components/ui/StaleBanner.vue`

**Interfaces:**
- Produces:
  - `<LoadingSkeleton variant="card|row|chart" :count="number" />` — skeleton loader
  - `<RetryError message="string" @retry="callback" />` — error state with retry button
  - `<StaleBanner :lastFetched="timestamp" @refresh="callback" />` — stale data cache banner

- [ ] **Step 1: Create `src/components/ui/LoadingSkeleton.vue`**

```vue
<template>
  <div class="animate-pulse">
    <!-- Card variant: dashboard stat cards -->
    <template v-if="variant === 'card'">
      <div v-for="i in count" :key="i" class="bg-gray-200 dark:bg-white/[0.06] rounded-[1.5rem] h-32 mb-3"></div>
    </template>

    <!-- Row variant: list items -->
    <template v-else-if="variant === 'row'">
      <div v-for="i in count" :key="i" class="flex items-center gap-3 py-3 px-3">
        <div class="w-10 h-10 rounded-[1rem] bg-gray-200 dark:bg-white/[0.06] shrink-0"></div>
        <div class="flex-1 space-y-2">
          <div class="h-3 bg-gray-200 dark:bg-white/[0.06] rounded-full w-3/4"></div>
          <div class="h-2.5 bg-gray-200 dark:bg-white/[0.06] rounded-full w-1/2"></div>
        </div>
        <div class="h-4 bg-gray-200 dark:bg-white/[0.06] rounded-full w-16"></div>
      </div>
    </template>

    <!-- Chart variant: chart area -->
    <template v-else-if="variant === 'chart'">
      <div class="bg-gray-200 dark:bg-white/[0.06] rounded-[1.5rem] h-48 mb-3"></div>
    </template>

    <!-- Hero variant: main dashboard hero card -->
    <template v-else-if="variant === 'hero'">
      <div class="bg-gray-200 dark:bg-white/[0.06] rounded-[2rem] h-64 mb-3"></div>
    </template>

    <!-- Stats variant: quick stats row -->
    <template v-else-if="variant === 'stats'">
      <div class="bg-gray-200 dark:bg-white/[0.06] rounded-[1.5rem] h-24 mb-3"></div>
    </template>
  </div>
</template>

<script setup>
defineProps({
  variant: {
    type: String,
    default: 'card',
    validator: (v) => ['card', 'row', 'chart', 'hero', 'stats'].includes(v)
  },
  count: {
    type: Number,
    default: 1
  }
})
</script>
```

- [ ] **Step 2: Create `src/components/ui/RetryError.vue`**

```vue
<template>
  <div class="flex flex-col items-center justify-center py-12 px-4 text-center">
    <div class="w-14 h-14 rounded-full bg-amber-100 dark:bg-amber-900/20 flex items-center justify-center mb-4">
      <svg class="w-7 h-7 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
      </svg>
    </div>
    <p class="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">{{ message }}</p>
    <p class="text-xs text-gray-500 dark:text-gray-500 mb-4">Periksa koneksi internet Anda dan coba lagi.</p>
    <button
      @click="$emit('retry')"
      class="px-5 py-2.5 bg-primary hover:bg-primary/90 text-white rounded-xl text-sm font-bold transition-colors shadow-md"
    >
      Coba Lagi
    </button>
  </div>
</template>

<script setup>
defineProps({
  message: {
    type: String,
    default: 'Gagal memuat data'
  }
})
defineEmits(['retry'])
</script>
```

- [ ] **Step 3: Create `src/components/ui/StaleBanner.vue`**

```vue
<template>
  <div
    v-if="visible"
    class="flex items-center justify-between gap-2 px-4 py-2.5 mb-3 bg-amber-50 dark:bg-amber-900/10 border border-amber-200 dark:border-amber-800/30 rounded-xl text-amber-800 dark:text-amber-300"
  >
    <div class="flex items-center gap-2 text-xs font-medium">
      <svg class="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
      <span>Menampilkan data tersimpan</span>
    </div>
    <button
      @click="$emit('refresh')"
      class="shrink-0 px-3 py-1 bg-amber-200/50 dark:bg-amber-800/30 hover:bg-amber-200 dark:hover:bg-amber-800/50 rounded-lg text-xs font-bold transition-colors"
    >
      Refresh ↻
    </button>
  </div>
</template>

<script setup>
defineProps({
  visible: {
    type: Boolean,
    default: false
  }
})
defineEmits(['refresh'])
</script>
```

- [ ] **Step 4: Commit**

```bash
git add src/components/ui/LoadingSkeleton.vue src/components/ui/RetryError.vue src/components/ui/StaleBanner.vue
git commit -m "feat: add loading skeleton, error retry, and stale banner components"
```

---

### Task 4: Refactor Pinia Store

**Files:**
- Modify: `src/stores/qurban.js`

**Interfaces:**
- Consumes: All functions from `src/services/qurbanApi.js` (Task 1)
- Produces:
  - State: `period`, `dashboardStats`, `shohibuls`, `transactions`, `animalGroups`, `loading`, `error`, `lastFetched`, `isFromCache`
  - Getters: `totalCollected`, `totalTarget`, `progressPercentage`, `totalLunas`, `totalProses`, `sapiCount`, `kambingCount`, `activePeriod`, `daysRemaining`, `animalPrices`, `isLoading`, `totalShohibul`
  - Actions: `fetchDashboard()`, `fetchShohibuls(filters)`, `fetchShohibulDetail(id)`, `fetchTransactions(filters)`, `fetchPeriodConfig()`, `registerShohibul(payload)`, `createDeposit(payload)`, `saveToCache(key, data)`, `loadFromCache(key)`

- [ ] **Step 1: Rewrite `src/stores/qurban.js`**

Replace the entire file with:

```js
import { defineStore } from 'pinia'
import * as qurbanApi from '@/services/qurbanApi.js'

const CACHE_KEYS = {
  dashboard: 'qurban_cache_dashboard',
  shohibuls: 'qurban_cache_shohibuls',
  transactions: 'qurban_cache_transactions',
  period: 'qurban_cache_period',
  groups: 'qurban_cache_groups',
}

export const useQurbanStore = defineStore('qurban', {
  state: () => ({
    // Data from API
    period: null,
    dashboardStats: null,
    shohibuls: [],
    transactions: [],
    transactionsPagination: null,
    animalGroups: [],

    // UI
    isDarkMode: false,

    // Loading states
    loading: {
      dashboard: false,
      shohibuls: false,
      transactions: false,
      deposit: false,
      period: false,
    },

    // Error states
    error: {
      dashboard: null,
      shohibuls: null,
      transactions: null,
    },

    // Cache metadata
    lastFetched: {
      dashboard: null,
      shohibuls: null,
      transactions: null,
    },
    isFromCache: false,
  }),

  getters: {
    // Dashboard summary — from API
    totalCollected: (state) => Number(state.dashboardStats?.summary?.total_collected ?? 0),
    totalTarget: (state) => Number(state.dashboardStats?.summary?.total_target ?? 0),
    progressPercentage: (state) => state.dashboardStats?.summary?.percentage ?? 0,
    totalLunas: (state) => state.dashboardStats?.summary?.count_lunas ?? 0,
    totalProses: (state) => state.dashboardStats?.summary?.count_belum_lunas ?? 0,
    totalShohibul: (state) => state.dashboardStats?.summary?.total_shohibul ?? state.shohibuls.length,

    // Animal counts
    sapiCount: (state) => state.dashboardStats?.animals?.sapi_shohibul ?? 0,
    kambingCount: (state) => state.dashboardStats?.animals?.kambing_shohibul ?? 0,
    sapiGroups: (state) => state.dashboardStats?.animals?.sapi_groups ?? 0,

    // Period info
    activePeriod: (state) => state.dashboardStats?.period ?? null,
    daysRemaining: (state) => state.dashboardStats?.period?.days_remaining ?? 0,

    // Prices from period config
    animalPrices: (state) => ({
      sapi: Number(state.period?.sapi_price_per_slot ?? 0),
      kambing: Number(state.period?.kambing_price ?? 0),
    }),

    // Convenience
    isLoading: (state) => Object.values(state.loading).some(v => v),

    // Recent transactions from dashboard stats
    recentTransactions: (state) => state.dashboardStats?.recent_transactions ?? [],

    // Pending count
    pendingTransactions: (state) => state.dashboardStats?.pending_transactions ?? 0,

    // targetTotal — computed from API data for backward compatibility
    targetTotal() {
      return this.totalTarget
    },
  },

  actions: {
    // ==================== FETCH ACTIONS ====================

    async fetchDashboard() {
      this.loading.dashboard = true
      this.error.dashboard = null

      try {
        const response = await qurbanApi.fetchDashboardStats()
        this.dashboardStats = response.data
        this.isFromCache = false
        this.lastFetched.dashboard = Date.now()
        this.saveToCache(CACHE_KEYS.dashboard, response.data)
      } catch (err) {
        const cached = this.loadFromCache(CACHE_KEYS.dashboard)
        if (cached) {
          this.dashboardStats = cached
          this.isFromCache = true
        } else {
          this.error.dashboard = err.message || 'Gagal memuat dashboard'
        }
      } finally {
        this.loading.dashboard = false
      }
    },

    async fetchShohibuls(filters = {}) {
      this.loading.shohibuls = true
      this.error.shohibuls = null

      try {
        const response = await qurbanApi.fetchShohibuls(filters)
        this.shohibuls = response.data
        this.isFromCache = false
        this.lastFetched.shohibuls = Date.now()
        this.saveToCache(CACHE_KEYS.shohibuls, response.data)
      } catch (err) {
        const cached = this.loadFromCache(CACHE_KEYS.shohibuls)
        if (cached) {
          this.shohibuls = cached
          this.isFromCache = true
        } else {
          this.error.shohibuls = err.message || 'Gagal memuat data shohibul'
        }
      } finally {
        this.loading.shohibuls = false
      }
    },

    async fetchShohibulDetail(id) {
      this.loading.shohibuls = true
      try {
        const response = await qurbanApi.fetchShohibulDetail(id)
        return response.data
      } catch (err) {
        throw err
      } finally {
        this.loading.shohibuls = false
      }
    },

    async fetchTransactions(filters = {}) {
      this.loading.transactions = true
      this.error.transactions = null

      try {
        const response = await qurbanApi.fetchTransactions(filters)
        this.transactions = response.data.data || []
        this.transactionsPagination = {
          currentPage: response.data.current_page,
          lastPage: response.data.last_page,
          perPage: response.data.per_page,
          total: response.data.total,
        }
        this.isFromCache = false
        this.lastFetched.transactions = Date.now()
        this.saveToCache(CACHE_KEYS.transactions, {
          data: this.transactions,
          pagination: this.transactionsPagination,
        })
      } catch (err) {
        const cached = this.loadFromCache(CACHE_KEYS.transactions)
        if (cached) {
          this.transactions = cached.data || []
          this.transactionsPagination = cached.pagination || null
          this.isFromCache = true
        } else {
          this.error.transactions = err.message || 'Gagal memuat transaksi'
        }
      } finally {
        this.loading.transactions = false
      }
    },

    async fetchPeriodConfig() {
      this.loading.period = true
      try {
        const response = await qurbanApi.fetchActivePeriod()
        this.period = response.data
        this.saveToCache(CACHE_KEYS.period, response.data)
      } catch (err) {
        const cached = this.loadFromCache(CACHE_KEYS.period)
        if (cached) {
          this.period = cached
        }
      } finally {
        this.loading.period = false
      }
    },

    async fetchAnimalGroups() {
      try {
        const response = await qurbanApi.fetchAnimalGroups()
        this.animalGroups = response.data
        this.saveToCache(CACHE_KEYS.groups, response.data)
      } catch (err) {
        const cached = this.loadFromCache(CACHE_KEYS.groups)
        if (cached) {
          this.animalGroups = cached
        }
      }
    },

    // ==================== MUTATION ACTIONS ====================

    async registerShohibul(payload) {
      this.loading.deposit = true
      try {
        const response = await qurbanApi.registerShohibul(payload)
        // Refresh data after successful registration
        this.fetchDashboard()
        this.fetchShohibuls()
        return response.data
      } catch (err) {
        throw err
      } finally {
        this.loading.deposit = false
      }
    },

    async createDeposit(payload) {
      this.loading.deposit = true
      try {
        const response = await qurbanApi.createDeposit(payload)
        // Refresh data after successful deposit
        this.fetchDashboard()
        this.fetchShohibuls()
        return response.data
      } catch (err) {
        throw err
      } finally {
        this.loading.deposit = false
      }
    },

    // ==================== SEARCH ====================

    async searchShohibuls(query) {
      if (!query || query.length < 2) return []
      try {
        const response = await qurbanApi.searchShohibuls(query)
        return response.data
      } catch {
        return []
      }
    },

    // ==================== CACHE HELPERS ====================

    saveToCache(key, data) {
      try {
        localStorage.setItem(key, JSON.stringify({
          data,
          timestamp: Date.now(),
        }))
      } catch {
        // localStorage full or unavailable — silently ignore
      }
    },

    loadFromCache(key) {
      try {
        const raw = localStorage.getItem(key)
        if (!raw) return null
        const parsed = JSON.parse(raw)
        return parsed.data
      } catch {
        return null
      }
    },

    // ==================== INITIALIZATION ====================

    async initializeStore() {
      // Fetch all data in parallel
      await Promise.allSettled([
        this.fetchDashboard(),
        this.fetchShohibuls(),
        this.fetchPeriodConfig(),
      ])
    },

    // ==================== UTILITY (unchanged) ====================

    formatRupiah(value) {
      if (value === undefined || value === null) return 'Rp0'
      value = Number(value)
      if (value >= 1000000 && value % 100000 === 0) {
        const million = value / 1000000
        return `${million.toFixed(million % 1 === 0 ? 0 : 1)} jt`
      } else if (value >= 1000 && value < 1000000 && value % 1000 === 0) {
        return `${value / 1000} rb`
      }
      return 'Rp' + value.toLocaleString('id-ID')
    },

    formatRupiahFull(value) {
      if (value === undefined || value === null) return 'Rp0'
      value = Number(value)
      return 'Rp' + value.toLocaleString('id-ID').replace(/,/g, '.')
    },

    toggleTheme() {
      this.isDarkMode = !this.isDarkMode
      if (this.isDarkMode) {
        document.documentElement.classList.add('dark')
        localStorage.setItem('theme', 'dark')
      } else {
        document.documentElement.classList.remove('dark')
        localStorage.setItem('theme', 'light')
      }
    },

    initializeTheme() {
      const savedTheme = localStorage.getItem('theme')
      if (savedTheme === 'dark') {
        this.isDarkMode = true
        document.documentElement.classList.add('dark')
      } else {
        this.isDarkMode = false
        document.documentElement.classList.remove('dark')
        if (!savedTheme) {
          localStorage.setItem('theme', 'light')
        }
      }
    },
  },
})
```

- [ ] **Step 2: Update `src/App.vue` to use async initializeStore**

In `<script setup>`, change `store.initializeStore()` from synchronous to async:

```js
// Before:
store.initializeStore()

// After:
store.initializeStore()  // Already async, fires and awaits in background — no change needed in call site
```

(No actual code change needed — the call is fire-and-forget and the store reactivity handles the rest.)

- [ ] **Step 3: Commit**

```bash
git add src/stores/qurban.js
git commit -m "feat: refactor pinia store to use real API with cache fallback"
```

---

### Task 5: Update DashboardView

**Files:**
- Modify: `src/views/DashboardView.vue`

**Interfaces:**
- Consumes: Store getters (`totalCollected`, `totalTarget`, `progressPercentage`, `totalLunas`, `totalProses`, `sapiCount`, `kambingCount`, `sapiGroups`, `recentTransactions`), store state (`loading.dashboard`, `error.dashboard`, `isFromCache`), `LoadingSkeleton`, `RetryError`, `StaleBanner`

- [ ] **Step 1: Add imports and loading/error handling**

At the top of `<script setup>`, add imports:

```js
import LoadingSkeleton from '@/components/ui/LoadingSkeleton.vue'
import RetryError from '@/components/ui/RetryError.vue'
import StaleBanner from '@/components/ui/StaleBanner.vue'
```

Add a fetch-on-mount call:

```js
onMounted(async () => {
  await store.fetchDashboard()

  // Animate after data is loaded
  gsap.to(animatedStats, {
    shohibuls: store.totalShohibul,
    lunas: store.totalLunas,
    proses: store.totalProses,
    collected: store.totalCollected,
    percentage: store.progressPercentage,
    duration: 1.8,
    ease: 'power3.out'
  })

  ctx = gsap.context(() => {
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })
    tl.from('.hero-card', { opacity: 0, y: -20, duration: 0.6 })
      .from('.quick-actions > a', { opacity: 0, scale: 0.9, stagger: 0.08, duration: 0.4 }, '-=0.3')
      .from('.recent-payments-list', { opacity: 0, y: 30, duration: 0.5 }, '-=0.2')
  }, containerRef.value)
})
```

- [ ] **Step 2: Update template — add loading skeleton and error state**

Wrap the main content in conditional rendering:

```vue
<!-- At top of template, inside container div -->
<StaleBanner :visible="store.isFromCache" @refresh="store.fetchDashboard()" />

<!-- Loading state -->
<template v-if="store.loading.dashboard && !store.dashboardStats">
  <LoadingSkeleton variant="hero" />
  <LoadingSkeleton variant="stats" />
  <LoadingSkeleton variant="row" :count="5" />
</template>

<!-- Error state (no cached data) -->
<template v-else-if="store.error.dashboard && !store.dashboardStats">
  <RetryError :message="store.error.dashboard" @retry="store.fetchDashboard()" />
</template>

<!-- Data loaded -->
<template v-else>
  <!-- existing dashboard content -->
</template>
```

- [ ] **Step 3: Update field references in template**

Replace mock field references:

1. `store.shohibuls.length` → `store.totalShohibul`
2. `store.targetTotal` → `store.targetTotal` (getter is backward-compatible)
3. `store.totalCollected` → `store.totalCollected` (getter reads from dashboardStats now)
4. `store.progressPercentage` → `store.progressPercentage` (same)
5. `Math.ceil(store.sapiCount / 7)` → `store.sapiGroups` (API gives us sapi group count directly)
6. `store.kambingCount` → `store.kambingCount` (same)
7. `store.transactions.slice(0, 5)` → `store.recentTransactions` (comes from dashboard stats API)

- [ ] **Step 4: Update transaction list field references**

In the recent transactions section, update field names:

```vue
<!-- Before -->
{{ getTxShohibul(tx).type }}
{{ tx.shohibulId }}
{{ tx.paymentMethod }}

<!-- After — API transactions include shohibul relation -->
{{ tx.shohibul?.target_type }}
{{ tx.shohibul_id }}
{{ tx.payment_method }}
```

Update `getTxShohibul` function:
```js
// Before:
const getTxShohibul = (tx) => {
  return store.shohibuls.find(s => s.id === tx.shohibulId) || {}
}

// After — API transactions already embed shohibul data:
const getTxShohibul = (tx) => {
  return tx.shohibul || store.shohibuls.find(s => s.id === tx.shohibul_id) || {}
}
```

Update `getAnimalEmoji`:
```js
// Before: getAnimalEmoji(getTxShohibul(tx).type)
// After:  getAnimalEmoji(getTxShohibul(tx).target_type)
```

Update `getMaskedPhone` — transactions from dashboard stats may have shohibul name but phone comes from shohibul object:
```js
// No change needed — getMaskedPhone already handles null
```

- [ ] **Step 5: Update watcher**

```js
// Before:
watch(() => store.totalCollected, (newVal) => { ... store.shohibuls.length ... })

// After:
watch(() => store.totalCollected, (newVal) => {
  gsap.to(animatedStats, {
    shohibuls: store.totalShohibul,
    lunas: store.totalLunas,
    proses: store.totalProses,
    collected: newVal,
    percentage: store.progressPercentage,
    duration: 1.2,
    ease: 'power3.out'
  })
})
```

- [ ] **Step 6: Update receipt modal field references**

In the receipt modal, update:
```vue
<!-- Before -->
{{ selectedTx.paymentMethod || 'Tunai/Transfer' }}
{{ selectedTx.shohibulId }}

<!-- After -->
{{ selectedTx.payment_method || 'Tunai/Transfer' }}
{{ selectedTx.shohibul_id }}
```

Update `continuePayment`:
```js
// Before:
const shohibulId = selectedTx.value.shohibulId

// After:
const shohibulId = selectedTx.value.shohibul_id
```

- [ ] **Step 7: Test and commit**

```bash
npm run dev
# Verify: dashboard loads data from API, skeletons show during loading, error state with retry works
git add src/views/DashboardView.vue
git commit -m "feat: wire DashboardView to real API with loading/error states"
```

---

### Task 6: Update ShohibulView

**Files:**
- Modify: `src/views/ShohibulView.vue`

**Interfaces:**
- Consumes: Store `shohibuls`, `loading.shohibuls`, `error.shohibuls`, `isFromCache`, `fetchShohibuls()`, `LoadingSkeleton`, `RetryError`, `StaleBanner`

- [ ] **Step 1: Read ShohibulView.vue and identify all mock field references**

Read `src/views/ShohibulView.vue` and identify every occurrence of:
- `item.type` → change to `item.target_type`
- `item.collected` → change to `item.collected_amount` (and cast to Number)
- `item.target` → change to `item.target_amount` (and cast to Number)
- `item.animalGroup` → change to `item.animal_group?.name`
- `item.lastPaymentMonth` → change to `item.last_payment_month`
- `item.code` → remove (not in API, use address or remove)
- Any reference to `item.collected >= item.target` → use `item.is_lunas` from API

- [ ] **Step 2: Add imports and loading/error UI**

Add at top of `<script setup>`:
```js
import LoadingSkeleton from '@/components/ui/LoadingSkeleton.vue'
import RetryError from '@/components/ui/RetryError.vue'
import StaleBanner from '@/components/ui/StaleBanner.vue'
```

Add `onMounted` fetch:
```js
onMounted(() => {
  if (store.shohibuls.length === 0) {
    store.fetchShohibuls()
  }
})
```

Add to template top:
```vue
<StaleBanner :visible="store.isFromCache" @refresh="store.fetchShohibuls()" />
```

Wrap list content:
```vue
<template v-if="store.loading.shohibuls && store.shohibuls.length === 0">
  <LoadingSkeleton variant="row" :count="8" />
</template>
<template v-else-if="store.error.shohibuls && store.shohibuls.length === 0">
  <RetryError :message="store.error.shohibuls" @retry="store.fetchShohibuls()" />
</template>
<template v-else>
  <!-- existing shohibul list -->
</template>
```

- [ ] **Step 3: Replace all field references**

Do a find-and-replace across the file (apply to computed properties, filters, and template):

| Find | Replace |
|---|---|
| `.type` (on shohibul) | `.target_type` |
| `.collected` (on shohibul) | `.collected_amount` |
| `.target` (on shohibul) | `.target_amount` |
| `.animalGroup` | `.animal_group?.name` |
| `.lastPaymentMonth` | `.last_payment_month` |
| `item.collected >= item.target` | `item.is_lunas` |
| `item.collected < item.target` | `!item.is_lunas` |

For percentage calculations, ensure Number() casting:
```js
// Before:
const pct = (item.collected / item.target) * 100

// After:
const pct = (Number(item.collected_amount) / Number(item.target_amount)) * 100
```

- [ ] **Step 4: Update search/filter to use server-side params**

If the view has local search, update to call API with filter params:
```js
// Before:
const filtered = store.shohibuls.filter(s => s.name.includes(search))

// After — still client-side filter since data is already loaded:
const filtered = computed(() => {
  let list = store.shohibuls
  if (searchQuery.value) {
    const q = searchQuery.value.toLowerCase()
    list = list.filter(s => s.name.toLowerCase().includes(q) || s.address?.toLowerCase().includes(q))
  }
  // ... other filters
  return list
})
```

- [ ] **Step 5: Test and commit**

```bash
npm run dev
# Verify: shohibul list loads from API, filters work, field names display correctly
git add src/views/ShohibulView.vue
git commit -m "feat: wire ShohibulView to real API with loading/error states"
```

---

### Task 7: Update MenabungView

**Files:**
- Modify: `src/views/MenabungView.vue`

**Interfaces:**
- Consumes: Store `registerShohibul(payload)`, `createDeposit(payload)`, `searchShohibuls(query)`, `loading.deposit`, `animalPrices`, `useToast()`

- [ ] **Step 1: Read MenabungView.vue and identify all mock interactions**

Read `src/views/MenabungView.vue` and identify:
- Register form submission → currently calls `store.registerNewShohibul()`
- Deposit form submission → currently calls `store.addTransaction()`
- Shohibul selection → currently from local store data
- Payment method selection
- Any hardcoded prices

- [ ] **Step 2: Add imports**

```js
import { useToast } from '@/composables/useToast'
import LoadingSkeleton from '@/components/ui/LoadingSkeleton.vue'

const toast = useToast()
```

- [ ] **Step 3: Update register form submission**

```js
// Before:
store.registerNewShohibul({ name, address, type, target, initialAmount, paymentMethod })

// After:
async function handleRegister() {
  try {
    const result = await store.registerShohibul({
      name: form.name,
      phone: form.phone,       // NEW field — add phone input to form
      address: form.address,
      target_type: form.type,  // renamed
      initial_amount: form.initialAmount,
      payment_method: form.paymentMethod,
    })

    toast.success('Pendaftaran berhasil! Silakan lakukan pembayaran.')

    // Show payment info from response
    // result.payment contains payment URL/VA/QRIS data from PaKasir
    if (result.payment) {
      showPaymentModal(result)
    }
  } catch (err) {
    toast.error(err.message || 'Gagal mendaftarkan shohibul')
  }
}
```

- [ ] **Step 4: Update deposit form submission**

```js
// Before:
store.addTransaction(shohibulId, amount)

// After:
async function handleDeposit() {
  try {
    const result = await store.createDeposit({
      shohibul_id: selectedShohibul.value.id,
      amount: Number(form.amount),
      payment_method: form.paymentMethod,
    })

    toast.success('Setoran berhasil dibuat! Silakan lakukan pembayaran.')

    // Show payment info
    if (result.payment) {
      showPaymentModal(result)
    }
  } catch (err) {
    toast.error(err.message || 'Gagal membuat setoran')
  }
}
```

- [ ] **Step 5: Update shohibul search/selection**

```js
// Wire search input to API autocomplete
const searchResults = ref([])
const searchLoading = ref(false)

async function onSearchInput(query) {
  if (query.length < 2) {
    searchResults.value = []
    return
  }
  searchLoading.value = true
  searchResults.value = await store.searchShohibuls(query)
  searchLoading.value = false
}
```

- [ ] **Step 6: Add phone field to register form and update field references**

Add phone number input to the register form template. Update all shohibul field references:
- `selectedShohibul.type` → `selectedShohibul.target_type`
- `selectedShohibul.target` → `selectedShohibul.target_amount`
- `selectedShohibul.collected` → `selectedShohibul.collected_amount`
- Remaining amount: use `selectedShohibul.remaining_amount` from API

Update price references:
```js
// Before: store.animalPrices.sapi / store.animalPrices.kambing (hardcoded 4000000/3500000)
// After:  store.animalPrices.sapi / store.animalPrices.kambing (from period API)
```

Add loading state to submit button:
```vue
<button
  @click="handleRegister"
  :disabled="store.loading.deposit"
  class="..."
>
  <span v-if="store.loading.deposit" class="flex items-center gap-2">
    <svg class="animate-spin h-4 w-4" viewBox="0 0 24 24">
      <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" fill="none" />
      <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
    </svg>
    Memproses...
  </span>
  <span v-else>Daftar & Bayar</span>
</button>
```

- [ ] **Step 7: Test and commit**

```bash
npm run dev
# Verify: register form works with API, deposit form works, toast notifications show, loading states work
git add src/views/MenabungView.vue
git commit -m "feat: wire MenabungView to real API with payment flow"
```

---

### Task 8: Update RekapView

**Files:**
- Modify: `src/views/RekapView.vue`

**Interfaces:**
- Consumes: Store `transactions`, `transactionsPagination`, `loading.transactions`, `error.transactions`, `isFromCache`, `fetchTransactions(filters)`, `LoadingSkeleton`, `RetryError`, `StaleBanner`

- [ ] **Step 1: Read RekapView.vue and identify all mock field references**

Read `src/views/RekapView.vue` and identify:
- Transaction field names that need updating
- Any local data computations
- Filter/pagination logic

- [ ] **Step 2: Add imports and loading/error UI**

```js
import LoadingSkeleton from '@/components/ui/LoadingSkeleton.vue'
import RetryError from '@/components/ui/RetryError.vue'
import StaleBanner from '@/components/ui/StaleBanner.vue'
```

Add `onMounted` fetch:
```js
onMounted(() => {
  store.fetchTransactions()
})
```

Template wrapping:
```vue
<StaleBanner :visible="store.isFromCache" @refresh="store.fetchTransactions()" />

<template v-if="store.loading.transactions && store.transactions.length === 0">
  <LoadingSkeleton variant="row" :count="8" />
</template>
<template v-else-if="store.error.transactions && store.transactions.length === 0">
  <RetryError :message="store.error.transactions" @retry="store.fetchTransactions()" />
</template>
<template v-else>
  <!-- existing content -->
</template>
```

- [ ] **Step 3: Replace transaction field references**

| Find | Replace |
|---|---|
| `tx.shohibulId` | `tx.shohibul_id` |
| `tx.paymentMethod` | `tx.payment_method` |
| `tx.date` | `tx.created_at` |
| `tx.name` (from mock) | `tx.shohibul?.name` |

- [ ] **Step 4: Add server-side pagination**

```js
const currentPage = ref(1)
const filters = reactive({
  status: '',
  payment_method: '',
  date_from: '',
  date_to: '',
  per_page: 20,
})

async function loadPage(page) {
  currentPage.value = page
  await store.fetchTransactions({ ...filters, page })
}

async function applyFilters() {
  currentPage.value = 1
  await store.fetchTransactions({ ...filters, page: 1 })
}
```

Add pagination UI at bottom of list:
```vue
<div v-if="store.transactionsPagination && store.transactionsPagination.lastPage > 1" class="flex justify-center gap-2 mt-4">
  <button
    v-for="page in store.transactionsPagination.lastPage"
    :key="page"
    @click="loadPage(page)"
    :class="page === store.transactionsPagination.currentPage ? 'bg-primary text-white' : 'bg-gray-100 dark:bg-white/5 text-gray-600 dark:text-gray-400'"
    class="w-8 h-8 rounded-lg text-xs font-bold transition-colors"
  >
    {{ page }}
  </button>
</div>
```

- [ ] **Step 5: Test and commit**

```bash
npm run dev
# Verify: transactions load from API, pagination works, filters work
git add src/views/RekapView.vue
git commit -m "feat: wire RekapView to real API with pagination and loading states"
```

---

### Task 9: Final Integration Test & Cleanup

**Files:**
- Modify: `src/stores/qurban.js` (cleanup any remaining mock references)
- Possibly: `.gitignore` (ensure `.env` is gitignored)

- [ ] **Step 1: Verify `.env` is in `.gitignore`**

Check if `.env` is already in `.gitignore`:
```bash
grep -n '\.env' .gitignore
```

If not, add it:
```
.env
.env.local
```

- [ ] **Step 2: Clean up old localStorage cache keys**

Add a cleanup action to remove old mock data cache keys on first load:

In `src/stores/qurban.js`, add to `initializeStore()`:
```js
// Clean up legacy mock data keys
['qurban_shohibuls_v4', 'qurban_transactions_v4', 'qurban_shohibuls_v5', 'qurban_transactions_v5'].forEach(key => {
  localStorage.removeItem(key)
})
```

- [ ] **Step 3: Full smoke test**

```bash
npm run dev
```

Test checklist:
1. Dashboard loads with real data from API
2. Skeleton shows during loading
3. Quick stats (shohibul count, lunas, belum lunas) display correctly
4. Recent transactions show with correct names and amounts
5. Shohibul page lists all shohibuls with correct field values
6. Search/filter works on shohibul page
7. Menabung page — register form shows correct prices from API period
8. Menabung page — deposit form searches shohibuls via API
9. Rekap page — transactions load with pagination
10. Disconnect network → refresh → stale banner shows, cached data displays
11. Reconnect → refresh → fresh data loads, stale banner disappears
12. Dark mode works on all new components (skeleton, error, toast, banner)

- [ ] **Step 4: Build check**

```bash
npm run build
```

Expected: Build completes without errors.

- [ ] **Step 5: Final commit**

```bash
git add -A
git commit -m "chore: cleanup legacy mock data and verify API integration"
```
