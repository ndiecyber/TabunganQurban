# API Integration: TabunganQurban ↔ BackendDKM

Replace all mock/localStorage data in the TabunganQurban Vue 3 frontend with real API calls to the BackendDKM Laravel backend at `https://api.masjidkassiti.id/v1/`.

## Scope

Only the **Qurban module** public endpoints. No auth/login flow required — all relevant endpoints are public.

### Endpoints Used

| Endpoint | Method | Purpose |
|---|---|---|
| `/qurban/config/active` | GET | Active period config (prices, deadline) |
| `/qurban/dashboard/stats` | GET | Dashboard statistics |
| `/qurban/shohibuls` | GET | List all shohibuls (with filters) |
| `/qurban/shohibuls/search?q=` | GET | Autocomplete search |
| `/qurban/shohibuls/register` | POST | Register new shohibul + initial deposit |
| `/qurban/shohibuls/{id}` | GET | Shohibul detail + transaction history |
| `/qurban/transactions` | GET | List transactions (paginated, filterable) |
| `/qurban/transactions/deposit` | POST | Follow-up deposit for existing shohibul |
| `/qurban/groups` | GET | List animal groups |

## Architecture

### Approach: API Service Layer + Store Refactor

```
View → Store Action → API Service → fetch() → Backend
                ↓                        ↓
          Update State            Cache to localStorage
                ↓
          View Re-renders
```

### New Files

```
src/
├── services/
│   ├── api.js            # Generic fetch wrapper (base URL, headers, error handling, timeout)
│   └── qurbanApi.js      # Qurban-specific API functions (1:1 with endpoints)
├── composables/
│   └── useToast.js       # Toast notification composable (success/error/warning)
├── components/
│   └── ui/
│       ├── ToastNotification.vue   # Toast UI (auto-dismiss, stack, dark mode)
│       ├── LoadingSkeleton.vue     # Reusable skeleton loader (card/row/chart variants)
│       └── RetryError.vue         # Error state with retry button
.env                      # VITE_API_BASE_URL
.env.example              # Template
```

### Modified Files

```
src/
├── stores/qurban.js       # Remove mock data, add API actions, loading/error states, cache
├── views/DashboardView.vue
├── views/ShohibulView.vue
├── views/MenabungView.vue
├── views/RekapView.vue
├── App.vue                # Mount ToastNotification globally
```

---

## API Service Layer

### `api.js` — Generic Fetch Wrapper

- Base URL from `import.meta.env.VITE_API_BASE_URL`
- Default headers: `Accept: application/json`, `Content-Type: application/json`
- 10-second timeout via AbortController
- Response normalization: backend always returns `{ success, message, data, meta }`
- Error normalization: parse error body, throw structured error with message + status code
- Exports: `apiGet(endpoint, params)`, `apiPost(endpoint, body)`

### `qurbanApi.js` — Domain Functions

Each function maps 1:1 to a backend endpoint:

```js
fetchDashboardStats()              // GET /qurban/dashboard/stats
fetchShohibuls(filters)            // GET /qurban/shohibuls
fetchShohibulDetail(id)            // GET /qurban/shohibuls/{id}
searchShohibuls(query)             // GET /qurban/shohibuls/search?q=
registerShohibul(payload)          // POST /qurban/shohibuls/register
fetchTransactions(filters)         // GET /qurban/transactions
createDeposit(payload)             // POST /qurban/transactions/deposit
fetchActivePeriod()                // GET /qurban/config/active
fetchAnimalGroups()                // GET /qurban/groups
```

### Data Mapping Decision

**No client-side field renaming.** Views use snake_case field names directly from API:

| Backend Field | Replaces (Old Mock) |
|---|---|
| `target_type` | `type` |
| `target_amount` | `target` |
| `collected_amount` | `collected` |
| `last_payment_month` | `lastPaymentMonth` |
| `animal_group.name` | `animalGroup` (string) |
| `is_lunas` (computed) | manual check in getter |
| `remaining_amount` (computed) | not available before |
| `id` (integer) | `id` (string "shohibul-XX") |
| `phone` | not available before |

---

## Store Refactor

### State

```js
state: () => ({
  // Data (from API)
  period: null,
  dashboardStats: null,
  shohibuls: [],
  transactions: [],
  animalGroups: [],

  // UI
  isDarkMode: false,

  // Loading (per-resource)
  loading: {
    dashboard: false,
    shohibuls: false,
    transactions: false,
    deposit: false,
    period: false,
  },

  // Errors
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
})
```

