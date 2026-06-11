<template>
  <div class="space-y-6" ref="containerRef">

    <!-- Idul Adha Banner (Moved from header) -->
    <div class="relative overflow-hidden rounded-2xl lg:rounded-3xl bg-gradient-to-br from-primary via-primary-dark to-dark text-white p-5 sm:p-6 shadow-xl idul-adha-banner">
      <!-- Background decorative elements -->
      <div class="absolute right-[-40px] top-[-30px] w-40 h-40 rounded-full bg-white/5 border border-white/5 pointer-events-none"></div>
      <div class="absolute left-[-20px] bottom-[-20px] w-28 h-28 rounded-full bg-white/5 pointer-events-none"></div>
      <div class="absolute -right-4 -top-4 w-16 h-16 bg-secondary/20 rounded-full blur-lg pointer-events-none"></div>
      
      <div class="relative z-10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary/15 border border-secondary/30 mb-3">
            <span class="w-1.5 h-1.5 rounded-full bg-secondary animate-pulse"></span>
            <span class="text-secondary text-[10px] font-bold tracking-widest uppercase">Idul Adha 1446 H / 2025</span>
          </div>
          <h2 class="text-xl sm:text-2xl font-bold font-heading leading-tight">
            Investasi <span class="text-secondary">Akhirat</span>
          </h2>
          <p class="text-white/70 text-xs sm:text-sm mt-1.5 max-w-md leading-relaxed">
            Mulai menabung untuk ibadah qurban Anda. Setiap rupiah adalah langkah menuju keberkahan.
          </p>
        </div>
        <router-link 
          to="/menabung" 
          class="group inline-flex items-center gap-2 px-5 py-3 bg-secondary text-white font-bold text-sm rounded-full hover:bg-white hover:text-dark transition-all duration-300 shadow-lg shadow-secondary/20 shrink-0 self-start sm:self-center"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 group-hover:scale-110 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span>Mulai Menabung</span>
        </router-link>
      </div>
    </div>
    
    <!-- Responsive Grid Layout -->
    <div class="grid grid-cols-1 lg:grid-cols-12 gap-6">
      
      <!-- 1. Quick Stats Cards -->
      <div class="col-span-1 lg:col-span-5 lg:order-1 space-y-4">
        <div class="grid grid-cols-3 gap-3 stats-grid">
          <div class="bg-white dark:bg-white/[0.03] border border-gray-200/50 dark:border-white/10 rounded-2xl p-3.5 text-center shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 card-item">
            <span class="text-2xl font-black text-gray-800 dark:text-white block">{{ Math.round(animatedStats.shohibuls) }}</span>
            <span class="text-[10px] font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wide">Shohibul</span>
          </div>
          <div class="bg-white dark:bg-white/[0.03] border border-gray-200/50 dark:border-white/10 rounded-2xl p-3.5 text-center shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 card-item">
            <span class="text-2xl font-black text-primary dark:text-primary-light block">{{ Math.round(animatedStats.lunas) }}</span>
            <span class="text-[10px] font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wide">Lunas</span>
          </div>
          <div class="bg-white dark:bg-white/[0.03] border border-gray-200/50 dark:border-white/10 rounded-2xl p-3.5 text-center shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 card-item">
            <span class="text-2xl font-black text-secondary dark:text-secondary-light block">{{ Math.round(animatedStats.proses) }}</span>
            <span class="text-[10px] font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wide">Proses</span>
          </div>
        </div>
      </div>

      <!-- 2. Main Grand Progress Bar Widget -->
      <div class="col-span-1 lg:col-span-7 lg:order-2 bg-primary text-white rounded-2xl lg:rounded-3xl p-5 shadow-xl glow-primary space-y-4 progress-widget">
        <div class="flex justify-between items-start">
          <div>
            <span class="text-xs text-teal-200">Total terkumpul</span>
            <h3 class="text-2xl font-black text-white mt-1 font-heading">{{ store.formatRupiahFull(Math.round(animatedStats.collected)) }}</h3>
            <span class="text-xs text-teal-200/70">Target: {{ store.formatRupiahFull(store.targetTotal) }}</span>
          </div>
          <div class="text-3xl font-black text-secondary font-heading">
            {{ Math.round(animatedStats.percentage) }}%
          </div>
        </div>

        <!-- Custom Progress Bar -->
        <div class="space-y-1">
          <div class="w-full h-4.5 bg-primary-dark/50 rounded-full overflow-hidden relative border border-white/10 shadow-inner">
            <div 
              class="absolute inset-y-0 left-0 wave-fill-back transition-all duration-1000 ease-out"
              :style="{ width: Math.round(animatedStats.percentage) + '%' }"
            ></div>
            <div 
              class="absolute inset-y-0 left-0 wave-fill-front transition-all duration-1000 ease-out"
              :style="{ width: Math.round(animatedStats.percentage) + '%' }"
            ></div>
            <span class="absolute inset-0 flex items-center justify-center text-[8px] font-black text-white/30 uppercase tracking-widest pointer-events-none select-none">
              Gelombang Tabungan Qurban
            </span>
          </div>
          <div class="flex justify-between text-[10px] text-teal-200">
            <span>Rp0</span>
            <span>{{ (store.targetTotal / 1000000).toFixed(1) }}jt</span>
          </div>
        </div>

        <!-- Mini Badges for Animal Targets -->
        <div class="pt-3 border-t border-white/10 flex space-x-3">
          <div class="flex items-center space-x-2 bg-primary-dark/40 px-3 py-1.5 rounded-xl text-xs">
            <span>🐄 Sapi</span>
            <span class="font-bold text-secondary">{{ store.sapiCount }} ekor</span>
          </div>
          <div class="flex items-center space-x-2 bg-primary-dark/40 px-3 py-1.5 rounded-xl text-xs">
            <span>🐐 Kambing</span>
            <span class="font-bold text-secondary">{{ store.kambingCount }} ekor</span>
          </div>
        </div>
      </div>

      <!-- 3. Recent Payments List -->
      <div class="col-span-1 lg:col-span-5 lg:order-3 space-y-3 recent-payments-list">
        <div class="flex justify-between items-center">
          <h4 class="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1.5 text-primary dark:text-primary-light" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Setoran terbaru
          </h4>
          <router-link to="/shohibul" class="text-xs font-semibold text-primary dark:text-secondary hover:underline flex items-center">
            Lihat semua
            <svg xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5 ml-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
            </svg>
          </router-link>
        </div>

        <!-- Transaction List Items -->
        <div class="space-y-2.5 max-h-[300px] lg:max-h-[380px] overflow-y-auto pr-1">
          <div 
            v-for="tx in store.transactions.slice(0, 4)" 
            :key="tx.id"
            class="bg-white dark:bg-white/[0.03] border border-gray-200/50 dark:border-white/10 rounded-2xl p-3 flex justify-between items-center shadow-sm hover:shadow-md transition-all duration-300"
          >
            <div class="flex items-center space-x-3">
              <div 
                class="w-9 h-9 rounded-full flex items-center justify-center font-bold text-xs shrink-0"
                :style="getAvatarStyle(tx.name)"
              >
                {{ getInitials(tx.name) }}
              </div>
              <div>
                <div class="flex items-center space-x-2">
                  <span class="text-xs font-bold text-gray-800 dark:text-white leading-tight block">{{ tx.name }}</span>
                  <span class="px-1.5 py-0.5 bg-gray-100 dark:bg-white/5 text-[8px] text-gray-500 dark:text-gray-400 font-semibold rounded uppercase tracking-wider">{{ tx.code }}</span>
                </div>
                <span class="text-[9px] text-gray-400 dark:text-gray-500">{{ formatDate(tx.date) }}</span>
              </div>
            </div>
            <span class="text-xs font-black text-gray-800 dark:text-white">
              {{ store.formatRupiah(tx.amount) }}
            </span>
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

