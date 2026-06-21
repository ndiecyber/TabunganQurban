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
    cacheStatus: {
      dashboard: false,
      shohibuls: false,
      transactions: false,
    },
  }),

  getters: {
    // Cache
    isFromCache: (state) => Object.values(state.cacheStatus).some(v => v),

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

    // Backward-compatible alias
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
        this.cacheStatus.dashboard = false
        this.lastFetched.dashboard = Date.now()
        this.saveToCache(CACHE_KEYS.dashboard, response.data)
      } catch (err) {
        const cached = this.loadFromCache(CACHE_KEYS.dashboard)
        if (cached) {
          this.dashboardStats = cached
          this.cacheStatus.dashboard = true
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
        this.cacheStatus.shohibuls = false
        this.lastFetched.shohibuls = Date.now()
        this.saveToCache(CACHE_KEYS.shohibuls, response.data)
      } catch (err) {
        const cached = this.loadFromCache(CACHE_KEYS.shohibuls)
        if (cached) {
          this.shohibuls = cached
          this.cacheStatus.shohibuls = true
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
        this.cacheStatus.transactions = false
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
          this.cacheStatus.transactions = true
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
      // Clean up legacy mock data keys
      ['qurban_shohibuls_v4', 'qurban_transactions_v4', 'qurban_shohibuls_v5', 'qurban_transactions_v5'].forEach(key => {
        localStorage.removeItem(key)
      })

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
