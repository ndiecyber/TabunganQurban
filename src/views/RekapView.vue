<template>
  <div class="space-y-6 sm:space-y-8 pb-8" ref="containerRef">
    
    <!-- REPORT HERO CARD -->
    <div class="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-primary-dark via-primary to-teal-800 text-white p-6 sm:p-8 shadow-2xl hero-card flex flex-col min-h-[220px]">
      <!-- Background Elements -->
      <div class="absolute right-[-10%] top-[-20%] w-64 h-64 rounded-full bg-white/5 border border-white/10 pointer-events-none"></div>
      <div class="absolute left-[-10%] bottom-[-30%] w-48 h-48 rounded-full bg-secondary/20 blur-3xl pointer-events-none"></div>
      
      <div class="relative z-10 flex flex-col h-full justify-between space-y-6">
        <div class="flex justify-between items-start">
          <div class="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/10 backdrop-blur-md shadow-sm">
            <span class="text-white/90 text-[10px] font-extrabold tracking-[0.2em] uppercase">Laporan Keuangan</span>
          </div>
          <div class="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center backdrop-blur-md border border-white/10 shadow-inner">
            <FileTextIcon class="w-5 h-5 text-secondary" />
          </div>
        </div>
        
        <div>
          <p class="text-xs sm:text-sm text-teal-100/70 font-semibold tracking-wide uppercase mb-1">Total Kas Qurban 2025</p>
          <h2 class="text-4xl sm:text-5xl font-black text-white font-sans drop-shadow-lg tracking-tight">
            {{ store.formatRupiahFull(store.totalCollected) }}
          </h2>
          <div class="flex items-center space-x-2 mt-2.5">
            <span class="text-[10px] sm:text-xs bg-secondary/20 text-secondary-light px-2.5 py-1 rounded-full font-bold border border-secondary/20 backdrop-blur-sm shadow-sm flex items-center">
              <TrendingUpIcon class="w-3 h-3 mr-1" />
              Periode Aktif
            </span>
            <p class="text-[10px] sm:text-xs text-teal-200/80 font-medium ml-2">Diperbarui secara real-time</p>
          </div>
        </div>
      </div>
    </div>

    <!-- QUICK STATS (3 Columns) -->
    <div class="grid grid-cols-3 gap-3 sm:gap-4 quick-stats">
      <div class="bg-white dark:bg-white/[0.03] border border-gray-200/50 dark:border-white/10 rounded-[1.5rem] sm:rounded-3xl p-4 sm:p-5 flex flex-col items-center sm:items-start sm:flex-row sm:justify-between shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 relative overflow-hidden group">
        <div class="absolute right-[-10px] top-[-10px] opacity-[0.03] dark:opacity-5 group-hover:scale-110 transition-transform duration-500 pointer-events-none hidden sm:block">
          <WalletIcon class="w-32 h-32" />
        </div>
        <div class="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-primary/10 dark:bg-primary/20 flex items-center justify-center text-primary dark:text-primary-light shrink-0 mb-2 sm:mb-0">
          <WalletIcon class="w-5 h-5 sm:w-6 sm:h-6" />
        </div>
        <div class="text-center sm:text-right w-full sm:w-auto">
          <p class="text-[9px] sm:text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-1 truncate">Terkumpul</p>
          <p class="text-sm sm:text-2xl font-black text-gray-800 dark:text-white leading-none font-sans truncate">{{ store.formatRupiah(store.totalCollected) }}</p>
        </div>
      </div>

      <div class="bg-white dark:bg-white/[0.03] border border-gray-200/50 dark:border-white/10 rounded-[1.5rem] sm:rounded-3xl p-4 sm:p-5 flex flex-col items-center sm:items-start sm:flex-row sm:justify-between shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 relative overflow-hidden group">
        <div class="absolute right-[-10px] top-[-10px] opacity-[0.03] dark:opacity-5 group-hover:scale-110 transition-transform duration-500 pointer-events-none hidden sm:block">
          <CheckCircleIcon class="w-32 h-32" />
        </div>
        <div class="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-green-100 dark:bg-green-900/30 flex items-center justify-center text-green-600 dark:text-green-400 shrink-0 mb-2 sm:mb-0">
          <CheckCircleIcon class="w-5 h-5 sm:w-6 sm:h-6" />
        </div>
        <div class="text-center sm:text-right w-full sm:w-auto">
          <p class="text-[9px] sm:text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-1 truncate">Lunas</p>
          <p class="text-lg sm:text-2xl font-black text-gray-800 dark:text-white leading-none font-sans">{{ store.totalLunas }} / {{ store.shohibuls.length }}</p>
        </div>
      </div>

      <div class="bg-white dark:bg-white/[0.03] border border-gray-200/50 dark:border-white/10 rounded-[1.5rem] sm:rounded-3xl p-4 sm:p-5 flex flex-col items-center sm:items-start sm:flex-row sm:justify-between shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 relative overflow-hidden group">
        <div class="absolute right-[-10px] top-[-10px] opacity-[0.03] dark:opacity-5 group-hover:scale-110 transition-transform duration-500 pointer-events-none hidden sm:block">
          <PieChartIcon class="w-32 h-32" />
        </div>
        <div class="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center text-amber-600 dark:text-amber-400 shrink-0 mb-2 sm:mb-0">
          <PieChartIcon class="w-5 h-5 sm:w-6 sm:h-6" />
        </div>
        <div class="text-center sm:text-right w-full sm:w-auto">
          <p class="text-[9px] sm:text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-1 truncate">Progress</p>
          <p class="text-lg sm:text-2xl font-black text-gray-800 dark:text-white leading-none font-sans">{{ store.averageProgress }}%</p>
        </div>
      </div>
    </div>

    <!-- DUAL PANELS (Leaderboard & Progress) -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 statistics-split">
      
      <!-- Top Tabungan (Leaderboard) -->
      <div class="bg-white dark:bg-white/[0.02] border border-gray-200/50 dark:border-white/10 rounded-[2rem] p-5 sm:p-6 shadow-sm flex flex-col gap-4">
        <div class="flex justify-between items-center px-1">
          <h4 class="text-sm font-bold text-gray-800 dark:text-white  flex items-center">
            <TrophyIcon class="w-4 h-4 mr-2 text-secondary" />
            Top Tabungan
          </h4>
        </div>
        
        <div class="space-y-4">
          <div v-for="(top, index) in topSavers" :key="top.name" class="group">
            <div class="flex items-center space-x-3 mb-2">
              <div class="w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold shrink-0 shadow-sm"
                   :class="index === 0 ? 'bg-gradient-to-br from-yellow-300 to-yellow-600 text-white shadow-yellow-500/50' : 
                           index === 1 ? 'bg-gradient-to-br from-gray-300 to-gray-500 text-white shadow-gray-500/50' :
                           index === 2 ? 'bg-gradient-to-br from-orange-300 to-orange-700 text-white shadow-orange-500/50' :
                           'bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400 border border-gray-200 dark:border-gray-700'">
                {{ index + 1 }}
              </div>
              <div class="flex-1 flex justify-between items-end">
                <span class="text-xs font-bold text-gray-700 dark:text-gray-200 truncate group-hover:text-primary dark:group-hover:text-primary-light transition-colors">{{ top.name }}</span>
                <span class="text-xs font-black text-gray-900 dark:text-white">{{ (top.amount / 1000000).toFixed(1) }} Jt</span>
              </div>
            </div>
            <div class="w-full h-2 bg-gray-100 dark:bg-white/5 rounded-full overflow-hidden shadow-inner ml-9" style="width: calc(100% - 2.25rem)">
              <div 
                class="h-full rounded-full transition-all duration-1000 ease-out" 
                :class="index === 0 ? 'bg-gradient-to-r from-yellow-400 to-yellow-600 shadow-[0_0_8px_rgba(234,179,8,0.5)]' : 'bg-gradient-to-r from-primary to-primary-light'"
                :style="{ width: (top.amount / 12000000) * 100 + '%' }"
              ></div>
            </div>
          </div>
        </div>
      </div>
 
      <!-- Per Hewan Progress -->
      <div class="bg-white dark:bg-white/[0.02] border border-gray-200/50 dark:border-white/10 rounded-[2rem] p-5 sm:p-6 shadow-sm flex flex-col gap-6">
        <div class="flex justify-between items-center px-1">
          <h4 class="text-sm font-bold text-gray-800 dark:text-white  flex items-center">
            <TargetIcon class="w-4 h-4 mr-2 text-primary dark:text-primary-light" />
            Target Hewan
          </h4>
        </div>

        <div class="space-y-6">
          <!-- Sapi Progress -->
          <div class="space-y-3 p-4 rounded-[1.5rem] bg-gray-50 dark:bg-white/[0.03] border border-gray-100 dark:border-white/5 transition-all hover:border-primary/30">
            <div class="flex justify-between items-center">
              <div class="flex items-center space-x-2">
                <div class="w-8 h-8 rounded-xl bg-white dark:bg-gray-800 shadow-sm flex items-center justify-center text-lg">🐄</div>
                <div>
                  <span class="block text-xs font-bold text-gray-800 dark:text-white">Sapi Qurban</span>
                  <span class="block text-[10px] text-gray-500 dark:text-gray-400">Target: {{ store.sapiCount }} Ekor</span>
                </div>
              </div>
              <div class="text-right">
                <span class="block text-sm font-black text-primary dark:text-primary-light">{{ store.sapiLunasCount }} / {{ store.sapiCount }}</span>
                <span class="block text-[9px] font-bold text-gray-400 uppercase tracking-wider">Terdanai</span>
              </div>
            </div>
            <div class="w-full h-2.5 bg-gray-200 dark:bg-white/10 rounded-full overflow-hidden shadow-inner">
              <div 
                class="h-full rounded-full transition-all duration-1000 ease-out"
                :class="store.sapiLunasCount > 0 ? 'bg-gradient-to-r from-emerald-500 to-teal-400 shadow-[0_0_8px_rgba(16,185,129,0.4)]' : 'bg-transparent'" 
                :style="{ width: (store.sapiCount > 0 ? (store.sapiLunasCount / store.sapiCount) * 100 : 0) + '%' }"
              ></div>
            </div>
          </div>

          <!-- Kambing Progress -->
          <div class="space-y-3 p-4 rounded-[1.5rem] bg-gray-50 dark:bg-white/[0.03] border border-gray-100 dark:border-white/5 transition-all hover:border-secondary/30">
            <div class="flex justify-between items-center">
              <div class="flex items-center space-x-2">
                <div class="w-8 h-8 rounded-xl bg-white dark:bg-gray-800 shadow-sm flex items-center justify-center text-lg">🐐</div>
                <div>
                  <span class="block text-xs font-bold text-gray-800 dark:text-white">Kambing Qurban</span>
                  <span class="block text-[10px] text-gray-500 dark:text-gray-400">Target: {{ store.kambingCount }} Ekor</span>
                </div>
              </div>
              <div class="text-right">
                <span class="block text-sm font-black text-secondary">{{ store.kambingLunasCount }} / {{ store.kambingCount }}</span>
                <span class="block text-[9px] font-bold text-gray-400 uppercase tracking-wider">Terdanai</span>
              </div>
            </div>
            <div class="w-full h-2.5 bg-gray-200 dark:bg-white/10 rounded-full overflow-hidden shadow-inner">
              <div 
                class="h-full rounded-full transition-all duration-1000 ease-out" 
                :class="store.kambingLunasCount > 0 ? 'bg-gradient-to-r from-amber-500 to-yellow-400 shadow-[0_0_8px_rgba(245,158,11,0.4)]' : 'bg-transparent'"
                :style="{ width: (store.kambingCount > 0 ? (store.kambingLunasCount / store.kambingCount) * 100 : 0) + '%' }"
              ></div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- KELOMPOK SAPI (Responsive Horizontal Scroll on Mobile, Grid on Desktop) -->
    <div class="space-y-4 groups-widget">
      <div class="flex justify-between items-center px-1">
        <h4 class="text-sm font-bold text-gray-800 dark:text-white ">Kelompok Sapi Qurban</h4>
        <span class="px-3 py-1 bg-primary/10 dark:bg-white/5 text-primary dark:text-primary-light text-[10px] font-bold rounded-full">1 Slot = 1/7 Sapi</span>
      </div>

      <div class="flex overflow-x-auto snap-x snap-mandatory gap-4 sm:gap-6 pb-6 -mx-4 px-4 sm:mx-0 sm:px-0 lg:grid lg:grid-cols-2 lg:overflow-visible">
        
        <!-- Sapi Groups (Dynamic) -->
        <div 
          v-for="(group, gIdx) in sapiGroups" 
          :key="group.name"
          class="min-w-[85vw] sm:min-w-[320px] lg:min-w-0 snap-center bg-white dark:bg-white/[0.02] border border-gray-200/50 dark:border-white/10 rounded-[2rem] p-5 shadow-sm space-y-4 shrink-0 transition-all"
          :class="gIdx % 2 === 0 ? 'hover:border-primary/30' : 'hover:border-secondary/30'"
        >
          <div class="flex justify-between items-center pb-3 border-b border-gray-100 dark:border-white/5">
            <span class="text-sm font-black text-gray-800 dark:text-white flex items-center">
              <span class="mr-2 text-lg">🐄</span> {{ group.name }}
            </span>
            <span 
              class="px-2.5 py-1 rounded-md text-[9px] font-black uppercase tracking-wider"
              :class="gIdx % 2 === 0 ? 'bg-emerald-100 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400' : 'bg-amber-100 dark:bg-amber-950/40 text-amber-700 dark:text-amber-400'"
            >
              {{ group.members.length }} / 7 Slot
            </span>
          </div>

          <div class="space-y-1.5">
            <div 
              v-for="(member, idx) in group.members" 
              :key="member.id"
              class="flex justify-between items-center text-xs py-2 px-3 rounded-xl hover:bg-gray-50 dark:hover:bg-white/[0.03] transition-colors"
            >
              <div class="flex items-center space-x-3">
                <span class="w-5 h-5 rounded-md bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-[9px] font-bold text-gray-500">{{ idx + 1 }}</span>
                <div class="flex flex-col">
                  <span class="font-bold text-gray-800 dark:text-gray-200">{{ member.name }}</span>
                  <span class="text-[9px] text-gray-400 uppercase font-semibold">{{ member.code }}</span>
                </div>
              </div>
              <span 
                class="px-2 py-0.5 rounded-md text-[9px] font-bold uppercase tracking-wider"
                :class="member.collected >= member.target ? 'bg-green-100 dark:bg-green-950/40 text-green-700 dark:text-green-400' : 'bg-amber-100 dark:bg-amber-950/40 text-amber-700 dark:text-amber-400'"
              >
                {{ member.collected >= member.target ? 'Lunas' : 'Proses' }}
              </span>
            </div>
            
            <!-- Empty Slots -->
            <div 
              v-for="i in Math.max(0, 7 - group.members.length)" 
              :key="'empty-'+gIdx+'-'+i" 
              class="flex justify-between items-center text-xs py-2 px-3 rounded-xl border border-dashed border-gray-200 dark:border-white/10 text-gray-400 dark:text-gray-500"
            >
              <div class="flex items-center space-x-3">
                <span class="w-5 h-5 rounded-md border border-dashed border-gray-300 dark:border-gray-600 flex items-center justify-center text-[9px] font-bold">{{ group.members.length + i }}</span>
                <span class="italic font-medium">Slot Kosong</span>
              </div>
              <span class="text-[9px] font-bold uppercase bg-gray-100 dark:bg-gray-800 px-2 py-0.5 rounded-md">Tersedia</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- AKTIVITAS TERBARU (Consistent with Dashboard) -->
    <div class="space-y-4 recent-payments-list">
      <div class="flex justify-between items-center px-1">
        <h4 class="text-sm font-bold text-gray-800 dark:text-white ">Aktivitas Terbaru</h4>
      </div>

      <div class="bg-white dark:bg-white/[0.02] border border-gray-200/50 dark:border-white/10 rounded-[2rem] p-3 sm:p-4 shadow-sm">
        <div class="space-y-1.5 max-h-[350px] overflow-y-auto pr-1 custom-scrollbar">
          <div 
            v-for="tx in store.transactions" 
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
              <span class="inline-block px-2 py-0.5 mt-1 bg-green-100 dark:bg-green-950/40 text-green-700 dark:text-green-400 text-[9px] font-bold rounded-md uppercase tracking-wider">
                Setoran {{ tx.amount >= 1000000 ? 'Rutin' : 'Awal' }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useQurbanStore } from '@/stores/qurban'