const store = useQurbanStore()
const containerRef = ref(null)
let ctx

// Format date to local readable format
const formatDate = (dateStr) => {
  const date = new Date(dateStr)
  return date.toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })
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
    { from: '#eab308', to: '#ca8a04', text: '#ffffff' }, // Amber gradient
    { from: '#10b981', to: '#047857', text: '#ffffff' }, // Emerald gradient
    { from: '#3b82f6', to: '#1d4ed8', text: '#ffffff' }, // Blue gradient
    { from: '#8b5cf6', to: '#6d28d9', text: '#ffffff' }, // Purple gradient
    { from: '#ec4899', to: '#be185d', text: '#ffffff' }, // Pink gradient
    { from: '#f43f5e', to: '#be123c', text: '#ffffff' }, // Rose gradient
    { from: '#06b6d4', to: '#0891b2', text: '#ffffff' }  // Cyan gradient
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
    
    tl.from('.idul-adha-banner', { opacity: 0, y: -20, duration: 0.6 })
      .from('.progress-widget', { opacity: 0, y: 30, duration: 0.5 }, '-=0.4')
      .from('.recent-payments-list', { opacity: 0, y: 30, duration: 0.5 }, '-=0.3')
  }, containerRef.value)
})

onUnmounted(() => {
  if (ctx) ctx.revert()
})
</script>
