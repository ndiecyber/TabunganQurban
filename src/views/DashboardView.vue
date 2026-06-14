<template>
  <div class="space-y-6 sm:space-y-8" ref="containerRef">
    
    <div class="flex flex-col gap-4 sm:gap-6">
        
        <!-- UNIFIED DASHBOARD CARD -->
        <div class="order-1 bg-white dark:bg-white/[0.03] border-2 border-gray-300 dark:border-white/10 rounded-[2rem] sm:rounded-[2.5rem] shadow-lg overflow-hidden flex flex-col relative z-10">
          
          <!-- Hero Section (Saldo) -->
          <div class="relative overflow-hidden bg-gradient-to-br from-primary via-primary-dark to-dark text-white p-5 sm:p-6 hero-card flex flex-col justify-between">
            <div class="absolute right-[-10%] top-[-20%] w-64 h-64 rounded-full bg-white/5 border border-white/10 pointer-events-none"></div>
            <div class="absolute left-[-10%] bottom-[-30%] w-48 h-48 rounded-full bg-secondary/20 blur-3xl pointer-events-none"></div>
            
            <div class="relative z-10 flex flex-col h-full space-y-4 sm:space-y-5">
              <div class="flex justify-between items-center">
                <div class="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 border border-white/10 backdrop-blur-md shadow-sm">
                  <span class="w-1.5 h-1.5 rounded-full bg-secondary animate-pulse shadow-[0_0_8px_rgba(217,119,6,0.8)]"></span>
                  <span class="text-white/90 text-[8px] sm:text-[9px] font-bold tracking-widest uppercase flex flex-col leading-tight">
                    <span>TARGET QURBAN</span>
                    <span>2027 (1448 H)</span>
                  </span>
                </div>
                
                <div class="bg-white/10 px-2.5 py-1.5 rounded-full backdrop-blur-md border border-white/10 text-right flex items-center gap-2 shadow-sm">
                  <div class="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center">
                    <span class="text-[10px]">🕋</span> 
                  </div>
                  <div class="flex flex-col text-left">
                    <span class="text-white font-black text-[9px] uppercase tracking-wider block leading-tight">TABUNGAN QURBAN</span>
                    <span class="text-teal-100 font-bold text-[7.5px] uppercase tracking-widest block leading-none">DKM MASJID</span>
                  </div>
                </div>
              </div>
              
              <div class="pt-1">
                <p class="text-[10px] sm:text-[11px] text-teal-100/80 font-bold tracking-widest uppercase mb-0.5">Total Tabungan Qurban</p>
                <h2 class="text-3xl sm:text-4xl font-black text-white font-heading drop-shadow-lg tracking-tight leading-none mb-2">
                  {{ formatRp(Math.round(animatedStats.collected)) }}
                </h2>
                <div class="flex items-center space-x-2">
                  <p class="text-[10px] sm:text-xs text-teal-200/90 font-semibold">Target: {{ formatRp(store.targetTotal) }}</p>
                  <span class="text-[8px] bg-secondary/20 text-secondary-light px-1.5 py-0.5 rounded-full font-bold border border-secondary/20">{{ Math.round(animatedStats.percentage) }}% Tercapai</span>
                </div>
                <p class="text-[7.5px] sm:text-[8px] text-teal-100/60 italic mt-1.5 font-medium leading-snug">
                  *Pencapaian target tidak bersifat mengikat dan mengikuti harga pasar tahun depan.
                </p>
              </div>

              <div class="space-y-3 pt-1">
                <div class="space-y-1.5">
                  <div class="w-full h-1.5 bg-black/30 rounded-full overflow-hidden backdrop-blur-sm">
                    <div 
                      class="h-full bg-gradient-to-r from-secondary to-amber-300 rounded-full transition-all duration-1000 ease-out shadow-[0_0_10px_rgba(217,119,6,0.6)]"
                      :style="{ width: Math.round(animatedStats.percentage) + '%' }"
                    ></div>
                  </div>
                  <div class="flex justify-between items-center text-[9px] sm:text-[10px] text-teal-100/80 font-semibold px-0.5">
                    <div class="flex space-x-3">
                      <span class="flex items-center"><span class="mr-1 opacity-80">🐄</span> {{ store.sapiCount }} Sapi</span>
                      <span class="flex items-center"><span class="mr-1 opacity-80">🐐</span> {{ store.kambingCount }} Kambing</span>
                    </div>
                    <span>{{ (store.targetTotal / 1000000).toFixed(1) }} Juta</span>
                  </div>
                </div>
                
                <div class="flex gap-3 pt-1">
                  <router-link to="/menabung" class="flex-1 bg-secondary hover:bg-secondary-light text-white text-[11px] sm:text-xs font-bold py-2.5 rounded-xl text-center transition-all shadow-md shadow-secondary/20">
                    Mulai Menabung
                  </router-link>
                  <router-link to="/menabung?mode=register" class="flex-1 bg-white/10 hover:bg-white/20 text-white border border-white/10 text-[11px] sm:text-xs font-bold py-2.5 rounded-xl text-center backdrop-blur-md transition-all shadow-sm">
                    Daftar Shohibul
                  </router-link>
                </div>
              </div>
            </div>
          </div>

          <!-- Divider -->
          <div class="h-px w-full bg-gray-200 dark:bg-white/10"></div>

          <!-- Quick Actions Section -->
          <div class="py-5 px-3 sm:px-6 flex justify-around items-start w-full quick-actions bg-white dark:bg-transparent">
            <router-link to="/menabung" class="flex flex-col items-center group cursor-pointer flex-1">
              <div class="w-[56px] h-[56px] sm:w-[64px] sm:h-[64px] rounded-[18px] border-[1.5px] border-gray-200 dark:border-white/10 bg-white dark:bg-white/[0.02] shadow-[0_2px_10px_rgba(0,0,0,0.02)] group-hover:bg-primary/5 dark:group-hover:bg-primary/10 flex items-center justify-center text-primary dark:text-primary-light transition-all duration-300 group-hover:-translate-y-1 group-hover:border-primary/40 mb-2">
                <WalletIcon class="w-6 h-6 sm:w-7 sm:h-7" stroke-width="2.2" />
              </div>
              <span class="text-[11px] sm:text-xs font-bold text-gray-700 dark:text-gray-300 text-center transition-colors group-hover:text-primary dark:group-hover:text-primary-light leading-tight">Setor</span>
            </router-link>

            <router-link to="/shohibul" class="flex flex-col items-center group cursor-pointer flex-1">
              <div class="w-[56px] h-[56px] sm:w-[64px] sm:h-[64px] rounded-[18px] border-[1.5px] border-gray-200 dark:border-white/10 bg-white dark:bg-white/[0.02] shadow-[0_2px_10px_rgba(0,0,0,0.02)] group-hover:bg-secondary/5 dark:group-hover:bg-secondary/10 flex items-center justify-center text-secondary transition-all duration-300 group-hover:-translate-y-1 group-hover:border-secondary/40 mb-2">
                <UsersIcon class="w-6 h-6 sm:w-7 sm:h-7" stroke-width="2.2" />
              </div>
              <span class="text-[11px] sm:text-xs font-bold text-gray-700 dark:text-gray-300 text-center transition-colors group-hover:text-secondary leading-tight">Shohibul</span>
            </router-link>

            <router-link to="/menabung?mode=kalkulator" class="flex flex-col items-center group cursor-pointer flex-1">
              <div class="w-[56px] h-[56px] sm:w-[64px] sm:h-[64px] rounded-[18px] border-[1.5px] border-gray-200 dark:border-white/10 bg-white dark:bg-white/[0.02] shadow-[0_2px_10px_rgba(0,0,0,0.02)] group-hover:bg-emerald-500/5 dark:group-hover:bg-emerald-500/10 flex items-center justify-center text-emerald-600 dark:text-emerald-400 transition-all duration-300 group-hover:-translate-y-1 group-hover:border-emerald-500/40 mb-2">
                <CalculatorIcon class="w-6 h-6 sm:w-7 sm:h-7" stroke-width="2.2" />
              </div>
              <span class="text-[11px] sm:text-xs font-bold text-gray-700 dark:text-gray-300 text-center transition-colors group-hover:text-emerald-600 dark:group-hover:text-emerald-400 leading-tight">Hitung</span>
            </router-link>

            <router-link to="/rekap" class="flex flex-col items-center group cursor-pointer flex-1">
              <div class="w-[56px] h-[56px] sm:w-[64px] sm:h-[64px] rounded-[18px] border-[1.5px] border-gray-200 dark:border-white/10 bg-white dark:bg-white/[0.02] shadow-[0_2px_10px_rgba(0,0,0,0.02)] group-hover:bg-blue-500/5 dark:group-hover:bg-blue-500/10 flex items-center justify-center text-blue-600 dark:text-blue-400 transition-all duration-300 group-hover:-translate-y-1 group-hover:border-blue-500/40 mb-2">
                <FileTextIcon class="w-6 h-6 sm:w-7 sm:h-7" stroke-width="2.2" />
              </div>
              <span class="text-[11px] sm:text-xs font-bold text-gray-700 dark:text-gray-300 text-center transition-colors group-hover:text-blue-600 dark:group-hover:text-blue-400 leading-tight">Laporan</span>
            </router-link>
          </div>

          <!-- Divider -->
          <div class="h-px w-full bg-gray-200 dark:bg-white/10"></div>

          <!-- Quick Stats Section -->
          <div class="p-4 sm:p-5 grid grid-cols-3 divide-x divide-gray-200 dark:divide-white/10 quick-stats bg-gray-50/80 dark:bg-transparent">
            <div class="flex flex-col items-center justify-center text-center px-1 group">
              <div class="w-7 h-7 rounded-full bg-primary/10 dark:bg-primary/20 flex items-center justify-center text-primary dark:text-primary-light mb-1.5 group-hover:scale-110 transition-transform">
                <UsersIcon class="w-4 h-4" />
              </div>
              <p class="text-[15px] sm:text-lg font-black text-gray-800 dark:text-white leading-none font-heading mb-0.5">{{ Math.round(animatedStats.shohibuls) }}</p>
              <p class="text-[9px] font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Shohibul</p>
            </div>

            <div class="flex flex-col items-center justify-center text-center px-1 group">
              <div class="w-7 h-7 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center text-green-600 dark:text-green-400 mb-1.5 group-hover:scale-110 transition-transform">
                <CheckCircleIcon class="w-4 h-4" />
              </div>
              <p class="text-[15px] sm:text-lg font-black text-gray-800 dark:text-white leading-none font-heading mb-0.5">{{ Math.round(animatedStats.lunas) }}</p>
              <p class="text-[9px] font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Lunas</p>
            </div>

            <div class="flex flex-col items-center justify-center text-center px-1 group">
              <div class="w-7 h-7 rounded-full bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center text-amber-600 dark:text-amber-400 mb-1.5 group-hover:scale-110 transition-transform">
                <ClockIcon class="w-4 h-4" />
              </div>
              <p class="text-[15px] sm:text-lg font-black text-gray-800 dark:text-white leading-none font-heading mb-0.5">{{ Math.round(animatedStats.proses) }}</p>
              <p class="text-[9px] font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Proses</p>
            </div>
          </div>
        </div>

      <div class="order-3 sm:order-4 space-y-4 recent-payments-list pt-2 sm:pt-4">
        <div class="flex justify-between items-center px-1">
          <h4 class="text-sm font-bold text-gray-800 dark:text-white font-heading">Setoran Terbaru</h4>
          <router-link to="/shohibul" class="text-xs font-bold text-primary dark:text-primary-light hover:bg-primary/15 transition-colors bg-primary/10 dark:bg-white/5 px-4 py-2 rounded-full">
            Lihat Semua
          </router-link>
        </div>

        <div class="bg-white dark:bg-white/[0.02] border border-gray-200/50 dark:border-white/10 rounded-[2rem] p-3 sm:p-4 shadow-sm">
          <div class="space-y-1.5">
            <div 
              v-for="tx in store.transactions.slice(0, 4)" 
              :key="tx.id"
              @click="openReceiptModal(tx)"
              class="flex justify-between items-center p-3 sm:p-4 rounded-[1.5rem] hover:bg-gray-50 dark:hover:bg-white/[0.04] border border-transparent hover:border-gray-100 dark:hover:border-white/5 transition-all duration-300 cursor-pointer group"
            >
              <div class="flex items-center space-x-4">
                <div 
                  class="w-11 h-11 sm:w-12 sm:h-12 rounded-[1rem] flex items-center justify-center font-bold text-sm shrink-0 shadow-inner group-hover:scale-105 transition-transform duration-300"
                  :style="getAvatarStyle(tx.name)"
                >
                  {{ getInitials(tx.name) }}
                </div>
                <div>
                  <h5 class="text-xs sm:text-sm font-extrabold text-gray-800 dark:text-white leading-tight group-hover:text-primary dark:group-hover:text-primary-light transition-colors">{{ tx.name }}</h5>
                  <div class="flex items-center mt-1.5 space-x-2">
                    <span class="text-[9px] sm:text-[10px] font-semibold text-gray-400 dark:text-gray-500">{{ formatDate(tx.date) }}</span>
                    <span class="w-1 h-1 rounded-full bg-gray-300 dark:bg-gray-700"></span>
                    <span class="text-[9px] sm:text-[10px] font-bold text-secondary">{{ tx.code }}</span>
                  </div>
                </div>
              </div>
              <div class="text-right">
                <span class="block text-sm sm:text-base font-black text-gray-800 dark:text-white">{{ formatRp(tx.amount) }}</span>
                <span v-if="tx.status === 'success'" class="inline-block px-2 py-0.5 mt-1 bg-green-100 dark:bg-green-950/40 text-green-700 dark:text-green-400 text-[9px] font-bold rounded-md uppercase tracking-wider">Sukses</span>
                <span v-else class="inline-block px-2 py-0.5 mt-1 bg-amber-100 dark:bg-amber-950/40 text-amber-700 dark:text-amber-400 text-[9px] font-bold rounded-md uppercase tracking-wider">Pending</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div v-if="isReceiptModalOpen" class="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex flex-col justify-end modal-backdrop" style="margin: 0; padding: 0;">
        <div class="flex-1 w-full h-full absolute inset-0 cursor-pointer" @click="closeReceiptModal"></div>
        
        <div class="bg-white dark:bg-dark rounded-t-[2rem] p-6 max-h-[90vh] flex flex-col relative border-t border-gray-200/50 dark:border-white/10 shadow-2xl pb-[calc(20px+env(safe-area-inset-bottom,0px))] receipt-modal-content w-full max-w-lg mx-auto z-10 overflow-y-auto custom-scrollbar">
          <div class="w-12 h-1.5 bg-gray-300 dark:bg-gray-600 rounded-full mx-auto -mt-2 mb-6 cursor-pointer hover:bg-gray-400 transition-colors" @click="closeReceiptModal"></div>
          
          <div v-if="selectedTx" class="flex flex-col items-center w-full">
            <div class="w-16 h-16 rounded-full flex items-center justify-center mb-4" :class="selectedTx.status === 'success' ? 'bg-green-100 dark:bg-green-900/30 text-green-500' : 'bg-amber-100 dark:bg-amber-900/30 text-amber-500'">
              <CheckCircleIcon v-if="selectedTx.status === 'success'" class="w-8 h-8" />
              <ClockIcon v-else class="w-8 h-8" />
            </div>
            
            <h3 class="text-lg font-bold text-gray-800 dark:text-white">{{ selectedTx.status === 'success' ? 'Pembayaran Berhasil' : 'Menunggu Pembayaran' }}</h3>
            <p class="text-3xl font-black text-gray-800 dark:text-white mt-1 mb-6 font-heading">{{ formatRp(selectedTx.amount) }}</p>

            <div class="w-full bg-gray-50 dark:bg-white/[0.02] border border-gray-200/50 dark:border-white/10 rounded-2xl p-4 space-y-4 mb-6">
              <div class="flex justify-between items-center text-sm">
                <span class="text-gray-500 dark:text-gray-400 font-medium">Tanggal</span>
                <span class="font-bold text-gray-800 dark:text-white">{{ formatDate(selectedTx.date) }}</span>
              </div>
              <div class="flex justify-between items-center text-sm">
                <span class="text-gray-500 dark:text-gray-400 font-medium">ID Transaksi</span>
                <span class="font-bold text-gray-800 dark:text-white uppercase">{{ selectedTx.id }}</span>
              </div>
              <div class="flex justify-between items-center text-sm">
                <span class="text-gray-500 dark:text-gray-400 font-medium">Metode</span>
                <span class="font-bold text-gray-800 dark:text-white uppercase">{{ selectedTx.paymentMethod || 'Tunai/Transfer' }}</span>
              </div>
              <div class="h-px w-full bg-gray-200 dark:bg-white/10 my-2"></div>
              <div class="flex justify-between items-center text-sm">
                <span class="text-gray-500 dark:text-gray-400 font-medium">Nama Shohibul</span>
                <span class="font-bold text-gray-800 dark:text-white">{{ selectedTx.name }}</span>
              </div>
              <div class="flex justify-between items-center text-sm">
                <span class="text-gray-500 dark:text-gray-400 font-medium">Kode Hewan</span>
                <span class="font-bold text-gray-800 dark:text-white">{{ selectedTx.code }}</span>
              </div>
            </div>

            <div class="w-full space-y-3">
              <button v-if="selectedTx.status === 'pending'" @click="simulateSuccess" class="w-full py-3.5 bg-primary hover:bg-primary-light text-white rounded-xl font-bold transition-colors shadow-lg shadow-primary/20 text-sm">
                Simulasikan Pembayaran Berhasil
              </button>
              
              <button @click="closeReceiptModal" class="w-full py-3.5 bg-gray-100 dark:bg-white/5 hover:bg-gray-200 dark:hover:bg-white/10 text-gray-700 dark:text-gray-300 rounded-xl font-bold transition-colors text-sm">
                Tutup
              </button>
            </div>
          </div>
        </div>
      </div>

  </div>
