<template>
  <div class="space-y-4" ref="containerRef">
    
    <!-- Header App Bar -->
    <div class="flex items-center justify-between page-header">
      <h2 class="text-lg font-black text-gray-800 dark:text-white font-heading">Daftar Shohibul</h2>
      <span class="text-xs text-gray-400 dark:text-gray-500 font-semibold">{{ filteredShohibuls.length }} terdaftar</span>
    </div>

    <!-- Search Input -->
    <div class="relative search-box">
      <input 
        v-model="searchQuery" 
        type="text" 
        placeholder="Cari nama atau alamat shohibul..." 
        class="w-full bg-white dark:bg-white/[0.03] text-sm border border-gray-200/50 dark:border-white/10 rounded-2xl pl-10 pr-4 py-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent dark:text-white transition"
      />
      <div class="absolute left-3.5 top-3.5 text-gray-400">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-4.5 w-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </div>
    </div>

    <!-- Filtering Badges -->
    <div class="flex space-x-1.5 overflow-x-auto pb-1 -mx-4 px-4 filter-scroll no-scrollbar">
      <button 
        v-for="filter in filters" 
        :key="filter.value"
        @click="activeFilter = filter.value"
        class="px-4 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition cursor-pointer flex items-center space-x-1"
        :class="activeFilter === filter.value 
          ? 'bg-primary text-white shadow-sm' 
          : 'bg-white dark:bg-white/[0.03] text-gray-500 dark:text-gray-400 border border-gray-200/50 dark:border-white/10'"
      >
        <span v-if="filter.icon">{{ filter.icon }}</span>
        <span>{{ filter.label }}</span>
      </button>
    </div>

    <!-- Count Indicator -->
    <div class="text-xs text-gray-400 dark:text-gray-500 px-1 font-semibold count-label">
      {{ filteredShohibuls.length }} dari {{ store.shohibuls.length }} shohibul
    </div>

    <!-- Shohibuls Card Grid -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 shohibul-cards-container">
      <div 
        v-for="(shohibul, idx) in filteredShohibuls" 
        :key="shohibul.id"
        @click="openDetails(shohibul, $event)"
        class="bg-white dark:bg-white/[0.03] border border-gray-200/50 dark:border-white/10 rounded-2xl p-4 shadow-sm card-item cursor-pointer hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between space-y-4"
      >
        <!-- Top Row: Avatar Initials + Name/Address + Progress Mini Bar -->
        <div class="flex justify-between items-start">
          <div class="flex items-start space-x-3">
            <div 
              class="w-10 h-10 rounded-full flex items-center justify-center font-bold text-xs shrink-0"
              :style="getAvatarStyle(shohibul.name)"
            >
              {{ getInitials(shohibul.name) }}
            </div>
            <div>
              <h3 class="text-sm font-extrabold text-gray-800 dark:text-white leading-tight">{{ shohibul.name }}</h3>
              <p class="text-[10px] text-gray-400 dark:text-gray-500 mt-1 flex items-center">
                {{ shohibul.code }} • {{ shohibul.type === 'sapi' ? '🐄 Sapi' : '🐐 Kambing' }}
              </p>
              <p class="text-xs font-bold text-secondary dark:text-secondary-light mt-2">
                {{ store.formatRupiahFull(shohibul.collected) }} <span class="text-gray-400 font-normal">/ {{ (shohibul.target / 1000000).toFixed(1) }}jt</span>
              </p>
            </div>
          </div>

          <!-- Top-Right Progress Mini Bar -->
          <div class="flex flex-col items-end space-y-1">
            <span class="text-[10px] font-black text-gray-700 dark:text-gray-300">{{ getPercentage(shohibul) }}%</span>
            <div class="w-16 h-1.5 bg-gray-100 dark:bg-white/10 rounded-full overflow-hidden">
              <div 
                class="h-full rounded-full transition-all duration-500"
                :class="shohibul.collected >= shohibul.target ? 'bg-green-500' : 'bg-secondary'"
                :style="{ width: getPercentage(shohibul) + '%' }"
              ></div>
            </div>
            <span v-if="shohibul.collected >= shohibul.target" class="text-[8px] font-extrabold text-green-600 dark:text-green-400 uppercase tracking-wider flex items-center">
              ✓ Lunas
            </span>
          </div>
        </div>

        <!-- Bottom Row: Action Buttons -->
        <div class="flex items-center justify-end space-x-2 pt-3 border-t border-gray-100 dark:border-white/5">
          <button 
            @click.stop="openDetails(shohibul, $event)"
            class="px-3.5 py-1.5 border border-gray-200 dark:border-white/10 rounded-xl text-xs font-bold text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-white/5 transition flex items-center space-x-1.5 cursor-pointer"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
            <span>Detail</span>
          </button>
          
          <button 
            v-if="shohibul.collected < shohibul.target"
            @click.stop="goToDeposit(shohibul.id)"
            class="px-3.5 py-1.5 bg-primary hover:bg-primary-light text-white rounded-xl text-xs font-bold transition flex items-center space-x-1.5 cursor-pointer shadow-sm"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>Tabung</span>
          </button>
        </div>
      </div>

      <div v-if="filteredShohibuls.length === 0" class="text-center py-12 text-gray-400 dark:text-gray-600 col-span-full">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 mx-auto mb-2 opacity-50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <p class="text-sm">Tidak ditemukan data shohibul</p>
      </div>
    </div>

    <!-- Shohibul Detail Slide-Up Modal -->
    <transition :css="false">
      <div v-if="selectedShohibul" class="absolute inset-0 bg-black/60 z-55 flex flex-col justify-end modal-backdrop">
        <div class="flex-1" @click="closeDetails"></div>
        
        <div class="bg-white dark:bg-dark rounded-t-[32px] p-6 max-h-[85%] overflow-y-auto space-y-6 relative border-t border-gray-200/50 dark:border-white/10 shadow-2xl pb-[calc(20px+env(safe-area-inset-bottom,0px))] details-modal-content">
          <div class="w-12 h-1.5 bg-gray-200 dark:bg-gray-700 rounded-full mx-auto -mt-2 mb-4 cursor-pointer" @click="closeDetails"></div>
          
          <div class="flex justify-between items-start">
            <div>
              <div class="flex items-center space-x-2">
                <h3 class="text-lg font-black text-gray-800 dark:text-white font-heading">{{ selectedShohibul.name }}</h3>
                <span class="px-1.5 py-0.5 bg-gray-100 dark:bg-white/5 text-[8px] text-gray-500 dark:text-gray-400 font-bold rounded uppercase tracking-wider">{{ selectedShohibul.code }}</span>
              </div>
              <p class="text-xs text-gray-400 dark:text-gray-500 mt-1">{{ selectedShohibul.address }}</p>
            </div>
            <button @click="closeDetails" class="p-1 rounded-full bg-gray-100 dark:bg-white/5 hover:bg-gray-200 dark:hover:bg-white/10 transition">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4.5 w-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <!-- Quick Information Boxes -->
          <div class="grid grid-cols-2 gap-4">
            <div class="bg-cream dark:bg-white/[0.03] border border-gray-200/50 dark:border-white/10 p-4 rounded-2xl text-center space-y-1">
              <span class="text-[10px] font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wide">Hewan Target</span>
              <span class="text-sm font-black text-gray-800 dark:text-white block">
                {{ selectedShohibul.type === 'sapi' ? '🐄 Sapi' : '🐐 Kambing' }}
              </span>
              <span class="text-[9px] text-gray-400 block">{{ selectedShohibul.animalGroup }}</span>
            </div>
            
            <div class="bg-cream dark:bg-white/[0.03] border border-gray-200/50 dark:border-white/10 p-4 rounded-2xl text-center space-y-1">
              <span class="text-[10px] font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wide">Status Tabungan</span>
              <span 
                class="text-xs font-black block py-0.5 px-2 rounded-full w-fit mx-auto"
                :class="selectedShohibul.collected >= selectedShohibul.target 
                  ? 'bg-green-100 text-green-700 dark:bg-green-950/40 dark:text-green-400' 
                  : 'bg-amber-100 text-amber-700 dark:bg-amber-950/40 dark:text-amber-400'"
              >
                {{ selectedShohibul.collected >= selectedShohibul.target ? 'Terpenuhi (Lunas)' : 'Dalam Proses' }}
              </span>
              <span class="text-[10px] font-bold text-primary dark:text-primary-light block">{{ getPercentage(selectedShohibul) }}% Terkumpul</span>
            </div>
          </div>

          <!-- Target Metrics -->
          <div class="space-y-3 bg-cream dark:bg-white/[0.03] border border-gray-200/50 dark:border-white/10 p-4 rounded-2xl">
            <h4 class="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Perkembangan Dana</h4>
            <div class="space-y-2">
              <div class="flex justify-between items-center text-sm">
                <span class="text-gray-400 dark:text-gray-500">Telah Terbayar</span>
                <span class="font-extrabold text-primary dark:text-primary-light">{{ store.formatRupiahFull(selectedShohibul.collected) }}</span>
              </div>
              <div class="flex justify-between items-center text-sm">
                <span class="text-gray-400 dark:text-gray-500">Target Qurban</span>
                <span class="font-extrabold text-gray-800 dark:text-white">{{ store.formatRupiahFull(selectedShohibul.target) }}</span>
              </div>
              <div v-if="selectedShohibul.target - selectedShohibul.collected > 0" class="flex justify-between items-center text-sm pt-2 border-t border-gray-200/50 dark:border-white/5">
                <span class="text-gray-400 dark:text-gray-500 font-semibold">Kekurangan</span>
                <span class="font-extrabold text-secondary">{{ store.formatRupiahFull(selectedShohibul.target - selectedShohibul.collected) }}</span>
              </div>
            </div>
          </div>

          <!-- Individual User Transactions Log -->
          <div class="space-y-3">
            <h4 class="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Riwayat Setoran Shohibul</h4>
            <div class="space-y-2 max-h-[200px] overflow-y-auto">
              <div 
                v-for="tx in memberTransactions" 
                :key="tx.id"
                class="bg-white dark:bg-white/[0.03] border border-gray-200/50 dark:border-white/10 p-3 rounded-2xl flex justify-between items-center"
              >
                <div>
                  <span class="text-xs font-bold text-gray-800 dark:text-white block">Setoran Tabungan</span>
                  <span class="text-[9px] text-gray-400">{{ formatDate(tx.date) }}</span>
                </div>
                <span class="text-sm font-bold text-primary dark:text-primary-light">{{ store.formatRupiah(tx.amount) }}</span>
              </div>
              
              <div v-if="memberTransactions.length === 0" class="text-center py-6 text-gray-400 text-xs">
                Belum ada riwayat pembayaran.
              </div>
            </div>
          </div>

          <!-- Bottom Actions -->
          <div class="pt-2 flex space-x-3">
            <button 
              @click="closeDetails" 
              class="flex-1 py-3 text-sm font-bold bg-gray-100 dark:bg-white/5 text-gray-600 dark:text-gray-300 rounded-2xl hover:bg-gray-200 dark:hover:bg-white/10 transition"
            >
              Kembali
            </button>
            <button 
              v-if="selectedShohibul.collected < selectedShohibul.target"
              @click="goToDeposit(selectedShohibul.id)"
              class="flex-1 py-3 text-sm font-bold bg-primary text-white rounded-2xl hover:bg-primary-light transition shadow-md glow-primary font-heading"
            >
              Setor Sekarang
            </button>
          </div>

        </div>
      </div>
    </transition>

  </div>
