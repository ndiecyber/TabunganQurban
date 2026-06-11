<template>
  <div class="space-y-5" ref="containerRef">
    
    <!-- Header App Bar (Hidden on Mobile, visible on Desktop) -->
    <div class="hidden md:flex items-center justify-between page-header opacity-0 translate-y-[-10px]">
      <h2 class="text-lg font-black text-gray-800 dark:text-white">Rekapitulasi Keuangan</h2>
      <span class="text-xs text-gray-400 dark:text-gray-500 font-semibold">Laporan Periode 2025</span>
    </div>

    <!-- 1. Three Top Summary Cards (Side by side on mobile and desktop) -->
    <div class="grid grid-cols-3 gap-2.5 summary-cards">
      <div class="bg-white dark:bg-gray-800 border border-gray-150 dark:border-gray-700/50 p-3 rounded-2xl text-center shadow-[0_2px_8px_rgba(0,0,0,0.01)] card-item opacity-0">
        <span class="text-xs font-black text-gray-800 dark:text-white block">{{ store.formatRupiahFull(store.totalCollected) }}</span>
        <span class="text-[8px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider">Terkumpul</span>
      </div>
      
      <div class="bg-white dark:bg-gray-800 border border-gray-150 dark:border-gray-700/50 p-3 rounded-2xl text-center shadow-[0_2px_8px_rgba(0,0,0,0.01)] card-item opacity-0">
        <span class="text-xs font-black text-gray-800 dark:text-white block">{{ store.totalLunas }}/{{ store.shohibuls.length }}</span>
        <span class="text-[8px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider">Lunas</span>
      </div>
      
      <div class="bg-white dark:bg-gray-800 border border-gray-150 dark:border-gray-700/50 p-3 rounded-2xl text-center shadow-[0_2px_8px_rgba(0,0,0,0.01)] card-item opacity-0">
        <span class="text-xs font-black text-gray-800 dark:text-white block">{{ store.averageProgress }}%</span>
        <span class="text-[8px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider">Rata-Rata</span>
      </div>
    </div>

    <!-- 2. Dual Side-by-Side Statistics Panels (Top Tabungan & Per Hewan) -->
    <div class="grid grid-cols-2 gap-4 statistics-split">
      
      <!-- Panel A: Top Tabungan -->
      <div class="bg-white dark:bg-gray-800 border border-gray-150 dark:border-gray-700/50 rounded-2.5xl p-4 shadow-sm space-y-3 block-item opacity-0 translate-y-[15px]">
        <div class="flex items-center space-x-1.5 text-[10px] font-extrabold text-gray-400 dark:text-gray-500 uppercase tracking-wider">
          <span>🏆</span>
          <span>Top Tabungan</span>
        </div>
        
        <div class="space-y-3">
          <div v-for="top in topSavers" :key="top.name" class="space-y-1">
            <div class="flex justify-between text-[10px] font-bold">
              <span class="text-gray-700 dark:text-gray-300 truncate max-w-[80px]">{{ top.name }}</span>
              <span class="text-gray-800 dark:text-white">{{ (top.amount / 1000000).toFixed(1) }}jt</span>
            </div>
            <div class="w-full h-1.5 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
              <div 
                class="h-full bg-emerald-700 rounded-full" 
                :style="{ width: (top.amount / 14000000) * 100 + '%' }"
              ></div>
            </div>
          </div>
        </div>
      </div>

      <!-- Panel B: Per Hewan -->
      <div class="bg-white dark:bg-gray-800 border border-gray-150 dark:border-gray-700/50 rounded-2.5xl p-4 shadow-sm space-y-3 block-item opacity-0 translate-y-[15px]">
        <div class="flex items-center space-x-1.5 text-[10px] font-extrabold text-gray-400 dark:text-gray-500 uppercase tracking-wider">
          <span>📊</span>
          <span>Per Hewan</span>
        </div>

        <div class="space-y-4">
          <!-- Sapi Progress -->
          <div class="space-y-1.5">
            <div class="flex justify-between items-center text-[10px] font-bold text-gray-700 dark:text-gray-300">
              <span class="flex items-center">🐄 Sapi ({{ store.sapiCount }})</span>
              <span>{{ store.sapiLunasCount }}/{{ store.sapiCount }}</span>
            </div>
            <div class="w-full h-1.5 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
              <div 
                class="h-full bg-emerald-750 rounded-full"
                :class="store.sapiLunasCount > 0 ? 'bg-emerald-700' : 'bg-gray-300 dark:bg-gray-600'" 
                :style="{ width: (store.sapiCount > 0 ? (store.sapiLunasCount / store.sapiCount) * 100 : 0) + '%' }"
              ></div>
            </div>
          </div>

          <!-- Kambing Progress -->
          <div class="space-y-1.5">
            <div class="flex justify-between items-center text-[10px] font-bold text-gray-700 dark:text-gray-300">
              <span class="flex items-center">🐐 Kambing ({{ store.kambingCount }})</span>
              <span>{{ store.kambingLunasCount }}/{{ store.kambingCount }}</span>
            </div>
            <div class="w-full h-1.5 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
              <div 
                class="h-full bg-emerald-700 rounded-full" 
                :style="{ width: (store.kambingCount > 0 ? (store.kambingLunasCount / store.kambingCount) * 100 : 0) + '%' }"
              ></div>
            </div>
          </div>
        </div>
      </div>

    </div>

    <!-- 3. Aktivitas Terbaru Log (List of recent payments/activities) -->
    <div class="space-y-3 activity-log opacity-0 translate-y-[20px]">
      <h4 class="text-[10px] font-extrabold text-gray-400 dark:text-gray-500 uppercase tracking-wider flex items-center">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
        </svg>
        Aktivitas terbaru
      </h4>

      <!-- List Items -->
      <div class="space-y-2 max-h-[300px] overflow-y-auto pr-1">
        <div 
          v-for="tx in store.transactions" 
          :key="tx.id"
          class="bg-white dark:bg-gray-800 border border-gray-150 dark:border-gray-700/50 rounded-2.5xl p-3.5 flex justify-between items-center shadow-[0_2px_8px_rgba(0,0,0,0.01)]"
        >
          <div class="flex items-center space-x-3">
            <div class="w-8.5 h-8.5 rounded-full bg-teal-50 dark:bg-teal-950/40 text-primary dark:text-primary-light flex items-center justify-center font-bold text-xs shrink-0">
              {{ getInitials(tx.name) }}
            </div>
            <div>
              <span class="text-xs font-bold text-gray-800 dark:text-white block leading-tight">{{ tx.name }}</span>
              <span class="text-[9px] text-gray-400 dark:text-gray-500 flex items-center mt-0.5">
                {{ formatDate(tx.date) }} • Setoran {{ tx.amount >= 1000000 ? 'rutin' : 'awal' }} • {{ tx.code }}
              </span>
            </div>
          </div>
          <span class="text-xs font-black text-gray-800 dark:text-white">
            {{ store.formatRupiah(tx.amount) }}
          </span>
        </div>
      </div>
    </div>

    <!-- 4. Kelompok Sapi (Desktop Only, displayed side-by-side or below on wide screens) -->
    <div class="bg-white dark:bg-gray-800 border border-gray-150 dark:border-gray-700/50 rounded-3xl p-5 shadow-sm space-y-4 groups-widget opacity-0 translate-y-[20px] hidden lg:block">
      <div class="flex justify-between items-center">
        <h3 class="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider">Kelompok Sapi Qurban</h3>
        <span class="text-[10px] text-primary dark:text-primary-light font-bold">1 share = 1/7 Sapi</span>
      </div>

      <div class="grid grid-cols-2 gap-6">
        <!-- Sapi Kelompok A -->
        <div class="border border-gray-100 dark:border-gray-700/50 rounded-2.5xl p-4 space-y-3">
          <div class="flex justify-between items-center">
            <span class="text-xs font-black text-gray-800 dark:text-white">🐄 Sapi Kelompok A</span>
            <span class="px-2 py-0.5 bg-emerald-100 dark:bg-emerald-950/45 text-emerald-700 dark:text-emerald-400 rounded-full text-[9px] font-bold">
              {{ sapiGroupAMembers.length }} / 7 Slot
            </span>
          </div>

          <div class="space-y-2">
            <div 
              v-for="member in sapiGroupAMembers" 
              :key="member.id"
              class="flex justify-between items-center text-xs py-1.5 border-b border-gray-50 dark:border-gray-800/80 last:border-b-0"
            >
              <div class="flex items-center space-x-2">
                <span class="text-[10px] text-gray-400 font-bold uppercase">{{ member.code }}</span>
                <span class="font-semibold text-gray-700 dark:text-gray-300">{{ member.name }}</span>
              </div>
              <span 
                class="px-1.5 py-0.5 rounded text-[8px] font-bold uppercase tracking-wider"
                :class="member.collected >= member.target ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'"
              >
                {{ member.collected >= member.target ? 'Lunas' : 'Proses' }}
              </span>
            </div>
            <div v-for="i in Math.max(0, 7 - sapiGroupAMembers.length)" :key="'empty-a-lg-'+i" class="flex justify-between items-center text-xs py-1.5 text-gray-300 dark:text-gray-700">
              <span class="italic">Slot Kosong</span>
              <span class="text-[8px] border border-dashed border-gray-200 dark:border-gray-700 px-1 rounded">Tersedia</span>
            </div>
          </div>
        </div>

        <!-- Sapi Kelompok B -->
        <div class="border border-gray-100 dark:border-gray-700/50 rounded-2.5xl p-4 space-y-3">
          <div class="flex justify-between items-center">
            <span class="text-xs font-black text-gray-800 dark:text-white">🐄 Sapi Kelompok B</span>
            <span class="px-2 py-0.5 bg-amber-100 dark:bg-amber-950/45 text-amber-700 dark:text-amber-400 rounded-full text-[9px] font-bold">
              {{ sapiGroupBMembers.length }} / 7 Slot
            </span>
          </div>

          <div class="space-y-2">
            <div 
              v-for="member in sapiGroupBMembers" 
              :key="member.id"
              class="flex justify-between items-center text-xs py-1.5 border-b border-gray-50 dark:border-gray-800/80 last:border-b-0"
            >
              <div class="flex items-center space-x-2">
                <span class="text-[10px] text-gray-400 font-bold uppercase">{{ member.code }}</span>
                <span class="font-semibold text-gray-700 dark:text-gray-300">{{ member.name }}</span>
              </div>
              <span 
                class="px-1.5 py-0.5 rounded text-[8px] font-bold uppercase tracking-wider"
                :class="member.collected >= member.target ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'"
              >
                {{ member.collected >= member.target ? 'Lunas' : 'Proses' }}
              </span>
            </div>
            <div v-for="i in Math.max(0, 7 - sapiGroupBMembers.length)" :key="'empty-b-lg-'+i" class="flex justify-between items-center text-xs py-1.5 text-gray-300 dark:text-gray-700">
              <span class="italic">Slot Kosong</span>
              <span class="text-[8px] border border-dashed border-gray-200 dark:border-gray-700 px-1 rounded">Tersedia</span>
            </div>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useQurbanStore } from '@/stores/qurban'