</template>

<script setup>
import { ref, reactive, onMounted, onUnmounted, watch } from 'vue'
import { useQurbanStore } from '@/stores/qurban'
import gsap from 'gsap'
import { UsersIcon, WalletIcon, CalculatorIcon, FileTextIcon, CheckCircleIcon, ClockIcon } from 'lucide-vue-next'

const store = useQurbanStore()
const containerRef = ref(null)
let ctx

// Fungsi lokal agar angka memakai Rp. 100.000 
const formatRp = (val) => {
  if (!val) return 'Rp. 0'
  return 'Rp. ' + new Intl.NumberFormat('id-ID').format(val)
}

// Format date to local readable format
const formatDate = (dateStr) => {
  const date = new Date(dateStr)
  return date.toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })
}

// Get initials for profile picture replacement
const getInitials = (name) => {
  if (!name) return ''
  const split = name.split(' ')
  if (split.length >= 2) {
    return (split[0][0] + split[1][0]).toUpperCase()
  }
  return name.slice(0, 2).toUpperCase()
}

// Generate color style based on name hash (Gradient Avatars)
const getAvatarStyle = (name) => {
  if (!name) return {}
  const gradients = [
    { from: '#eab308', to: '#ca8a04', text: '#ffffff' }, // Amber
    { from: '#10b981', to: '#047857', text: '#ffffff' }, // Emerald
    { from: '#3b82f6', to: '#1d4ed8', text: '#ffffff' }, // Blue
    { from: '#8b5cf6', to: '#6d28d9', text: '#ffffff' }, // Purple
    { from: '#ec4899', to: '#be185d', text: '#ffffff' }, // Pink
    { from: '#f43f5e', to: '#be123c', text: '#ffffff' }, // Rose
    { from: '#06b6d4', to: '#0891b2', text: '#ffffff' }  // Cyan
  ]
  let hash = 0
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash)
  }
  const index = Math.abs(hash) % gradients.length
  const g = gradients[index]
  return {
    background: `linear-gradient(135deg, ${g.from} 0%, ${g.to} 100%)`,
    color: g.text,
    textShadow: '0 1px 1px rgba(0, 0, 0, 0.15)',
    boxShadow: 'inset 0 1px 0 rgba(255, 255, 255, 0.3), 0 2px 4px rgba(0, 0, 0, 0.08)'
  }
}