</template>

<script setup>
import { ref, computed, nextTick, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { useQurbanStore } from '@/stores/qurban'
import gsap from 'gsap'

const store = useQurbanStore()
const router = useRouter()
const containerRef = ref(null)
let ctx

const searchQuery = ref('')
const activeFilter = ref('semua')
const selectedShohibul = ref(null)

const filters = [
  { label: 'Semua', value: 'semua' },
  { label: 'Sapi', value: 'sapi', icon: '🐄' },
  { label: 'Kambing', value: 'kambing', icon: '🐐' },
  { label: 'Lunas', value: 'lunas' },
  { label: 'Proses', value: 'proses' }
]

// Filter shohibul logic
const filteredShohibuls = computed(() => {
  return store.shohibuls.filter(item => {
    // Search filter
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.value.toLowerCase()) || 
                          item.address.toLowerCase().includes(searchQuery.value.toLowerCase())
    
    // Type/Status filter
    let matchesCategory = true
    if (activeFilter.value === 'lunas') {
      matchesCategory = item.collected >= item.target
    } else if (activeFilter.value === 'proses') {
      matchesCategory = item.collected < item.target
    } else if (activeFilter.value === 'sapi') {
      matchesCategory = item.type === 'sapi'
    } else if (activeFilter.value === 'kambing') {
      matchesCategory = item.type === 'kambing'
    }

    return matchesSearch && matchesCategory
  })
})

