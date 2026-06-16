import { defineStore } from 'pinia'

export const useQurbanStore = defineStore('qurban', {
  state: () => ({
    shohibuls: [],
    transactions: [],
    animalPrices: {
      sapi: 4000000,
      kambing: 3500000
    },
    currentShohibulId: 'shohibul-01', // Logged in user: Budi Santoso
    isDarkMode: false
  }),

  getters: {
    targetTotal(state) {
      const sapiCount = state.shohibuls.filter(item => item.type === 'sapi').length
      const kambingCount = state.shohibuls.filter(item => item.type === 'kambing').length

      const sapiAnimals = Math.ceil(sapiCount / 7)
      const kambingAnimals = kambingCount

      const sapiTarget = sapiAnimals * (7 * state.animalPrices.sapi)
      const kambingTarget = kambingAnimals * state.animalPrices.kambing

      return sapiTarget + kambingTarget
    },
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
      const cachedShohibuls = localStorage.getItem('qurban_shohibuls_v5')
      const cachedTransactions = localStorage.getItem('qurban_transactions_v5')

      if (cachedShohibuls && cachedTransactions) {
        this.shohibuls = JSON.parse(cachedShohibuls)
        this.transactions = JSON.parse(cachedTransactions)
      } else {
        this.loadMockData()
      }
    },

    loadMockData() {
      this.shohibuls = [
        // Sapi 1 (Lunas Semua)
        { id: 'shohibul-01', name: 'Bpk. Ahmad Nasa\'i', address: 'Perumahan Arjamukti Blok C1.32', code: 'C1.32', type: 'sapi', animalGroup: 'Sapi 1', target: 4000000, collected: 4000000, lastPaymentMonth: 'Juni 2026' },
        { id: 'shohibul-02', name: 'Bpk. M Ainur Rofiq', address: 'Perumahan Arjamukti Blok D5.10', code: 'D5.10', type: 'sapi', animalGroup: 'Sapi 1', target: 4000000, collected: 4000000, lastPaymentMonth: 'Juni 2026' },
        { id: 'shohibul-03', name: 'Bpk. Randi Rizal', address: 'Perumahan Arjamukti Blok B6.04', code: 'B6.04', type: 'sapi', animalGroup: 'Sapi 1', target: 4000000, collected: 4000000, lastPaymentMonth: 'Juni 2026' },
        { id: 'shohibul-04', name: 'Bpk. Irvan Ruchiat', address: 'Perumahan Arjamukti Blok D2.16', code: 'D2.16', type: 'sapi', animalGroup: 'Sapi 1', target: 4000000, collected: 4000000, lastPaymentMonth: 'Mei 2026' },
        { id: 'shohibul-05', name: 'Bpk. Redi Sasriandi', address: 'Perumahan Arjamukti Blok D2.07', code: 'D2.07', type: 'sapi', animalGroup: 'Sapi 1', target: 4000000, collected: 4000000, lastPaymentMonth: 'Mei 2026' },
        { id: 'shohibul-06', name: 'Bpk. Tedi Ruhyadi', address: 'Perumahan Arjamukti Blok B7.05', code: 'B7.05', type: 'sapi', animalGroup: 'Sapi 1', target: 4000000, collected: 4000000, lastPaymentMonth: 'Mei 2026' },
        { id: 'shohibul-10', name: 'Ibu Santi Ratnasari', address: 'Perumahan Arjamukti Blok C3.06', code: 'C3.06', type: 'sapi', animalGroup: 'Sapi 1', target: 4000000, collected: 4000000, lastPaymentMonth: 'Mei 2026' },

        // Sapi 2 (Proses)
        { id: 'shohibul-11', name: 'Bpk. Bambang Setiawan', address: 'Perumahan Arjamukti Blok D6.04', code: 'D6.04', type: 'sapi', animalGroup: 'Sapi 2', target: 4000000, collected: 4000000, lastPaymentMonth: 'Juni 2026' },
        { id: 'shohibul-13', name: 'Ibu Aah Mugniah', address: 'Perumahan Arjamukti Blok B4.19', code: 'B4.19', type: 'sapi', animalGroup: 'Sapi 2', target: 4000000, collected: 2500000, lastPaymentMonth: 'Juni 2026' },
        { id: 'shohibul-14', name: 'Ibu Umi Nasiroh', address: 'Perumahan Arjamukti Blok C3.20', code: 'C3.20', type: 'sapi', animalGroup: 'Sapi 2', target: 4000000, collected: 1500000, lastPaymentMonth: 'Juni 2026' },
        { id: 'shohibul-15', name: 'Bpk. Abdul Rohim Gumilar', address: 'Perumahan Arjamukti Blok C4.10', code: 'C4.10', type: 'sapi', animalGroup: 'Sapi 2', target: 4000000, collected: 1000000, lastPaymentMonth: 'Mei 2026' },
        { id: 'shohibul-16', name: 'Ibu Rina Susilawati', address: 'Perumahan Arjamukti Blok B1.17', code: 'B1.17', type: 'sapi', animalGroup: 'Sapi 2', target: 4000000, collected: 500000, lastPaymentMonth: 'Mei 2026' },
        { id: 'shohibul-17', name: 'Bpk. Iwan Ridwan', address: 'Perumahan Arjamukti Blok C4.11', code: 'C4.11', type: 'sapi', animalGroup: 'Sapi 2', target: 4000000, collected: 4000000, lastPaymentMonth: 'Mei 2026' },
        { id: 'shohibul-18', name: 'Bpk. Dede Muharam', address: 'Perumahan Arjamukti Blok D1.11', code: 'D1.11', type: 'sapi', animalGroup: 'Sapi 2', target: 4000000, collected: 2000000, lastPaymentMonth: 'Juni 2026' },

        // Sapi 3 (Baru Mulai / Masih Kosong)
        { id: 'shohibul-19', name: 'Bpk. M Rasyid', address: 'Perumahan Arjamukti Blok D2.14', code: 'D2.14', type: 'sapi', animalGroup: 'Sapi 3', target: 4000000, collected: 4000000, lastPaymentMonth: 'Juni 2026' },
        { id: 'shohibul-20', name: 'Bpk. Dede Maulana Yusuf', address: 'Perumahan Arjamukti Blok D2.34', code: 'D2.34', type: 'sapi', animalGroup: 'Sapi 3', target: 4000000, collected: 1500000, lastPaymentMonth: 'Juni 2026' },
        { id: 'shohibul-21', name: 'Bpk. Enar', address: 'Perumahan Arjamukti Blok B5.09', code: 'B5.09', type: 'sapi', animalGroup: 'Sapi 3', target: 4000000, collected: 1000000, lastPaymentMonth: 'Juni 2026' },
        { id: 'shohibul-22', name: 'Bpk. Suhendi', address: 'Perumahan Arjamukti Blok B4.01', code: 'B4.01', type: 'sapi', animalGroup: 'Sapi 3', target: 4000000, collected: 500000, lastPaymentMonth: 'Juni 2026' },
        { id: 'shohibul-23', name: 'Bpk. Ojo Sukarjo', address: 'Perumahan Arjamukti Blok B1.16', code: 'B1.16', type: 'sapi', animalGroup: 'Sapi 3', target: 4000000, collected: 100000, lastPaymentMonth: 'Juni 2026' },
        { id: 'shohibul-07', name: 'Bpk. Usman', address: 'Perumahan Arjamukti Blok D4.02', code: 'D4.02', type: 'sapi', animalGroup: 'Sapi 3', target: 4000000, collected: 0, lastPaymentMonth: '-' },
        { id: 'shohibul-08', name: 'Bpk. Deni Halimansyah', address: 'Perumahan Arjamukti Blok C5.06', code: 'C5.06', type: 'sapi', animalGroup: 'Sapi 3', target: 4000000, collected: 0, lastPaymentMonth: '-' },

        // Kambing Mandiri
        { id: 'shohibul-24', name: 'Ibu Via Safarina', address: 'Perumahan Arjamukti Blok C2.03', code: 'C2.03', type: 'kambing', animalGroup: 'Kambing Mandiri', target: 3500000, collected: 3500000, lastPaymentMonth: 'Juni 2026' },
        { id: 'shohibul-25', name: 'Ibu Eulis Kodariah', address: 'Perumahan Arjamukti Blok D2.16', code: 'D2.16', type: 'kambing', animalGroup: 'Kambing Mandiri', target: 3500000, collected: 1000000, lastPaymentMonth: 'Juni 2026' },
        { id: 'shohibul-09', name: 'Bpk. Ali M Abduh', address: 'Perumahan Arjamukti Blok D4.27', code: 'D4.27', type: 'kambing', animalGroup: 'Kambing Mandiri', target: 3500000, collected: 0, lastPaymentMonth: '-' },
        { id: 'shohibul-12', name: 'Bpk. M Arif Taufiq A', address: 'Perumahan Arjamukti Blok C1.34', code: 'C1.34', type: 'kambing', animalGroup: 'Kambing Mandiri', target: 3500000, collected: 0, lastPaymentMonth: '-' }
      ]

      const simulatedTransactions = []
      let txIdCounter = 1

      this.shohibuls.forEach(shohibul => {
        if (shohibul.collected > 0) {
          let remaining = shohibul.collected
          let daysAgo = Math.floor(Math.random() * 5) + 1 // Transaksi terakhir dalam 1-5 hari terakhir

          while (remaining > 0) {
            let amount = remaining

            // Pecah nominal agar lebih realistis (cicilan)
            if (remaining >= 1000000 && Math.random() > 0.4) {
              amount = 1000000
            } else if (remaining >= 500000 && Math.random() > 0.3) {
              amount = 500000
            }

            simulatedTransactions.push({
              id: `tx-${txIdCounter++}`,
              shohibulId: shohibul.id,
              name: shohibul.name,
              code: shohibul.code,
              date: new Date(Date.now() - 1000 * 60 * 60 * 24 * daysAgo).toISOString(),
              amount: amount,
              status: 'success'
            })

            remaining -= amount
            daysAgo += Math.floor(Math.random() * 15) + 15 // Jarak antar cicilan 15-30 hari
          }
        }
      })

      // Add 3 dummy pending transactions
      simulatedTransactions.push(
        {
          id: `tx-${txIdCounter++}`,
          shohibulId: 'shohibul-07',
          name: 'Bpk. Usman',
          date: new Date().toISOString(),
          amount: 500000,
          status: 'pending',
          paymentMethod: 'qris'
        },
        {
          id: `tx-${txIdCounter++}`,
          shohibulId: 'shohibul-08',
          name: 'Bpk. Deni Halimansyah',
          date: new Date().toISOString(),
          amount: 1000000,
          status: 'pending',
          paymentMethod: 'va'
        },
        {
          id: `tx-${txIdCounter++}`,
          shohibulId: 'shohibul-09',
          name: 'Bpk. Ali M Abduh',
          date: new Date().toISOString(),
          amount: 250000,
          status: 'pending',
          paymentMethod: 'qris'
        }
      )

      // Urutkan transaksi dari yang terbaru ke yang terlama
      this.transactions = simulatedTransactions.sort((a, b) => new Date(b.date) - new Date(a.date))

      this.saveToCache()
    },

    saveToCache() {
      localStorage.setItem('qurban_shohibuls_v4', JSON.stringify(this.shohibuls))
      localStorage.setItem('qurban_transactions_v4', JSON.stringify(this.transactions))
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

    registerNewShohibul(payload) {

      const newId = 'shohibul-' + Math.random().toString(36).substr(2, 9)

      let assignedGroup = payload.animalGroup;
      if (!assignedGroup) {
        if (payload.type === 'sapi') {
          const groupCounts = {};
          this.shohibuls.forEach(member => {
            if (member.type === 'sapi' && member.animalGroup && member.animalGroup.startsWith('Sapi ')) {
              groupCounts[member.animalGroup] = (groupCounts[member.animalGroup] || 0) + 1;
            }
          });

          const sortedGroups = Object.keys(groupCounts).sort((a, b) => {
            const numA = parseInt(a.match(/\d+$/)?.[0] || 0);
            const numB = parseInt(b.match(/\d+$/)?.[0] || 0);
            return numA - numB;
          });
          const availableGroup = sortedGroups.find(key => groupCounts[key] < 7);

          if (availableGroup) {
            assignedGroup = availableGroup;
          } else {
            if (sortedGroups.length === 0) {
              assignedGroup = 'Sapi 1';
            } else {
              const lastGroup = sortedGroups[sortedGroups.length - 1];
              const match = lastGroup.match(/(\d+)$/);
              const nextNum = match ? parseInt(match[1]) + 1 : 1;
              assignedGroup = `Sapi ${nextNum}`;
            }
          }
        } else {
          assignedGroup = 'Kambing Mandiri';
        }
      }

      const newShohibul = {
        id: newId,
        name: payload.name,
        address: payload.address,
        type: payload.type,
        animalGroup: assignedGroup,
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