const animatedStats = reactive({
  shohibuls: 0,
  lunas: 0,
  proses: 0,
  collected: 0,
  percentage: 0
})

const isReceiptModalOpen = ref(false)
const selectedTx = ref(null)

const openReceiptModal = (tx) => {
  selectedTx.value = tx
  isReceiptModalOpen.value = true
  document.body.style.overflow = 'hidden'
  import('vue').then(({ nextTick }) => {
    nextTick(() => {
      gsap.fromTo('.modal-backdrop', { opacity: 0 }, { opacity: 1, duration: 0.3 })
      gsap.fromTo('.receipt-modal-content', { y: '100%' }, { y: '0%', duration: 0.4, ease: 'power3.out' })
    })
  })
}

const closeReceiptModal = () => {
  gsap.to('.receipt-modal-content', { y: '100%', duration: 0.3, ease: 'power3.in' })
  gsap.to('.modal-backdrop', { opacity: 0, duration: 0.3, onComplete: () => {
    isReceiptModalOpen.value = false
    setTimeout(() => { selectedTx.value = null }, 300)
    document.body.style.overflow = ''
  }})
}

const simulateSuccess = () => {
  if (selectedTx.value && selectedTx.value.id) {
    store.markTransactionSuccess(selectedTx.value.id)
    alert('Simulasi: Status pembayaran berhasil diperbarui menjadi Sukses!')
  }
}

watch(() => store.totalCollected, (newVal) => {
  gsap.to(animatedStats, {
    shohibuls: store.shohibuls.length,
    lunas: store.totalLunas,
    proses: store.totalProses,
    collected: newVal,
    percentage: store.progressPercentage,
    duration: 1.2,
    ease: 'power3.out'
  })
})

onMounted(() => {
  // GSAP Counters
  gsap.to(animatedStats, {
    shohibuls: store.shohibuls.length,
    lunas: store.totalLunas,
    proses: store.totalProses,
    collected: store.totalCollected,
    percentage: store.progressPercentage,
    duration: 1.8,
    ease: 'power3.out'
  })

  // Entrance GSAP animation
  ctx = gsap.context(() => {
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })
    
    tl.from('.hero-card', { opacity: 0, y: -20, duration: 0.6 })
      .from('.quick-actions > a', { opacity: 0, scale: 0.9, stagger: 0.08, duration: 0.4 }, '-=0.3')
      .from('.recent-payments-list', { opacity: 0, y: 30, duration: 0.5 }, '-=0.2')
  })
})

onUnmounted(() => {
  if (ctx) ctx.revert()
})
</script>