// Get filtered member transactions
const memberTransactions = computed(() => {
  if (!selectedShohibul.value) return []
  return store.transactions.filter(tx => tx.shohibulId === selectedShohibul.value.id)
})

const getPercentage = (shohibul) => {
  if (shohibul.target === 0) return 0
  return Math.min(Math.round((shohibul.collected / shohibul.target) * 100), 100)
}

// Generate color style based on name hash (Gradient Avatars)
const getAvatarStyle = (name) => {
  if (!name) return {}
  const gradients = [
    { from: '#eab308', to: '#ca8a04', text: '#ffffff' },
    { from: '#10b981', to: '#047857', text: '#ffffff' },
    { from: '#3b82f6', to: '#1d4ed8', text: '#ffffff' },
    { from: '#8b5cf6', to: '#6d28d9', text: '#ffffff' },
    { from: '#ec4899', to: '#be185d', text: '#ffffff' },
    { from: '#f43f5e', to: '#be123c', text: '#ffffff' },
    { from: '#06b6d4', to: '#0891b2', text: '#ffffff' }
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

const getInitials = (name) => {
  if (!name) return ''
  const split = name.split(' ')
  if (split.length >= 2) {
    return (split[0][0] + split[1][0]).toUpperCase()
  }
  return name.slice(0, 2).toUpperCase()
}

const formatDate = (dateStr) => {
  const date = new Date(dateStr)
  return date.toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })
}