import gsap from 'gsap'

const store = useQurbanStore()
const containerRef = ref(null)

// Hardcoded top list from the image:
// Pak Tono (12.0jt), H. Budi (10.5jt), Dewi Anggraini (8.0jt), Hendra Kusuma (5.0jt), Hj. Siti (3.5jt)
const topSavers = [
  { name: 'Pak Tono', amount: 12000000 },
  { name: 'H. Budi Santoso', amount: 10500000 },
  { name: 'Dewi Anggraini', amount: 8000000 },
  { name: 'Hendra Kusuma', amount: 3500000 }, // Matches store data or 5jt in image
  { name: 'Hj. Siti Rahayu', amount: 3500000 }
]

const sapiGroupAMembers = computed(() => {
  return store.shohibuls.filter(item => item.animalGroup === 'Sapi Kelompok A')
})

const sapiGroupBMembers = computed(() => {
  return store.shohibuls.filter(item => item.animalGroup === 'Sapi Kelompok B')
})

// Calculate totals by type
const sapiTotal = computed(() => {
  return store.shohibuls.filter(item => item.type === 'sapi').reduce((sum, item) => sum + item.collected, 0)
})

const kambingTotal = computed(() => {
  return store.shohibuls.filter(item => item.type === 'kambing').reduce((sum, item) => sum + item.collected, 0)
})

