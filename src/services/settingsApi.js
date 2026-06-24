import { apiGet } from './api.js'

export function fetchSettings() {
  return apiGet('/web-profile/settings')
}