import gsap from 'gsap'
import { FileTextIcon, TrendingUpIcon, WalletIcon, CheckCircleIcon, PieChartIcon, TrophyIcon, TargetIcon } from 'lucide-vue-next'

const store = useQurbanStore()
const containerRef = ref(null)
let ctx

// Hardcoded top list from the image:
const topSavers = [
  { name: 'Pak Tono', amount: 12000000 },
  { name: 'H. Budi', amount: 10500000 },
  { name: 'Dewi Anggraini', amount: 8000000 },
  { name: 'Hendra Kusuma', amount: 5000000 },
  { name: 'Hj. Siti', amount: 3500000 }
]

const sapiGroups = computed(() => {
  const groups = {}
  store.shohibuls.forEach(member => {
    if (member.type === 'sapi' && member.animalGroup && member.animalGroup !== 'Belum Ditentukan') {
      if (!groups[member.animalGroup]) {
        groups[member.animalGroup] = {
           name: member.animalGroup,
           members: []
        }
      }
      groups[member.animalGroup].members.push(member)
    }
  })
  
  return Object.values(groups).sort((a, b) => a.name.localeCompare(b.name))
})

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

onMounted(() => {
  ctx = gsap.context(() => {
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })
    
    tl.from('.hero-card', { opacity: 0, y: -20, duration: 0.6 })
      // Notice: Not animating individual quick-stats to avoid Tailwind conflict/invisibility bug
      .from('.statistics-split > div', { opacity: 0, y: 20, stagger: 0.15, duration: 0.5 }, '-=0.3')
      .from('.groups-widget', { opacity: 0, y: 20, duration: 0.5 }, '-=0.3')
      .from('.recent-payments-list', { opacity: 0, y: 30, duration: 0.5 }, '-=0.2')
  })
})

onUnmounted(() => {
  if (ctx) ctx.revert()
})
</script>

<style scoped>
.custom-scrollbar::-webkit-scrollbar {
  width: 4px;
}
.custom-scrollbar::-webkit-scrollbar-track {
  background: transparent;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background: rgba(156, 163, 175, 0.3);
  border-radius: 4px;
}
.dark .custom-scrollbar::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.1);
}
</style>