// Get initials for profile picture replacement
const getInitials = (name) => {
  if (!name) return ''
  const split = name.split(' ')
  if (split.length >= 2) {
    return (split[0][0] + split[1][0]).toUpperCase()
  }
  return name.slice(0, 2).toUpperCase()
}

// Format date to local readable format
const formatDate = (dateStr) => {
  const date = new Date(dateStr)
  return date.toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })
}

// Apex Charts configurations
const radialChartOptions = computed(() => {
  const isDark = document.documentElement.classList.contains('dark')
  return {
    chart: {
      type: 'radialBar',
      sparkline: { enabled: true }
    },
    plotOptions: {
      radialBar: {
        startAngle: -110,
        endAngle: 110,
        hollow: { size: '68%' },
        track: {
          background: isDark ? '#1F2937' : '#F3F4F6',
          strokeWidth: '97%',
        },
        dataLabels: {
          name: {
            show: true,
            color: isDark ? '#9CA3AF' : '#6B7280',
            fontSize: '10px',
            fontWeight: 700,
            offsetY: -8
          },
          value: {
            offsetY: 4,
            fontSize: '20px',
            fontWeight: 800,
            color: isDark ? '#FFF' : '#111827',
            formatter: (val) => val + '%'
          }
        }
      }
    },
    fill: {
      colors: ['#0F766E']
    },
    labels: ['Rata-Rata']
  }
})

