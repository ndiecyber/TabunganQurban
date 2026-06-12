import { defineStore } from 'pinia'

export const useQurbanStore = defineStore('qurban', {
  state: () => ({
    shohibuls: [],
    transactions: [],
    targetTotal: 84000000,
    currentShohibulId: 'shohibul-01', // Logged in user: Budi Santoso
    isDarkMode: false
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
        },
        {
          id: 'shohibul-13',
          name: 'Ibu Ningsih',
          address: 'Jl. Pemuda No 12',
          code: 'P12',
          type: 'sapi',
          animalGroup: 'Sapi Kelompok C',
          target: 3000000,
          collected: 3000000,
          lastPaymentMonth: 'Mei 2025'
        },
        {
          id: 'shohibul-14',
          name: 'Pak Rudi Hermawan',
          address: 'Kavling Hijau - A02',
          code: 'A02',
          type: 'sapi',
          animalGroup: 'Sapi Kelompok C',
          target: 3000000,
          collected: 1000000,
          lastPaymentMonth: 'April 2025'
        },
        {
          id: 'shohibul-15',
          name: 'Keluarga Bpk. Santoso',
          address: 'Perumahan Arjamukti - C10',
          code: 'C10',
          type: 'sapi',
          animalGroup: 'Sapi Kelompok D',
          target: 3000000,
          collected: 0,
          lastPaymentMonth: 'Belum Ada'
        }
      ]
 
      this.transactions = [
        {
          id: 'tx-1',
          shohibulId: 'shohibul-02',
          name: 'Rina Tanjung',
          code: 'C04',
          date: '2026-05-22',
          amount: 500000,
          status: 'success'
        },
        {
          id: 'tx-2',
          shohibulId: 'shohibul-03',
          name: 'Hendra Kusuma',
          code: 'B02',
          date: '2026-05-12',
          amount: 1000000,
          status: 'success'
        },
        {
          id: 'tx-3',
          shohibulId: 'shohibul-01',
          name: 'Budi Santoso',
          code: 'A01',
          date: '2026-05-05',
          amount: 2000000,
          status: 'success'
        },
        {
          id: 'tx-4',
          shohibulId: 'shohibul-02',
          name: 'Rina Tanjung',
          code: 'C04',
          date: '2026-04-22',
          amount: 500000,
          status: 'success'
        },
        {
          id: 'tx-5',
          shohibulId: 'shohibul-04',
          name: 'Pak Tono',
          code: 'C01',
          date: '2026-04-03',
          amount: 3000000,
          status: 'success'
        },
        {
          id: 'tx-6',
          shohibulId: 'shohibul-04',
          name: 'Pak Tono',
          code: 'C01',
          date: '2026-03-03',
          amount: 3000000,
          status: 'success'
        },
        {
          id: 'tx-7',
          shohibulId: 'shohibul-04',
          name: 'Pak Tono',
          code: 'C01',
          date: '2026-02-03',
          amount: 3000000,
          status: 'success'
        },
        {
          id: 'tx-8',
          shohibulId: 'shohibul-04',
          name: 'Pak Tono',
          code: 'C01',
          date: '2026-01-03',
          amount: 3000000,
          status: 'success'
        },
        {
          id: 'tx-9',
          shohibulId: 'shohibul-01',
          name: 'Budi Santoso',
          code: 'A01',
          date: '2026-04-07',
          amount: 2500000,
          status: 'success'
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
      if (savedTheme === 'dark' || (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
        this.isDarkMode = true
        document.documentElement.classList.add('dark')
      } else {
        this.isDarkMode = false
        document.documentElement.classList.remove('dark')
      }
    },

    registerNewShohibul(payload) {
      // payload: { name, address, type, animalGroup (optional), target, initialAmount, paymentMethod }
      
      const newId = 'shohibul-' + Math.random().toString(36).substr(2, 9)
      
      // Generate code based on type (e.g. S-XYZ or K-XYZ)
      const prefix = payload.type === 'sapi' ? 'S' : 'K'
      const codeSuffix = Math.floor(100 + Math.random() * 900).toString()
      const code = `${prefix}${codeSuffix}`
      
      const newShohibul = {
        id: newId,
        name: payload.name,
        address: payload.address,
        code: code,
        type: payload.type,
        animalGroup: payload.animalGroup || (payload.type === 'sapi' ? 'Sapi Kelompok (Pending)' : 'Kambing Mandiri'),
        target: payload.target,
        collected: 0,
        lastPaymentMonth: '-'
      }
      
      this.shohibuls.push(newShohibul)
      
      // Create initial transaction
      const newTx = {
        id: 'tx-' + Math.random().toString(36).substr(2, 9),
        shohibulId: newId,
        name: newShohibul.name,
        code: newShohibul.code,
        amount: payload.initialAmount,
        date: new Date().toISOString(),
        paymentMethod: payload.paymentMethod,
        status: 'pending'
      }
      this.transactions.unshift(newTx)
      
      this.saveToCache()
      return newShohibul
    },

    markTransactionSuccess(txId) {
      const txIndex = this.transactions.findIndex(t => t.id === txId)
      if (txIndex === -1) return false
      
      if (this.transactions[txIndex].status === 'success') return false
      
      this.transactions[txIndex].status = 'success'
      
      const shohibulIndex = this.shohibuls.findIndex(s => s.id === this.transactions[txIndex].shohibulId)
      if (shohibulIndex !== -1) {
        this.shohibuls[shohibulIndex].collected += this.transactions[txIndex].amount
        this.shohibuls[shohibulIndex].lastPaymentMonth = new Date().toLocaleDateString('id-ID', { month: 'long', year: 'numeric' })
      }
      
      this.saveToCache()
      return true
    }
  }
})
