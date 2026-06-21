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
