import { defineStore } from 'pinia'
import * as settingsApi from '@/services/settingsApi.js'

export const useSettingsStore = defineStore('settings', {
  state: () => ({
    settings: null,
    loading: false,
    error: null,
    lastFetched: null,
  }),

  getters: {
    adminWhatsapp: (state) => {
      if (state.settings.whatsapp && state.settings.whatsapp.length > 0) {
        return state.settings.whatsapp[0].number
      }

      return state.settings.no_whatsapp
    },

    adminWhatsappLink() {
      let number = this.adminWhatsapp
      if (!number) return null

      number = String(number).replace(/\D/g, '')
      if (number.startsWith('0')) {
        number = '62' + number.slice(1)
      } else if (number.startsWith('+62')) {
        number = '62' + number.slice(3)
      }

      return `https://wa.me/${number}`
    }
  },

  actions: {
    async fetchSettings() {
      // Cache untuk 5 menit
      if (this.lastFetched && Date.now() - this.lastFetched < 5 * 60 * 1000) {
        return
      }

      this.loading = true
      this.error = null

      try {
        const response = await settingsApi.fetchSettings()
        this.settings = response.data
        this.lastFetched = Date.now()
      } catch (err) {
        this.error = err.message || 'Gagal memuat pengaturan web'
      } finally {
        this.loading = false
      }
    }
  }
})
