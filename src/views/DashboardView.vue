<template>
  <div class="space-y-6 sm:space-y-8" ref="containerRef">
    
    <!-- Content Wrapper -->
    <div class="flex flex-col gap-6 sm:gap-8">
        
        <!-- HERO SUMMARY CARD (Merged Banner & Progress) -->
        <div class="order-1 relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-primary via-primary-dark to-dark text-white p-6 sm:p-8 shadow-2xl hero-card flex flex-col justify-between min-h-[240px]">
          <!-- Background Elements -->
          <div class="absolute right-[-10%] top-[-20%] w-64 h-64 rounded-full bg-white/5 border border-white/10 pointer-events-none"></div>
          <div class="absolute left-[-10%] bottom-[-30%] w-48 h-48 rounded-full bg-secondary/20 blur-3xl pointer-events-none"></div>
          <div class="absolute right-[20%] bottom-[-10%] w-32 h-32 rounded-full bg-primary-light/10 blur-2xl pointer-events-none"></div>
          
          <div class="relative z-10 flex flex-col h-full justify-between space-y-8">
            <div class="flex justify-between items-start">
              <div class="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/10 backdrop-blur-md shadow-sm">
                <span class="w-2 h-2 rounded-full bg-secondary animate-pulse shadow-[0_0_8px_rgba(217,119,6,0.8)]"></span>
                <span class="text-white/90 text-[10px] font-extrabold tracking-[0.2em] uppercase">Idul Adha 1446 H</span>
              </div>
              <div class="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center backdrop-blur-md border border-white/10">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
                </svg>
              </div>
            </div>
            
            <div>
              <p class="text-xs sm:text-sm text-teal-100/70 font-semibold tracking-wide uppercase mb-1">Total Tabungan Qurban</p>
              <h2 class="text-4xl sm:text-5xl font-black text-white font-heading drop-shadow-lg tracking-tight">
                {{ store.formatRupiahFull(Math.round(animatedStats.collected)) }}
              </h2>
              <div class="flex items-center space-x-2 mt-2.5">
                <p class="text-xs text-teal-200/80 font-medium">Target: {{ store.formatRupiahFull(store.targetTotal) }}</p>
                <span class="text-[9px] bg-secondary/20 text-secondary-light px-2 py-0.5 rounded-full font-bold border border-secondary/20 backdrop-blur-sm">{{ Math.round(animatedStats.percentage) }}% Tercapai</span>
              </div>
            </div>

            <!-- Progress Bar & Actions -->
            <div class="space-y-4 pt-2">
              <div class="space-y-2">
                <div class="w-full h-1.5 sm:h-2 bg-black/20 rounded-full overflow-hidden backdrop-blur-sm">
                  <div 
                    class="h-full bg-gradient-to-r from-secondary to-amber-300 rounded-full transition-all duration-1000 ease-out shadow-[0_0_12px_rgba(217,119,6,0.6)]"
                    :style="{ width: Math.round(animatedStats.percentage) + '%' }"
                  ></div>
                </div>
                <div class="flex justify-between items-center text-[10px] text-teal-100/60 font-semibold">
                  <div class="flex space-x-3">
                    <span class="flex items-center"><span class="mr-1 opacity-80">🐄</span> {{ store.sapiCount }} Sapi</span>
                    <span class="flex items-center"><span class="mr-1 opacity-80">🐐</span> {{ store.kambingCount }} Kambing</span>
                  </div>
                  <span>{{ (store.targetTotal / 1000000).toFixed(1) }} Juta</span>
                </div>
              </div>
              
              <div class="flex gap-3 pt-2">
                <router-link to="/menabung" class="flex-1 bg-secondary hover:bg-secondary-light text-white text-xs sm:text-sm font-bold py-3.5 rounded-2xl text-center transition-all shadow-lg shadow-secondary/20">
                  Mulai Menabung
                </router-link>
                <router-link to="/menabung?mode=register" class="flex-1 bg-white/10 hover:bg-white/20 text-white border border-white/10 text-xs sm:text-sm font-bold py-3.5 rounded-2xl text-center backdrop-blur-md transition-all shadow-lg">
                  Daftar Qurban
                </router-link>
              </div>
            </div>
          </div>
        </div>

        <!-- QUICK ACTIONS ROW -->
        <div class="order-2 grid grid-cols-4 gap-3 sm:gap-6 quick-actions">
          <router-link to="/menabung" class="flex flex-col items-center group cursor-pointer">
            <div class="w-14 h-14 sm:w-16 sm:h-16 bg-white dark:bg-white/[0.03] border border-gray-200/50 dark:border-white/10 rounded-[1.25rem] flex items-center justify-center shadow-sm group-hover:shadow-md group-hover:-translate-y-1 group-hover:border-primary/30 transition-all duration-300 text-primary dark:text-primary-light">
              <WalletIcon class="w-6 h-6 sm:w-7 sm:h-7" />
            </div>
            <span class="text-[10px] sm:text-xs font-bold text-gray-600 dark:text-gray-400 mt-2.5 text-center transition-colors group-hover:text-primary dark:group-hover:text-primary-light">Setor / Daftar</span>
          </router-link>

          <router-link to="/shohibul" class="flex flex-col items-center group cursor-pointer">
            <div class="w-14 h-14 sm:w-16 sm:h-16 bg-white dark:bg-white/[0.03] border border-gray-200/50 dark:border-white/10 rounded-[1.25rem] flex items-center justify-center shadow-sm group-hover:shadow-md group-hover:-translate-y-1 group-hover:border-secondary/30 transition-all duration-300 text-secondary">
              <UsersIcon class="w-6 h-6 sm:w-7 sm:h-7" />
            </div>
            <span class="text-[10px] sm:text-xs font-bold text-gray-600 dark:text-gray-400 mt-2.5 text-center transition-colors group-hover:text-secondary">Shohibul</span>
          </router-link>

          <router-link to="/menabung?mode=kalkulator" class="flex flex-col items-center group cursor-pointer">
            <div class="w-14 h-14 sm:w-16 sm:h-16 bg-white dark:bg-white/[0.03] border border-gray-200/50 dark:border-white/10 rounded-[1.25rem] flex items-center justify-center shadow-sm group-hover:shadow-md group-hover:-translate-y-1 group-hover:border-emerald-500/30 transition-all duration-300 text-emerald-600 dark:text-emerald-400">
              <CalculatorIcon class="w-6 h-6 sm:w-7 sm:h-7" />
            </div>
            <span class="text-[10px] sm:text-xs font-bold text-gray-600 dark:text-gray-400 mt-2.5 text-center transition-colors group-hover:text-emerald-600 dark:group-hover:text-emerald-400">Kalkulator</span>
          </router-link>

          <router-link to="/rekap" class="flex flex-col items-center group cursor-pointer">
            <div class="w-14 h-14 sm:w-16 sm:h-16 bg-white dark:bg-white/[0.03] border border-gray-200/50 dark:border-white/10 rounded-[1.25rem] flex items-center justify-center shadow-sm group-hover:shadow-md group-hover:-translate-y-1 group-hover:border-blue-500/30 transition-all duration-300 text-blue-600 dark:text-blue-400">
              <FileTextIcon class="w-6 h-6 sm:w-7 sm:h-7" />
            </div>
            <span class="text-[10px] sm:text-xs font-bold text-gray-600 dark:text-gray-400 mt-2.5 text-center transition-colors group-hover:text-blue-600 dark:group-hover:text-blue-400">Laporan</span>
          </router-link>
        </div>

        <!-- QUICK STATS (Horizontal on Desktop, bottom on Mobile) -->
        <div class="order-4 sm:order-3 flex flex-col sm:grid sm:grid-cols-3 gap-3 sm:gap-4 quick-stats">
        <div class="bg-white dark:bg-white/[0.03] border border-gray-200/50 dark:border-white/10 rounded-3xl p-5 flex items-center justify-between shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 flex-1 relative overflow-hidden group">
          <div class="absolute right-[-10px] top-[-10px] opacity-[0.03] dark:opacity-5 group-hover:scale-110 transition-transform duration-500 pointer-events-none">
            <UsersIcon class="w-32 h-32" />
          </div>
          <div>
            <p class="text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-1">Total Shohibul</p>
            <p class="text-3xl font-black text-gray-800 dark:text-white leading-none font-heading">{{ Math.round(animatedStats.shohibuls) }}</p>
          </div>
          <div class="w-12 h-12 rounded-2xl bg-primary/10 dark:bg-primary/20 flex items-center justify-center text-primary dark:text-primary-light shrink-0">
            <UsersIcon class="w-6 h-6" />
          </div>
        </div>

        <div class="bg-white dark:bg-white/[0.03] border border-gray-200/50 dark:border-white/10 rounded-3xl p-5 flex items-center justify-between shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 flex-1 relative overflow-hidden group">
          <div class="absolute right-[-10px] top-[-10px] opacity-[0.03] dark:opacity-5 group-hover:scale-110 transition-transform duration-500 pointer-events-none">
            <CheckCircleIcon class="w-32 h-32" />
          </div>
          <div>
            <p class="text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-1">Sudah Lunas</p>
            <p class="text-3xl font-black text-gray-800 dark:text-white leading-none font-heading">{{ Math.round(animatedStats.lunas) }}</p>
          </div>
          <div class="w-12 h-12 rounded-2xl bg-green-100 dark:bg-green-900/30 flex items-center justify-center text-green-600 dark:text-green-400 shrink-0">
            <CheckCircleIcon class="w-6 h-6" />
          </div>
        </div>

        <div class="bg-white dark:bg-white/[0.03] border border-gray-200/50 dark:border-white/10 rounded-3xl p-5 flex items-center justify-between shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 flex-1 relative overflow-hidden group">
          <div class="absolute right-[-10px] top-[-10px] opacity-[0.03] dark:opacity-5 group-hover:scale-110 transition-transform duration-500 pointer-events-none">
            <ClockIcon class="w-32 h-32" />
          </div>
          <div>
            <p class="text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-1">Dalam Proses</p>
            <p class="text-3xl font-black text-gray-800 dark:text-white leading-none font-heading">{{ Math.round(animatedStats.proses) }}</p>
          </div>
          <div class="w-12 h-12 rounded-2xl bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center text-amber-600 dark:text-amber-400 shrink-0">
            <ClockIcon class="w-6 h-6" />
          </div>
        </div>
      </div>

      <!-- RECENT TRANSACTIONS (Above Stats on Mobile) -->
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
                <span class="block text-sm sm:text-base font-black text-gray-800 dark:text-white">{{ store.formatRupiah(tx.amount) }}</span>
                <span class="inline-block px-2 py-0.5 mt-1 bg-green-100 dark:bg-green-950/40 text-green-700 dark:text-green-400 text-[9px] font-bold rounded-md uppercase tracking-wider">Sukses</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted, onUnmounted } from 'vue'
import { useQurbanStore } from '@/stores/qurban'
import gsap from 'gsap'
import { UsersIcon, WalletIcon, CalculatorIcon, FileTextIcon, CheckCircleIcon, ClockIcon } from 'lucide-vue-next'

const store = useQurbanStore()
const containerRef = ref(null)
let ctx

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
