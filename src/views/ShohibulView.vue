<template>
  <div class="px-4 py-5 space-y-4" ref="containerRef">
    
    <!-- Header App Bar -->
    <div class="flex items-center justify-between page-header opacity-0 translate-y-[-10px]">
      <h2 class="text-lg font-black text-gray-800 dark:text-white">Daftar Shohibul</h2>
      <span class="text-xs text-gray-400 dark:text-gray-500 font-semibold">{{ filteredShohibuls.length }} terdaftar</span>
    </div>

    <!-- Search Input -->
    <div class="relative search-box opacity-0">
      <input 
        v-model="searchQuery" 
        type="text" 
        placeholder="Cari nama atau alamat shohibul..." 
        class="w-full bg-white dark:bg-gray-800 text-sm border border-gray-100 dark:border-gray-700/50 rounded-2xl pl-10 pr-4 py-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent dark:text-white transition"
      />
      <div class="absolute left-3.5 top-3.5 text-gray-400">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-4.5 w-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </div>
    </div>

    <!-- Filtering Badges -->
    <div class="flex space-x-1.5 overflow-x-auto pb-1 -mx-4 px-4 filter-scroll opacity-0">
      <button 
        v-for="filter in filters" 
        :key="filter.value"
        @click="activeFilter = filter.value"
        class="px-3.5 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition cursor-pointer"
        :class="activeFilter === filter.value 
          ? 'bg-primary text-white shadow-sm glow-primary' 
          : 'bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-400 border border-gray-100 dark:border-gray-700/30'"
      >
        {{ filter.label }}
      </button>
    </div>

    <!-- Shohibuls Card Grid -->
    <div class="space-y-3 shohibul-cards-container">
      <div 
        v-for="shohibul in filteredShohibuls" 
        :key="shohibul.id"
        @click="openDetails(shohibul)"
        class="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700/50 rounded-3xl p-4 shadow-sm hover:shadow-md card-item transition duration-300 cursor-pointer flex flex-col justify-between space-y-3 relative overflow-hidden"
      >
        <div class="flex justify-between items-start">
          <div class="flex items-center space-x-3">
            <div class="w-10 h-10 rounded-2xl bg-teal-50 dark:bg-teal-950/40 text-primary dark:text-primary-light flex items-center justify-center font-bold text-sm shrink-0">
              {{ getInitials(shohibul.name) }}
            </div>
            <div>
              <div class="flex items-center space-x-2">
                <h3 class="text-sm font-bold text-gray-800 dark:text-white leading-tight">{{ shohibul.name }}</h3>
                <span class="px-1.5 py-0.5 bg-gray-100 dark:bg-gray-700 text-[8px] text-gray-500 dark:text-gray-400 font-semibold rounded uppercase tracking-wider">{{ shohibul.code }}</span>
              </div>
              <p class="text-[10px] text-gray-400 dark:text-gray-500 mt-0.5">{{ shohibul.address }}</p>
            </div>
          </div>
          <span 
            class="px-2 py-0.5 rounded-full text-[9px] font-black uppercase tracking-wider"
            :class="shohibul.collected >= shohibul.target 
              ? 'bg-green-100 text-green-700 dark:bg-green-950/40 dark:text-green-400' 
              : 'bg-amber-100 text-amber-700 dark:bg-amber-950/40 dark:text-amber-400'"
          >
            {{ shohibul.collected >= shohibul.target ? 'Lunas' : 'Proses' }}
          </span>
        </div>

        <div class="space-y-1.5 pt-2 border-t border-gray-100/70 dark:border-gray-700/30">
          <div class="flex justify-between text-xs">
            <span class="text-gray-400 dark:text-gray-500 font-medium">Terbayar:</span>
            <span class="font-bold text-gray-800 dark:text-white">
              {{ store.formatRupiah(shohibul.collected) }} 
              <span class="text-gray-400 font-normal">/ {{ store.formatRupiah(shohibul.target) }}</span>
            </span>
          </div>

          <!-- Progress Bar -->
          <div class="w-full h-1.5 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
            <div 
              class="h-full rounded-full transition-all duration-500"
              :class="shohibul.collected >= shohibul.target ? 'bg-green-500' : 'bg-primary'"
              :style="{ width: getPercentage(shohibul) + '%' }"
            ></div>
          </div>

          <div class="flex justify-between items-center text-[10px] text-gray-400 dark:text-gray-500 pt-0.5">
            <span>{{ shohibul.type === 'sapi' ? '🐄 Sapi' : '🐐 Kambing' }}</span>
            <span class="font-bold">{{ getPercentage(shohibul) }}%</span>
          </div>
        </div>
      </div>

      <div v-if="filteredShohibuls.length === 0" class="text-center py-12 text-gray-400 dark:text-gray-600">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 mx-auto mb-2 opacity-50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <p class="text-sm">Tidak ditemukan data shohibul</p>
      </div>
    </div>

    <!-- Shohibul Detail Slide-Up Modal Frame -->
    <transition name="slide-up">
      <div v-if="selectedShohibul" class="absolute inset-0 bg-black/60 z-50 flex flex-col justify-end">
        <!-- Close overlay -->
        <div class="flex-1" @click="closeDetails"></div>
        
        <!-- Modal Content Container -->
        <div class="bg-white dark:bg-gray-950 rounded-t-[32px] p-6 max-h-[85%] overflow-y-auto space-y-6 relative border-t border-white/10 shadow-2xl pb-[calc(20px+env(safe-area-inset-bottom,0px))]">
          <!-- Slide handle -->
          <div class="w-12 h-1.5 bg-gray-200 dark:bg-gray-800 rounded-full mx-auto -mt-2 mb-4 cursor-pointer" @click="closeDetails"></div>
          
          <div class="flex justify-between items-start">
            <div>
              <div class="flex items-center space-x-2">
                <h3 class="text-lg font-black text-gray-800 dark:text-white">{{ selectedShohibul.name }}</h3>
                <span class="px-1.5 py-0.5 bg-gray-100 dark:bg-gray-700 text-[8px] text-gray-500 dark:text-gray-400 font-bold rounded uppercase tracking-wider">{{ selectedShohibul.code }}</span>
              </div>
              <p class="text-xs text-gray-400 dark:text-gray-500 mt-1">{{ selectedShohibul.address }}</p>
            </div>
            <button @click="closeDetails" class="p-1 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4.5 w-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <!-- Quick Information Boxes -->
          <div class="grid grid-cols-2 gap-4">
            <div class="bg-gray-50 dark:bg-gray-900 border border-gray-100 dark:border-gray-800 p-4 rounded-3xl text-center space-y-1">
              <span class="text-[10px] font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wide">Hewan Target</span>
              <span class="text-sm font-black text-gray-800 dark:text-white block">
                {{ selectedShohibul.type === 'sapi' ? '🐄 Sapi' : '🐐 Kambing' }}
              </span>
              <span class="text-[9px] text-gray-400 block">{{ selectedShohibul.animalGroup }}</span>
            </div>
            
            <div class="bg-gray-50 dark:bg-gray-900 border border-gray-100 dark:border-gray-800 p-4 rounded-3xl text-center space-y-1">
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
          <div class="space-y-3 bg-gray-50 dark:bg-gray-900 border border-gray-100 dark:border-gray-800 p-4 rounded-3xl">
            <h4 class="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Perkembangan Dana</h4>
            <div class="space-y-2">
              <div class="flex justify-between items-center text-sm">
                <span class="text-gray-400 dark:text-gray-500">Telah Terbayar</span>
                <span class="font-extrabold text-emerald-600 dark:text-emerald-400">{{ store.formatRupiahFull(selectedShohibul.collected) }}</span>
              </div>
              <div class="flex justify-between items-center text-sm">
                <span class="text-gray-400 dark:text-gray-500">Target Qurban</span>
                <span class="font-extrabold text-gray-800 dark:text-white">{{ store.formatRupiahFull(selectedShohibul.target) }}</span>
              </div>
              <div v-if="selectedShohibul.target - selectedShohibul.collected > 0" class="flex justify-between items-center text-sm pt-2 border-t border-gray-200/50 dark:border-gray-800">
                <span class="text-gray-400 dark:text-gray-500 font-semibold">Kekurangan</span>
                <span class="font-extrabold text-amber-500">{{ store.formatRupiahFull(selectedShohibul.target - selectedShohibul.collected) }}</span>
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
                class="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800/80 p-3 rounded-2xl flex justify-between items-center"
              >
                <div>
                  <span class="text-xs font-bold text-gray-800 dark:text-white block">Setoran Tabungan</span>
                  <span class="text-[9px] text-gray-400">{{ formatDate(tx.date) }}</span>
                </div>
                <span class="text-sm font-bold text-emerald-600 dark:text-emerald-400">{{ store.formatRupiah(tx.amount) }}</span>
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
              class="flex-1 py-3 text-sm font-bold bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 rounded-2xl hover:bg-gray-200 dark:hover:bg-gray-700 transition"
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
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useQurbanStore } from '@/stores/qurban'
import gsap from 'gsap'

