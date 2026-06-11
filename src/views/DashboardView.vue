<template>
  <div class="space-y-6" ref="containerRef">
    
    <!-- Mobile-only Header App Bar -->
    <div class="flex items-center justify-between md:hidden dashboard-header opacity-0 translate-y-[-20px] pb-2">
      <div class="flex items-center space-x-3">
        <div class="p-2 bg-primary/10 rounded-xl">
          <img src="/logo-dkm.jpeg" alt="Logo" class="w-8 h-8 rounded-full border border-amber-500 shadow-sm" />
        </div>
        <div>
          <h2 class="text-base font-bold text-gray-800 dark:text-white leading-none">Tabungan Qurban</h2>
          <span class="text-xs text-gray-500 dark:text-gray-400">DKM Masjid Jami Kassiti</span>
        </div>
      </div>
      <div class="px-3 py-1 bg-amber-500/10 dark:bg-amber-500/20 text-amber-600 dark:text-amber-400 border border-amber-500/20 rounded-full text-xs font-bold font-heading">
        Idul Adha 2025
      </div>
    </div>

    <!-- Responsive Grid Layout -->
    <div class="grid grid-cols-1 lg:grid-cols-12 gap-6">
      
      <!-- Left Column: Welcome & Progress Widget -->
      <div class="lg:col-span-7 space-y-6">
        
        <!-- Active User Welcome Card -->
        <div v-if="store.currentUser" class="gradient-overlay rounded-3xl p-6 text-white shadow-xl glow-primary space-y-5 user-welcome-card opacity-0 scale-95 relative overflow-hidden">
          <!-- Background SVG pattern -->
          <div class="absolute right-[-10px] bottom-[-20px] opacity-10 pointer-events-none">
            <svg width="150" height="150" viewBox="0 0 100 100" fill="currentColor">
              <circle cx="50" cy="50" r="40" />
            </svg>
          </div>

          <div class="flex items-start justify-between">
            <div>
              <span class="text-xs text-teal-200">Selamat datang,</span>
              <h3 class="text-2xl font-bold mt-1 font-heading">{{ store.currentUser.name }}</h3>
              <p class="text-xs text-teal-100/80 flex items-center mt-1.5">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5 mr-1.5 text-amber-300" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clip-rule="evenodd" />
                </svg>
                {{ store.currentUser.address }}
              </p>
            </div>
            <span class="px-3 py-1 bg-white/20 text-white rounded-lg text-xs font-bold uppercase tracking-wider">Shohibul</span>
          </div>

          <!-- Payment Month Status -->
          <div class="bg-white/10 rounded-2xl p-4 flex justify-between items-center backdrop-blur-sm">
            <div>
              <p class="text-xs text-teal-100">Setoran Terakhir</p>
              <p class="text-base font-bold text-white">{{ store.currentUser.lastPaymentMonth }}</p>
            </div>
            <div class="flex items-center space-x-3">
              <span class="text-base font-extrabold text-amber-300">Rp25.000</span>
              <span class="px-3 py-1 bg-green-400 text-teal-900 rounded-full text-xs font-bold">Lunas</span>
            </div>
          </div>
        </div>

        <!-- Main Grand Progress Bar Widget -->
        <div class="bg-emerald-900 text-white rounded-3xl p-6 shadow-xl glow-primary space-y-5 progress-widget opacity-0 translate-y-[30px]">
          <div class="flex justify-between items-start">
            <div>
              <span class="text-xs text-emerald-300">Total tabungan terkumpul</span>
              <h3 class="text-3xl font-black text-white mt-1.5">{{ store.formatRupiahFull(store.totalCollected) }}</h3>
              <span class="text-xs text-emerald-200/70">Target: {{ store.formatRupiahFull(store.targetTotal) }}</span>
            </div>
            <div class="text-3xl font-black text-amber-300 font-heading">
              {{ store.progressPercentage }}%
            </div>
          </div>

          <!-- Custom Progress Bar -->
          <div class="space-y-1">
            <div class="w-full h-3 bg-emerald-950 rounded-full overflow-hidden">
              <div 
                class="h-full bg-gradient-to-r from-amber-500 to-amber-300 rounded-full transition-all duration-1000 ease-out progress-bar-fill"
                :style="{ width: store.progressPercentage + '%' }"
              ></div>
            </div>
            <div class="flex justify-between text-xs text-emerald-300">
              <span>Rp0</span>
              <span>84.0jt</span>
            </div>
          </div>

          <!-- Mini Badges for Animal Targets -->
          <div class="pt-3 border-t border-emerald-800 flex space-x-3">
            <div class="flex items-center space-x-2 bg-emerald-950/40 px-4 py-2 rounded-xl text-xs">
              <span>🐄 Sapi</span>
              <span class="font-bold text-amber-300">{{ store.sapiCount }} ekor</span>
            </div>
            <div class="flex items-center space-x-2 bg-emerald-950/40 px-4 py-2 rounded-xl text-xs">
              <span>🐐 Kambing</span>
              <span class="font-bold text-amber-300">{{ store.kambingCount }} ekor</span>
            </div>
          </div>
        </div>

      </div>

      <!-- Right Column: Stats & Recent Payments -->
      <div class="lg:col-span-5 space-y-6">

        <!-- Quick Stats Cards (Grid 3 Columns) -->
        <div class="grid grid-cols-3 gap-3 stats-grid">
          <div class="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700/50 rounded-2xl p-4 text-center shadow-sm hover:shadow-md transition card-item opacity-0">
            <span class="text-3xl font-black text-gray-800 dark:text-white block">{{ store.shohibuls.length }}</span>
            <span class="text-[10px] font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wide">Shohibul</span>
          </div>
          <div class="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700/50 rounded-2xl p-4 text-center shadow-sm hover:shadow-md transition card-item opacity-0">
            <span class="text-3xl font-black text-emerald-600 dark:text-emerald-400 block">{{ store.totalLunas }}</span>
            <span class="text-[10px] font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wide">Lunas</span>
          </div>
          <div class="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700/50 rounded-2xl p-4 text-center shadow-sm hover:shadow-md transition card-item opacity-0">
            <span class="text-3xl font-black text-amber-600 dark:text-amber-400 block">{{ store.totalProses }}</span>
            <span class="text-[10px] font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wide">Proses</span>
          </div>
        </div>

        <!-- Recent Payments List -->
        <div class="space-y-3 recent-payments-list opacity-0 translate-y-[30px]">
          <div class="flex justify-between items-center">
            <h4 class="text-sm font-bold text-gray-800 dark:text-white flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1.5 text-primary dark:text-primary-light" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Setoran Terbaru
            </h4>
            <router-link to="/shohibul" class="text-xs font-semibold text-primary dark:text-primary-light hover:underline flex items-center">
              Lihat semua
              <svg xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5 ml-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
              </svg>
            </router-link>
          </div>

          <!-- Transaction List Items -->
          <div class="space-y-2.5 max-h-[300px] lg:max-h-[380px] overflow-y-auto pr-1">
            <div 
              v-for="tx in store.transactions.slice(0, 5)" 
              :key="tx.id"
              class="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700/50 rounded-2xl p-4 flex justify-between items-center shadow-sm hover:shadow-md transition"
            >
              <div class="flex items-center space-x-3">
                <div 
                  class="w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm shrink-0"
                  :class="tx.shohibulId === 'shohibul-01' ? 'bg-primary/10 text-primary dark:bg-primary/20 dark:text-primary-light' : 'bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300'"
                >
                  {{ getInitials(tx.name) }}
                </div>
                <div>
                  <div class="flex items-center space-x-2">
                    <span class="text-xs font-bold text-gray-800 dark:text-white leading-tight block">{{ tx.name }}</span>
                    <span class="px-1.5 py-0.5 bg-gray-100 dark:bg-gray-700 text-[8px] text-gray-500 dark:text-gray-400 font-semibold rounded uppercase tracking-wider">{{ tx.code }}</span>
                  </div>
                  <span class="text-[10px] text-gray-400 dark:text-gray-500">{{ formatDate(tx.date) }}</span>
                </div>
              </div>
              <span class="text-sm font-bold text-emerald-600 dark:text-emerald-400">
                {{ store.formatRupiah(tx.amount) }}
              </span>
            </div>
          </div>
        </div>

      </div>

    </div>

  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useQurbanStore } from '@/stores/qurban'
import gsap from 'gsap'

const store = useQurbanStore()
const containerRef = ref(null)

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

onMounted(() => {
  // Entrance GSAP animation
  const ctx = gsap.context(() => {
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })
    
    tl.to('.dashboard-header', { opacity: 1, y: 0, duration: 0.5 })
      .to('.user-welcome-card', { opacity: 1, scale: 1, duration: 0.5 }, '-=0.3')
      .to('.card-item', { opacity: 1, stagger: 0.08, duration: 0.4 }, '-=0.3')
      .to('.progress-widget', { opacity: 1, y: 0, duration: 0.5 }, '-=0.2')
      .to('.recent-payments-list', { opacity: 1, y: 0, duration: 0.5 }, '-=0.3')
  }, containerRef.value)
})
</script>