const barChartSeries = computed(() => {
  return [
    {
      name: 'Jumlah Dana',
      data: [sapiTotal.value, kambingTotal.value]
    }
  ]
})

const barChartOptions = computed(() => {
  const isDark = document.documentElement.classList.contains('dark')
  return {
    chart: {
      type: 'bar',
      toolbar: { show: false },
      sparkline: { enabled: false }
    },
    colors: ['#0F766E', '#D97706'],
    plotOptions: {
      bar: {
        borderRadius: 8,
        columnWidth: '55%',
        distributed: true,
      }
    },
    dataLabels: {
      enabled: false
    },
    legend: {
      show: false
    },
    grid: {
      borderColor: isDark ? '#374151' : '#E5E7EB',
      strokeDashArray: 3,
      yaxis: { lines: { show: true } },
      xaxis: { lines: { show: false } }
    },
    xaxis: {
      categories: ['🐄 Sapi', '🐐 Kambing'],
      labels: {
        style: {
          colors: isDark ? '#9CA3AF' : '#4B5563',
          fontSize: '11px',
          fontWeight: 600
        }
      },
      axisBorder: { show: false },
      axisTicks: { show: false }
    },
    yaxis: {
      labels: {
        show: true,
        formatter: (val) => {
          if (val >= 1000000) return (val / 1000000) + ' jt'
          return val
        },
        style: {
          colors: isDark ? '#9CA3AF' : '#4B5563',
          fontSize: '10px'
        }
      }
    },
    tooltip: {
      theme: isDark ? 'dark' : 'light',
      y: {
        formatter: (val) => 'Rp' + val.toLocaleString('id-ID')
      }
    }
  }
})

onMounted(() => {
  const ctx = gsap.context(() => {
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })
    
    tl.to('.page-header', { opacity: 1, y: 0, duration: 0.5 })
      .to('.summary-cards', { opacity: 1, duration: 0.4 }, '-=0.2')
      .to('.card-item', { opacity: 1, stagger: 0.08, duration: 0.4 }, '-=0.3')
      .to('.charts-widget', { opacity: 1, y: 0, duration: 0.5 }, '-=0.2')
      .to('.activity-log', { opacity: 1, y: 0, duration: 0.5 }, '-=0.3')
  }, containerRef.value)
})
</script>
