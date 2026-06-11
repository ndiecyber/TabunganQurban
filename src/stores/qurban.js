import { defineStore } from 'pinia'

export const useQurbanStore = defineStore('qurban', {
  state: () => ({
    shohibuls: [],
    transactions: [],
    targetTotal: 84000000,
    currentShohibulId: 'shohibul-01', // Logged in user: Budi Santoso
  }),

  getters: {
    totalCollected(state) {
      return state.shohibuls.reduce((sum, item) => sum + item.collected, 0)
    },
    totalLunas(state) {
      return state.shohibuls.filter(item => item.collected >= item.target).length
    },
    totalProses(state) {
      return state.shohibuls.filter(item => item.collected < item.target).length
    },
    progressPercentage() {
      if (this.targetTotal === 0) return 0
      return Math.round((this.totalCollected / this.targetTotal) * 100)
    },
    averageProgress(state) {
      if (state.shohibuls.length === 0) return 0
      const totalPct = state.shohibuls.reduce((sum, item) => {
        const pct = (item.collected / item.target) * 100
        return sum + Math.min(pct, 100)
      }, 0)
      return Math.round(totalPct / state.shohibuls.length)
    },
    sapiCount(state) {
      return state.shohibuls.filter(item => item.type === 'sapi').length
    },
    kambingCount(state) {
      return state.shohibuls.filter(item => item.type === 'kambing').length
    },
    sapiLunasCount(state) {
      return state.shohibuls.filter(item => item.type === 'sapi' && item.collected >= item.target).length
    },
    kambingLunasCount(state) {
      return state.shohibuls.filter(item => item.type === 'kambing' && item.collected >= item.target).length
    },
    currentUser(state) {
      return state.shohibuls.find(item => item.id === 'shohibul-01') || null
    }
  },

  actions: {
    initializeStore() {
      const cachedShohibuls = localStorage.getItem('qurban_shohibuls')
      const cachedTransactions = localStorage.getItem('qurban_transactions')

      if (cachedShohibuls && cachedTransactions) {
        this.shohibuls = JSON.parse(cachedShohibuls)
        this.transactions = JSON.parse(cachedTransactions)
      } else {
        this.loadMockData()
      }
    },

    loadMockData() {
      this.shohibuls = [
        {
          id: 'shohibul-01',
          name: 'Budi Santoso',
          address: 'Rumah A01 - Perumahan Arjamukti',
          code: 'A01',
          type: 'sapi',
          animalGroup: 'Sapi Kelompok A',
          target: 3000000,
          collected: 3000000, // Lunas
          lastPaymentMonth: 'Juni 2025'
        },
        {
          id: 'shohibul-02',
          name: 'Rina Tanjung',
          address: 'Perumahan Arjamukti - C04',
          code: 'C04',
          type: 'kambing',
          animalGroup: 'Kambing Mandiri',
          target: 3000000,
          collected: 3000000, // Lunas
          lastPaymentMonth: 'Mei 2025'
        },
        {
          id: 'shohibul-03',
          name: 'Hendra Kusuma',
          address: 'Perumahan Arjamukti - B02',
          code: 'B02',
          type: 'kambing',
          animalGroup: 'Kambing Mandiri',
          target: 2500000,
          collected: 2500000, // Lunas
          lastPaymentMonth: 'Mei 2025'
        },
        {
          id: 'shohibul-04',
          name: 'Pak Tono',
          address: 'Kavling Hijau - C01',
          code: 'C01',
          type: 'sapi',
          animalGroup: 'Sapi Kelompok A',
          target: 21000000,
          collected: 15000000,
          lastPaymentMonth: 'April 2025'
        },
        {
          id: 'shohibul-05',
          name: 'Ahmad Fauzi',
          address: 'Kavling Hijau - A05',
          code: 'A05',
          type: 'sapi',
          animalGroup: 'Sapi Kelompok A',
          target: 3000000,
          collected: 2000000,
          lastPaymentMonth: 'April 2025'
        },
        {
          id: 'shohibul-06',
          name: 'H. Budi Santoso (Kambing)',
          address: 'Rumah A01 - Perumahan Arjamukti',
          code: 'A01',
          type: 'kambing',
          animalGroup: 'Kambing Mandiri',
          target: 3000000,
          collected: 2000000,
          lastPaymentMonth: 'Mei 2025'
        },
        {
          id: 'shohibul-07',
          name: 'Bu Aminah',
          address: 'Perumahan Arjamukti - D12',
          code: 'D12',
          type: 'kambing',
          animalGroup: 'Kambing Mandiri',
          target: 3000000,
          collected: 1500000,
          lastPaymentMonth: 'Mei 2025'
        },
        {
          id: 'shohibul-08',
          name: 'Siti Rahma',
          address: 'Jl. Masjid Jami No. 10',
          code: 'SM10',
          type: 'kambing',
          animalGroup: 'Kambing Mandiri',
          target: 3000000,
          collected: 1500000,
          lastPaymentMonth: 'April 2025'
        },
        {
          id: 'shohibul-09',
          name: 'Bambang Hermawan',
          address: 'Perumahan Arjamukti - A12',
          code: 'A12',
          type: 'sapi',
          animalGroup: 'Sapi Kelompok B',
          target: 3000000,
          collected: 2000000,
          lastPaymentMonth: 'April 2025'
        },
        {
          id: 'shohibul-10',
          name: 'Joko Susilo',
          address: 'Jl. Melati No. 4',
          code: 'JM04',
          type: 'sapi',
          animalGroup: 'Sapi Kelompok B',
          target: 3000000,
          collected: 1200000,
          lastPaymentMonth: 'Maret 2025'
        },
        {
          id: 'shohibul-11',
          name: 'H. Syamsudin',
          address: 'Kavling Hijau - B09',
          code: 'B09',
          type: 'sapi',
          animalGroup: 'Sapi Kelompok B',
          target: 3000000,
          collected: 2000000,
          lastPaymentMonth: 'Mei 2025'
        },
        {
          id: 'shohibul-12',
          name: 'Pak Yusuf Kusnadi',
          address: 'Perumahan Arjamukti - B15',
          code: 'B15',
          type: 'sapi',
          animalGroup: 'Sapi Kelompok B',
          target: 33500000,
          collected: 20000000,
          lastPaymentMonth: 'April 2025'
        }
      ]
 
      this.transactions = [
        {
          id: 'tx-1',
          shohibulId: 'shohibul-02',
          name: 'Rina Tanjung',
          code: 'C04',
          date: '2026-05-22',
          amount: 500000
        },
        {
          id: 'tx-2',
          shohibulId: 'shohibul-03',
          name: 'Hendra Kusuma',
          code: 'B02',
          date: '2026-05-12',
          amount: 1000000
        },
        {
          id: 'tx-3',
          shohibulId: 'shohibul-01',
          name: 'Budi Santoso',
          code: 'A01',
          date: '2026-05-05',
          amount: 2000000
        },
        {
          id: 'tx-4',
          shohibulId: 'shohibul-02',
          name: 'Rina Tanjung',
          code: 'C04',
          date: '2026-04-22',
          amount: 500000
        },
        {
          id: 'tx-5',
          shohibulId: 'shohibul-04',
          name: 'Pak Tono',
          code: 'C01',
          date: '2026-04-03',
          amount: 3000000
        },
        {
          id: 'tx-6',
          shohibulId: 'shohibul-04',
          name: 'Pak Tono',
          code: 'C01',
          date: '2026-03-03',
          amount: 3000000
        },
        {
          id: 'tx-7',
          shohibulId: 'shohibul-04',
          name: 'Pak Tono',
          code: 'C01',
          date: '2026-02-03',
          amount: 3000000
        },
        {
          id: 'tx-8',
          shohibulId: 'shohibul-04',
          name: 'Pak Tono',
          code: 'C01',
          date: '2026-01-03',
          amount: 3000000
        },
        {
          id: 'tx-9',
          shohibulId: 'shohibul-01',
          name: 'Budi Santoso',
          code: 'A01',
          date: '2026-04-07',
          amount: 2500000
        }
      ]
 
      this.saveToCache()
    },

    saveToCache() {
      localStorage.setItem('qurban_shohibuls', JSON.stringify(this.shohibuls))
      localStorage.setItem('qurban_transactions', JSON.stringify(this.transactions))
    },

    addShohibul(shohibulData) {
      const newId = `shohibul-${this.shohibuls.length + 1}`
      const newShohibul = {
        id: newId,
        collected: 0,
        lastPaymentMonth: '-',
        ...shohibulData
      }
      this.shohibuls.push(newShohibul)
      
      this.targetTotal += shohibulData.target
      
      this.saveToCache()
      return newShohibul
    },

    addTransaction(shohibulId, amount) {
      const shohibulIndex = this.shohibuls.findIndex(item => item.id === shohibulId)
      if (shohibulIndex === -1) return false

      const shohibul = this.shohibuls[shohibulIndex]
      shohibul.collected += amount
      
      const months = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember']
      const now = new Date()
      shohibul.lastPaymentMonth = `Juni 2025` // Lock to match June 2025 in screenshot

      const newTx = {
        id: `tx-${this.transactions.length + 1}`,
        shohibulId: shohibul.id,
        name: shohibul.name,
        code: shohibul.code,
        date: now.toISOString().split('T')[0],
        amount: amount
      }

      this.transactions.unshift(newTx)
      this.saveToCache()
      return true
    },

    formatRupiah(value) {
      if (value === undefined || value === null) return 'Rp0'
      
      // Handle millions/thousands shortcuts like in screenshot (e.g. 500 rb, 1.0 jt, 2.0 jt)
      if (value >= 1000000 && value % 100000 === 0) {
        const million = value / 1000000
        return `${million.toFixed(million % 1 === 0 ? 0 : 1)} jt`
      } else if (value >= 1000 && value < 1000000 && value % 1000 === 0) {
        return `${value / 1000} rb`
      }

      // Standard formatting
      return 'Rp' + value.toLocaleString('id-ID')
    },

    formatRupiahFull(value) {
      if (value === undefined || value === null) return 'Rp0'
      // Strictly format as Rp55.700.000 (no space)
      return 'Rp' + value.toLocaleString('id-ID').replace(/,/g, '.')
    }
  }
})