### Getters

Most computed values now come directly from `dashboardStats` API response:

- `totalCollected`, `totalTarget`, `progressPercentage` → from `dashboardStats.summary`
- `totalLunas`, `totalProses` → from `dashboardStats.summary.count_lunas` / `count_belum_lunas`
- `sapiCount`, `kambingCount` → from `dashboardStats.animals`
- `activePeriod`, `daysRemaining` → from `dashboardStats.period`
- `animalPrices` → from `period` (sapi_price_per_slot, kambing_price)
- `isLoading` → convenience: any loading state active

Removed: `currentShohibulId`, `currentUser` (no per-user login concept).

### Actions

**Fetch actions** (GET + cache):
- `fetchDashboard()` — fetch stats + period
- `fetchShohibuls(filters)` — fetch list
- `fetchShohibulDetail(id)` — fetch detail + history
- `fetchTransactions(filters)` — fetch paginated
- `fetchPeriodConfig()` — fetch active period

**Mutation actions** (POST):
- `registerShohibul(payload)` — register + return payment info
- `createDeposit(payload)` — deposit + return payment info

**Cache helpers:**
- `saveToCache(key, data)` — localStorage with timestamp
- `loadFromCache(key)` — load if available (no time-based expiry, only used on API failure)

**Utility** (unchanged):
- `formatRupiah()`, `formatRupiahFull()`, `toggleTheme()`, `initializeTheme()`

### Cache Strategy

- **API first**: Always attempt API call.
- **On success**: Update state, save to localStorage cache, mark `isFromCache = false`.
- **On failure**: Try load from localStorage cache, mark `isFromCache = true`.
- **No time-based expiry**: Cache is only a fallback for server unavailability.

---

## UI Components

### ToastNotification

- Composable: `useToast()` → `toast.success(msg)`, `toast.error(msg)`, `toast.warning(msg)`
- Auto-dismiss: 4 seconds
- Stack: max 3 visible, newest on top
- Position: top-center (mobile), top-right (desktop)
- Swipe-to-dismiss on mobile
- Respects dark mode

### LoadingSkeleton

- Prop-driven variants: `card`, `row`, `chart`
- Pulse animation
- Dark mode support

### RetryError

- Props: `message`, `onRetry` callback
- Warm styling (not harsh red)
- If cached data available: shows as small banner, not full-screen error

### Stale Data Banner

- **Only appears when API failed and data is served from cache** (`isFromCache === true`)
- Does NOT appear based on time since last fetch
- Small, non-intrusive banner above page content
- Shows: "Menampilkan data tersimpan" + Refresh button
- Disappears as soon as a successful API call is made

---

## View Updates

### DashboardView

- `onMounted` → `store.fetchDashboard()`
- Skeleton loaders for stat cards and chart while `loading.dashboard`
- Error state + retry if `error.dashboard`
- Replace mock getters with `dashboardStats` API fields
- Period info (deadline, days remaining) from API
- Recent transactions from API response

### ShohibulView

- `onMounted` → `store.fetchShohibuls()`
- Skeleton loaders for list items
- Replace field names: `type` → `target_type`, `collected` → `collected_amount`, etc.
- `animalGroup` from `animal_group.name` relation
- Filter/search: server-side via query params
- Error state + retry

### MenabungView

- Register form → `store.registerShohibul()` → show payment response (VA/QRIS info)
- Deposit form → `store.createDeposit()` → show payment response
- Loading state on submit button (disable + spinner)
- Error handling: toast with API validation messages
- Shohibul search: wired to `searchShohibuls()` API

### RekapView

- `onMounted` → `store.fetchTransactions()`
- Skeleton loaders
- Replace mock transaction fields with API fields
- Pagination support (server-side via `per_page` + page params)
- Error state + retry

---

## Environment Configuration

```env
# .env (production)
VITE_API_BASE_URL=https://api.masjidkassiti.id/v1

# .env.development (local)
VITE_API_BASE_URL=http://api.localhost:8000/v1
```

---

## Out of Scope

- Authentication / admin features (login, edit shohibul, manual deposit, cancel transaction)
- Keuangan module
- Profil Web module
- PWA / service worker offline support
- WebSocket / real-time updates