const clickedCardRect = ref(null)

const openDetails = (shohibul, event) => {
  const card = event.currentTarget
  clickedCardRect.value = card.getBoundingClientRect()
  selectedShohibul.value = shohibul
  
  nextTick(() => {
    const modalContent = document.querySelector('.details-modal-content')
    const backdrop = document.querySelector('.modal-backdrop')
    if (modalContent) {
      const modalRect = modalContent.getBoundingClientRect()
      const startX = clickedCardRect.value.left - modalRect.left
      const startY = clickedCardRect.value.top - modalRect.top
      
      gsap.fromTo(modalContent,
        {
          x: startX,
          y: startY,
          width: clickedCardRect.value.width,
          height: clickedCardRect.value.height,
          borderRadius: '1rem',
          opacity: 0.6,
          transformOrigin: 'top left'
        },
        {
          x: 0,
          y: 0,
          width: '100%',
          height: '100%',
          borderRadius: '2rem 2rem 0 0',
          opacity: 1,
          duration: 0.45,
          ease: 'power4.out',
          clearProps: 'x,y,transformOrigin'
        }
      )
    }
    if (backdrop) {
      gsap.fromTo(backdrop, { opacity: 0 }, { opacity: 1, duration: 0.35 })
    }
  })
}

const closeDetails = () => {
  const modalContent = document.querySelector('.details-modal-content')
  const backdrop = document.querySelector('.modal-backdrop')
  
  if (modalContent && clickedCardRect.value) {
    const modalRect = modalContent.getBoundingClientRect()
    const targetX = clickedCardRect.value.left - modalRect.left
    const targetY = clickedCardRect.value.top - modalRect.top
    
    gsap.to(modalContent, {
      x: targetX,
      y: targetY,
      width: clickedCardRect.value.width,
      height: clickedCardRect.value.height,
      borderRadius: '1rem',
      opacity: 0,
      duration: 0.35,
      ease: 'power3.inOut',
      onComplete: () => {
        selectedShohibul.value = null
        clickedCardRect.value = null
      }
    })
    if (backdrop) {
      gsap.to(backdrop, { opacity: 0, duration: 0.3 })
    }
  } else {
    selectedShohibul.value = null
    clickedCardRect.value = null
  }
}

const goToDeposit = (shohibulId) => {
  router.push({ name: 'menabung', query: { shohibulId } })
}

onMounted(() => {
  ctx = gsap.context(() => {
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })
    
    tl.from('.page-header', { opacity: 0, y: -10, duration: 0.5 })
      .from('.search-box', { opacity: 0, duration: 0.5 }, '-=0.3')
      .from('.filter-scroll', { opacity: 0, duration: 0.5 }, '-=0.4')
      .from('.count-label', { opacity: 0, duration: 0.3 }, '-=0.3')
  }, containerRef.value)
})

onUnmounted(() => {
  if (ctx) ctx.revert()
})
</script>
