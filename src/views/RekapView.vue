<template>
  <div class="px-4 py-5 space-y-5" ref="containerRef">
    
    <!-- Header App Bar -->
    <div class="flex items-center justify-between page-header opacity-0 translate-y-[-10px]">
      <h2 class="text-lg font-black text-gray-800 dark:text-white">Rekapitulasi Keuangan</h2>
      <span class="text-xs text-gray-400 dark:text-gray-500 font-semibold">Laporan Periode 2025</span>
    </div>

    <!-- Financial Summary Cards -->
    <div class="grid grid-cols-2 gap-3 summary-cards">
      <div class="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700/50 p-4 rounded-3xl space-y-1 shadow-sm hover:shadow-md transition card-item opacity-0">
        <span class="text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider block">Total Terkumpul</span>
        <span class="text-lg font-black text-emerald-600 dark:text-emerald-400 block">{{ store.formatRupiah(store.totalCollected) }}</span>
      </div>
      <div class="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700/50 p-4 rounded-3xl space-y-1 shadow-sm hover:shadow-md transition card-item opacity-0">
        <span class="text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider block">Kekurangan Target</span>
        <span class="text-lg font-black text-amber-500 block">{{ store.formatRupiah(Math.max(0, store.targetTotal - store.totalCollected)) }}</span>
      </div>
    </div>

    <!-- Graphical Statistics Widget (Radial Gauge & Bar Charts) -->
    <div class="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700/50 rounded-3xl p-5 shadow-sm space-y-4 charts-widget opacity-0 translate-y-[20px]">
      <h3 class="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider">Statistik Distribusi Dana</h3>
      
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4 items-center justify-center">
        <!-- Gauge Chart -->
        <div class="flex flex-col items-center justify-center">
          <apexchart 
            type="radialBar" 
            height="200" 
            :options="radialChartOptions" 
            :series="[store.progressPercentage]"
          ></apexchart>
          <span class="text-xs text-gray-500 dark:text-gray-400 font-medium -mt-2">Progres Target Qurban</span>
        </div>

        <!-- Bar Chart -->
        <div>
          <apexchart 
            type="bar" 
            height="180" 
            :options="barChartOptions" 
            :series="barChartSeries"
          ></apexchart>
        </div>
      </div>
    </div>

    <!-- Animal Group Allocation / Sapi Kelompok Allocator -->
    <div class="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700/50 rounded-3xl p-5 shadow-sm space-y-4 groups-widget opacity-0 translate-y-[20px]">
      <div class="flex justify-between items-center">
        <h3 class="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider">Kelompok Sapi Qurban</h3>
        <span class="text-[10px] text-primary dark:text-primary-light font-bold">1 share = 1/7 Sapi</span>
      </div>

      <div class="space-y-4">
        <!-- Sapi Kelompok A -->
        <div class="border border-gray-100 dark:border-gray-700/50 rounded-2.5xl p-4 space-y-3">
          <div class="flex justify-between items-center">
            <span class="text-xs font-black text-gray-800 dark:text-white">🐄 Sapi Kelompok A</span>
            <span class="px-2 py-0.5 bg-emerald-100 dark:bg-emerald-950/45 text-emerald-700 dark:text-emerald-400 rounded-full text-[9px] font-bold">
              {{ sapiGroupAMembers.length }} / 7 Slot
            </span>
          </div>

          <!-- Members Grid -->
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
                :class="member.collected >= member.target ? 'bg-green-100 text-green-700 dark:bg-green-950/20 dark:text-green-400' : 'bg-amber-100 text-amber-700 dark:bg-amber-950/20 dark:text-amber-400'"
              >
                {{ member.collected >= member.target ? 'Lunas' : 'Proses' }}
              </span>
            </div>

            <!-- Empty slots representation -->
            <div 
              v-for="i in Math.max(0, 7 - sapiGroupAMembers.length)" 
              :key="'empty-a-' + i"
              class="flex justify-between items-center text-xs py-1.5 border-b border-dashed border-gray-100 dark:border-gray-800 last:border-b-0 text-gray-300 dark:text-gray-700"
            >
              <span class="italic font-medium">Slot Kosong</span>
              <span class="text-[9px] font-bold uppercase tracking-wider border border-dashed border-gray-200 dark:border-gray-700 px-1.5 rounded">Tersedia</span>
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

          <!-- Members Grid -->
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
                :class="member.collected >= member.target ? 'bg-green-100 text-green-700 dark:bg-green-950/20 dark:text-green-400' : 'bg-amber-100 text-amber-700 dark:bg-amber-950/20 dark:text-amber-400'"
              >
                {{ member.collected >= member.target ? 'Lunas' : 'Proses' }}
              </span>
            </div>

            <div 
              v-for="i in Math.max(0, 7 - sapiGroupBMembers.length)" 
              :key="'empty-b-' + i"
              class="flex justify-between items-center text-xs py-1.5 border-b border-dashed border-gray-100 dark:border-gray-800 last:border-b-0 text-gray-300 dark:text-gray-700"
            >
              <span class="italic font-medium">Slot Kosong</span>
              <span class="text-[9px] font-bold uppercase tracking-wider border border-dashed border-gray-200 dark:border-gray-700 px-1.5 rounded">Tersedia</span>
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

// Grouping members based on mock metadata
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
    labels: ['Terkumpul']
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
      .to('.card-item', { opacity: 1, stagger: 0.1, duration: 0.4 }, '-=0.3')
      .to('.charts-widget', { opacity: 1, y: 0, duration: 0.5 }, '-=0.2')
      .to('.groups-widget', { opacity: 1, y: 0, duration: 0.5 }, '-=0.3')
  }, containerRef.value)
})
</script>