const store = useQurbanStore()
const router = useRouter()
const containerRef = ref(null)

const searchQuery = ref('')
const activeFilter = ref('semua')
const selectedShohibul = ref(null)

const filters = [
  { label: 'Semua', value: 'semua' },
  { label: 'Lunas', value: 'lunas' },
  { label: 'Proses', value: 'proses' },
  { label: '🐄 Sapi', value: 'sapi' },
  { label: '🐐 Kambing', value: 'kambing' }
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

const openDetails = (shohibul) => {
  selectedShohibul.value = shohibul
}

const closeDetails = () => {
  selectedShohibul.value = null
}

const goToDeposit = (shohibulId) => {
  // Pass shohibulId as parameter or query
  router.push({ name: 'menabung', query: { shohibulId } })
}

onMounted(() => {
  const ctx = gsap.context(() => {
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })
    
    tl.to('.page-header', { opacity: 1, y: 0, duration: 0.5 })
      .to('.search-box', { opacity: 1, duration: 0.5 }, '-=0.3')
      .to('.filter-scroll', { opacity: 1, duration: 0.5 }, '-=0.4')
      .to('.card-item', { opacity: 1, stagger: 0.08, duration: 0.5 }, '-=0.4')
  }, containerRef.value)
})
</script>

<style scoped>
/* Slide-Up transition for detail modal */
.slide-up-enter-active,
.slide-up-leave-active {
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}

.slide-up-enter-from,
.slide-up-leave-to {
  opacity: 0;
}

.slide-up-enter-from > div:last-child {
  transform: translateY(100%);
}

.slide-up-leave-to > div:last-child {
  transform: translateY(100%);
}

.slide-up-enter-to > div:last-child {
  transform: translateY(0);
}
</style>
