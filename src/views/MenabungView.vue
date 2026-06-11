<template>
  <div class="space-y-5" ref="containerRef">
    
    <!-- Header App Bar (Visible on all viewports) -->
    <div class="flex items-center justify-between page-header">
      <h2 class="text-lg font-black text-gray-800 dark:text-white">Menabung Qurban</h2>
      <span class="text-xs text-amber-500 dark:text-amber-400 font-bold flex items-center">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
        Instan & Mudah
      </span>
    </div>

    <!-- Double Tab Toggles (Visible only on Mobile/Tablet) -->
    <div class="bg-gray-100 dark:bg-gray-800/80 p-1 rounded-2xl flex tab-toggle lg:hidden">
      <button 
        @click="activeTab = 'setor'"
        class="flex-1 py-2.5 text-xs font-bold rounded-xl transition cursor-pointer"
        :class="activeTab === 'setor' ? 'bg-white dark:bg-gray-700 text-primary dark:text-white shadow-sm' : 'text-gray-400 dark:text-gray-500'"
      >
        Setoran Tabungan
      </button>
      <button 
        @click="activeTab = 'kalkulator'"
        class="flex-1 py-2.5 text-xs font-bold rounded-xl transition cursor-pointer"
        :class="activeTab === 'kalkulator' ? 'bg-white dark:bg-gray-700 text-primary dark:text-white shadow-sm' : 'text-gray-400 dark:text-gray-500'"
      >
        Kalkulator Target
      </button>
    </div>

    <!-- Grid Container -->
    <div class="grid grid-cols-1 lg:grid-cols-12 gap-6">
      
      <!-- COLUMN 1: SETORAN TABUNGAN FORM -->
      <div 
        class="lg:col-span-6 space-y-4"
        :class="{'hidden lg:block': activeTab !== 'setor'}"
      >
        <!-- Card 1: Select Shohibul -->
        <div class="bg-white dark:bg-gray-800 border border-gray-150 dark:border-gray-700/50 rounded-2.5xl p-5 shadow-[0_4px_12px_rgba(0,0,0,0.02)] space-y-3">
          <div class="flex items-center space-x-2 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
            <span>👤</span>
            <span>Pilih shohibul qurban</span>
          </div>
          
          <select 
            v-model="form.shohibulId"
            class="w-full bg-gray-50 dark:bg-gray-950 text-sm border border-gray-200/50 dark:border-gray-800 rounded-2xl px-4 py-3.5 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent dark:text-white transition"
          >
            <option value="" disabled selected>— Pilih nama shohibul —</option>
             <option 
              v-for="s in store.shohibuls" 
              :key="s.id" 
              :value="s.id"
            >
              {{ s.name }} ({{ s.type === 'sapi' ? 'Sapi' : 'Kambing' }} - {{ s.code }})
            </option>
          </select>
        </div>

        <!-- Card 2: Select Nominal -->
        <div class="bg-white dark:bg-gray-800 border border-gray-150 dark:border-gray-700/50 rounded-2.5xl p-5 shadow-[0_4px_12px_rgba(0,0,0,0.02)] space-y-4">
          <div class="flex items-center space-x-2 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
            <span>💵</span>
            <span>Pilih nominal tabungan</span>
          </div>

          <!-- 3x2 Grid for Predefined Nominal Options + Custom Input Option below -->
          <div class="grid grid-cols-3 gap-3">
            <button 
              v-for="preset in nominalPresets" 
              :key="preset.value"
              type="button"
              @click="selectPreset(preset.value)"
              class="border rounded-2xl p-3 text-center cursor-pointer transition select-none flex flex-col items-center justify-center space-y-1"
              :class="form.amount === preset.value && !isCustomAmountSelected
                ? 'border-primary bg-primary/5 dark:bg-primary/10 text-primary dark:text-primary-light font-bold' 
                : 'border-gray-150 dark:border-gray-800 bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-300'"
            >
              <span class="text-xs text-amber-500 font-bold">🎖️</span>
              <span class="text-xs font-extrabold">{{ preset.label }}</span>
              <span class="text-[9px] text-gray-400 dark:text-gray-500">Rp{{ preset.value.toLocaleString('id-ID') }}</span>
            </button>
          </div>

          <!-- Nominal Lain Custom Option Button -->
          <div 
            @click="activateCustomAmount"
            class="border rounded-2.5xl p-3 px-4 cursor-pointer transition select-none flex items-center justify-between"
            :class="isCustomAmountSelected 
              ? 'border-primary bg-primary/5 dark:bg-primary/10' 
              : 'border-gray-150 dark:border-gray-800 bg-white dark:bg-gray-900'"
          >
            <div class="flex items-center space-x-3 text-left">
              <span class="text-lg">✏️</span>
              <div>
                <span class="text-xs font-extrabold text-gray-800 dark:text-white block">Nominal lain</span>
                <span class="text-[9px] text-gray-400 dark:text-gray-500">Kelipatan Rp 50.000</span>
              </div>
            </div>
            <div v-if="isCustomAmountSelected" class="w-5 h-5 rounded-full bg-primary flex items-center justify-center text-white text-[10px]">✓</div>
          </div>

          <!-- Custom Amount Input Field (Toggled by "Nominal Lain") -->
          <div v-if="isCustomAmountSelected" class="pt-2 animate-fade-in">
            <div class="relative">
              <span class="absolute left-4 top-3.5 text-sm font-bold text-gray-400">Rp</span>
              <input 
                v-model.number="form.amount" 
                type="number" 
                placeholder="Masukkan nominal kelipatan Rp50.000..." 
                class="w-full bg-gray-50 dark:bg-gray-900 text-sm border border-gray-150 dark:border-gray-800 rounded-2.5xl pl-10 pr-4 py-3.5 font-bold focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent dark:text-white transition"
              />
            </div>
          </div>

          <!-- Payment Method -->
          <div class="space-y-2 pt-2 border-t border-gray-100 dark:border-gray-700/50">
            <label class="text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider block">Metode Pembayaran</label>
            <div class="grid grid-cols-2 gap-3">
              <!-- QRIS Option -->
              <div 
                @click="form.paymentMethod = 'qris'"
                class="border rounded-2xl p-3 text-center cursor-pointer transition select-none flex flex-col items-center space-y-1"
                :class="form.paymentMethod === 'qris' 
                  ? 'border-primary bg-primary/5 dark:bg-primary/10' 
                  : 'border-gray-150 dark:border-gray-850 bg-gray-50/50 dark:bg-gray-900/50'"
              >
                <span class="text-lg">📱</span>
                <span class="text-xs font-bold dark:text-white block">QRIS Masjid</span>
                <span class="text-[9px] text-gray-400">Verifikasi Instan</span>
              </div>

              <!-- VA Option -->
              <div 
                @click="form.paymentMethod = 'va'"
                class="border rounded-2xl p-3 text-center cursor-pointer transition select-none flex flex-col items-center space-y-1"
                :class="form.paymentMethod === 'va' 
                  ? 'border-primary bg-primary/5 dark:bg-primary/10' 
                  : 'border-gray-150 dark:border-gray-850 bg-gray-50/50 dark:bg-gray-900/50'"
              >
                <span class="text-lg">🏦</span>
                <span class="text-xs font-bold dark:text-white block">Transfer Bank</span>
                <span class="text-[9px] text-gray-400">Simulasi Virtual Account</span>
              </div>
            </div>
          </div>

          <!-- Submit Button -->
          <div class="pt-2">
            <button 
              v-if="!form.shohibulId"
              disabled
              class="w-full py-4 text-sm font-extrabold bg-[#d1e2da] dark:bg-gray-800 text-[#558a74] dark:text-gray-600 rounded-2.5xl cursor-not-allowed flex items-center justify-center space-x-2"
            >
              <span>Pilih shohibul dahulu</span>
            </button>
            <button 
              v-else
              @click="submitDeposit"
              class="w-full py-4 text-sm font-extrabold bg-[#10513c] hover:bg-emerald-800 text-white rounded-2.5xl transition shadow-md glow-primary font-heading"
            >
              Lanjutkan Pembayaran
            </button>
          </div>

        </div>
      </div>

      <!-- COLUMN 2: INTERACTIVE CALCULATOR (Desktop right-panel) -->
      <div 
        class="lg:col-span-6 space-y-4"
        :class="{'hidden lg:block': activeTab !== 'kalkulator'}"
      >
        <div class="bg-white dark:bg-gray-800 border border-gray-155 dark:border-gray-700/50 rounded-3xl p-5 shadow-[0_4px_12px_rgba(0,0,0,0.02)] space-y-5">
          <h3 class="text-sm font-black text-gray-800 dark:text-white font-heading">Simulasi Rencana Qurban</h3>
          
          <!-- Target Type -->
          <div class="space-y-1.5">
            <label class="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Target Qurban</label>
            <div class="grid grid-cols-3 gap-2">
              <button 
                v-for="target in calcTargets" 
                :key="target.value"
                @click="calc.targetValue = target.price; calc.targetName = target.label; calc.targetType = target.type"
                class="p-2.5 rounded-xl border border-gray-150 dark:border-gray-800 text-[10px] font-bold text-center transition flex flex-col justify-between items-center"
                :class="calc.targetValue === target.price ? 'bg-primary/10 border-primary text-primary dark:bg-primary/20 dark:text-primary-light' : 'bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-400'"
              >
                <span class="text-lg mb-1">{{ target.icon }}</span>
                <span class="leading-tight mb-1">{{ target.label }}</span>
                <span class="text-[9px] text-amber-500">{{ store.formatRupiah(target.price) }}</span>
              </button>
            </div>
          </div>

          <!-- Months Duration Slider -->
          <div class="space-y-2 pt-2">
            <div class="flex justify-between items-center text-xs">
              <span class="text-gray-500 dark:text-gray-400 font-bold uppercase tracking-wider">Durasi Tabungan</span>
              <span class="font-extrabold text-primary dark:text-primary-light">{{ calc.months }} Bulan</span>
            </div>
            <input 
              type="range" 
              min="1" 
              max="12" 
              v-model.number="calc.months" 
              class="w-full accent-primary bg-gray-100 dark:bg-gray-700 rounded-full h-1.5"
            />
            <div class="flex justify-between text-[10px] text-gray-400 dark:text-gray-500">
              <span>1 Bulan</span>
              <span>6 Bulan</span>
              <span>12 Bulan</span>
            </div>
          </div>

          <!-- Calculated Result Output Card -->
          <div class="bg-primary text-white rounded-3xl p-5 text-center shadow-lg relative overflow-hidden">
            <div class="absolute inset-0 bg-emerald-950/20 pointer-events-none"></div>
            <span class="text-xs text-teal-200">Estimasi Tabungan Berkala</span>
            <h4 class="text-2xl font-black mt-1 text-amber-300 font-heading">
              {{ store.formatRupiahFull(monthlySaving) }} <span class="text-xs text-white/80 font-normal font-sans">/ bulan</span>
            </h4>
            <p class="text-[10px] text-teal-100/80 mt-1">
              Atau setara <span class="font-bold text-white">{{ store.formatRupiahFull(weeklySaving) }}</span> per minggu
            </p>
          </div>

          <!-- Create New Shohibul Directly Box -->
          <div class="border-t border-gray-100 dark:border-gray-700/50 pt-4 space-y-3">
            <div class="flex justify-between items-center">
              <h4 class="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Daftar Shohibul Baru</h4>
              <span class="px-2 py-0.5 bg-amber-500/10 text-amber-600 rounded text-[9px] font-bold">Simulasi Tambah</span>
            </div>

            <div class="space-y-2">
              <input 
                v-model="newMember.name" 
                type="text" 
                placeholder="Nama Lengkap Shohibul" 
                class="w-full bg-gray-50 dark:bg-gray-900 text-xs border border-gray-150 dark:border-gray-800 rounded-xl px-3 py-2.5 focus:outline-none focus:ring-1 focus:ring-primary focus:border-transparent dark:text-white"
              />
              <input 
                v-model="newMember.address" 
                type="text" 
                placeholder="Alamat / No. Blok (Contoh: B05)" 
                class="w-full bg-gray-50 dark:bg-gray-900 text-xs border border-gray-150 dark:border-gray-800 rounded-xl px-3 py-2.5 focus:outline-none focus:ring-1 focus:ring-primary focus:border-transparent dark:text-white"
              />
              
              <button 
                @click="registerNewMember"
                class="w-full py-2.5 bg-gray-800 dark:bg-gray-700 text-white rounded-xl text-xs font-bold hover:bg-gray-900 dark:hover:bg-gray-655 transition"
              >
                Mulai Menabung dengan Rencana Ini
              </button>
            </div>
          </div>
        </div>
      </div>

    </div>

    <!-- QRIS PAYMENT FLOW SCREEN (MODAL SLIDE-UP) -->
    <transition name="slide-up">
      <div v-if="paymentModalVisible" class="absolute inset-0 bg-black/60 z-55 flex flex-col justify-end">
        <div class="flex-1" @click="closePaymentModal"></div>
        
        <div class="bg-white dark:bg-gray-950 rounded-t-[32px] p-6 max-h-[90%] overflow-y-auto space-y-5 text-center relative shadow-2xl pb-[calc(25px+env(safe-area-inset-bottom,0px))]">
          <div class="w-12 h-1.5 bg-gray-200 dark:bg-gray-800 rounded-full mx-auto -mt-2 mb-2"></div>
          
          <div class="flex justify-between items-center px-2">
            <h3 class="text-sm font-bold text-gray-800 dark:text-white">Pembayaran {{ form.paymentMethod === 'qris' ? 'QRIS DKM Masjid' : 'Transfer Bank (VA)' }}</h3>
            <button @click="closePaymentModal" class="p-1 rounded-full bg-gray-100 dark:bg-gray-800">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4.5 w-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <!-- Invoice Details -->
          <div class="bg-gray-50 dark:bg-gray-900/50 border border-gray-150 dark:border-gray-800 p-4 rounded-3xl space-y-1.5">
            <span class="text-[10px] text-gray-400 uppercase tracking-wide font-medium">Nominal Pembayaran</span>
            <h4 class="text-xl font-black text-primary dark:text-primary-light font-heading">
              {{ store.formatRupiahFull(form.amount) }}
            </h4>
            <p class="text-[10px] text-gray-400">
              Shohibul: <span class="font-bold text-gray-700 dark:text-gray-300">{{ selectedMember?.name }}</span>
            </p>
          </div>

          <!-- Display QRIS Image if selected -->
          <div v-if="form.paymentMethod === 'qris'" class="space-y-3">
            <div class="mx-auto w-[200px] h-[200px] bg-white border border-gray-150 dark:border-gray-800 rounded-3xl overflow-hidden shadow-md p-2 flex items-center justify-center">
              <img src="/qris-dkm.jpg" alt="QRIS DKM Masjid Jami Kassiti" class="max-w-full max-h-full object-contain" />
            </div>
            <p class="text-[10px] text-gray-400 max-w-[280px] mx-auto leading-relaxed">
              Scan QRIS diatas menggunakan M-Banking or E-Wallet (Gopay, OVO, Dana, LinkAja).
            </p>
          </div>

          <!-- Display Bank VA details if selected -->
          <div v-else class="space-y-4 py-2">
            <div class="bg-gray-50 dark:bg-gray-900 p-4 rounded-3xl border border-gray-150 dark:border-gray-800 text-left space-y-3">
              <div class="flex justify-between items-center">
                <span class="text-xs text-gray-400 font-bold">BANK SYARIAH INDONESIA (BSI)</span>
                <span class="text-[10px] text-gray-400">Kassiti Qurban</span>
              </div>
              <div class="flex justify-between items-center pt-1">
                <span class="text-base font-extrabold text-gray-800 dark:text-white tracking-widest">451-900281-{{ selectedMember?.code || '00' }}</span>
                <button @click="copyVA" class="text-xs text-primary font-bold hover:underline">Salin</button>
              </div>
            </div>
            <p class="text-[10px] text-gray-400 max-w-[280px] mx-auto leading-relaxed">
              Transfer nominal presisi di atas ke Virtual Account BSI DKM Masjid Jami Kassiti.
            </p>
          </div>

          <!-- Confirm Payment (Simulated) -->
          <div class="pt-2">
            <button 
              @click="confirmPaymentSimulation"
              class="w-full py-4 text-sm font-bold bg-[#10513c] hover:bg-emerald-800 text-white rounded-2.5xl transition shadow-md glow-primary font-heading"
            >
              Saya Sudah Membayar (Simulasi)
            </button>
          </div>
        </div>
      </div>
    </transition>

    <!-- PAYMENT SUCCESS CELEBRATION MODAL (CONFIRMATION STAMP) -->
    <transition name="fade">
      <div v-if="successScreenVisible" class="absolute inset-0 bg-white/95 dark:bg-gray-950/95 z-55 flex flex-col items-center justify-center p-6 text-center space-y-5">
        <!-- Success Animation Circle Elements -->
        <div class="success-circle w-20 h-20 bg-green-100 dark:bg-green-950/40 border-2 border-green-500 rounded-full flex items-center justify-center opacity-0 scale-50">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10 text-green-600 dark:text-green-400 success-check" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="3">
            <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>

        <div class="space-y-2 success-text opacity-0 translate-y-[20px]">
          <h3 class="text-xl font-black text-gray-800 dark:text-white font-heading">Pembayaran Berhasil!</h3>
          <p class="text-xs text-gray-400 max-w-[280px] leading-relaxed mx-auto">
            Setoran tabungan sebesar <span class="font-bold text-primary dark:text-primary-light">{{ store.formatRupiahFull(form.amount) }}</span> telah sukses dicatat untuk shohibul <span class="font-bold text-gray-700 dark:text-gray-300">{{ selectedMember?.name }}</span>.
          </p>
        </div>

        <div class="w-full max-w-xs success-btn opacity-0 translate-y-[20px]">
          <button 
            @click="closeSuccessScreen"
            class="w-full py-3.5 bg-gray-800 dark:bg-gray-700 text-white rounded-2xl font-bold hover:bg-gray-900 transition"
          >
            Selesai
          </button>
        </div>
      </div>
    </transition>

  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useQurbanStore } from '@/stores/qurban'
import gsap from 'gsap'

const store = useQurbanStore()
const route = useRoute()
const router = useRouter()

const containerRef = ref(null)
let ctx

const activeTab = ref('setor')

// State for tab 1 (Setoran)
const form = ref({
  shohibulId: '',
  amount: null,
  paymentMethod: 'qris'
})

const quickAmounts = [50000, 100000, 200000, 300000, 500000, 1000000]
const isCustomAmountSelected = ref(false)

const selectedMember = computed(() => {
  if (!form.value.shohibulId) return null
  return store.shohibuls.find(item => item.id === form.value.shohibulId)
})

const selectPreset = (val) => {
  isCustomAmountSelected.value = false
  form.value.amount = val
}

const activateCustomAmount = () => {
  isCustomAmountSelected.value = true
  form.value.amount = null
}

// State for tab 2 (Calculator)
const calc = ref({
  targetValue: 3000000,
  targetName: 'Sapi Share',
  targetType: 'sapi',
  months: 6
})

const calcTargets = [
  { label: '🐐 Kambing', price: 3000000, icon: '🐐', type: 'kambing' },
  { label: '🐄 Sapi Share', price: 3000000, icon: '🐄', type: 'sapi' },
  { label: '🐄 Sapi Mandiri', price: 21000000, icon: '👑', type: 'sapi' }
]

const nominalPresets = [
  { label: '+Rp50 rb', value: 50000 },
  { label: '+Rp100 rb', value: 100000 },
  { label: '+Rp200 rb', value: 200000 },
  { label: '+Rp300 rb', value: 300000 },
  { label: '+Rp500 rb', value: 500000 },
  { label: '+Rp1 jt', value: 1000000 }
]

const monthlySaving = computed(() => {
  return Math.round(calc.value.targetValue / calc.value.months)
})

const weeklySaving = computed(() => {
  return Math.round(calc.value.targetValue / (calc.value.months * 4))
})

const newMember = ref({
  name: '',
  address: ''
})

// Modal states
const paymentModalVisible = ref(false)
const successScreenVisible = ref(false)

// Actions
const submitDeposit = () => {
  if (!form.value.shohibulId) {
    alert('Silakan pilih shohibul terlebih dahulu!')
    return
  }
  if (!form.value.amount || form.value.amount <= 0) {
    alert('Silakan masukkan jumlah nominal setoran!')
    return
  }
  paymentModalVisible.value = true
}

const closePaymentModal = () => {
  paymentModalVisible.value = false
}

const confirmPaymentSimulation = () => {
  const success = store.addTransaction(form.value.shohibulId, form.value.amount)
  if (success) {
    paymentModalVisible.value = false
    successScreenVisible.value = true
    
    // Play payment success celebration animation using GSAP
    setTimeout(() => {
      gsap.timeline()
        .to('.success-circle', { opacity: 1, scale: 1, duration: 0.6, ease: 'back.out(1.7)' })
        .to('.success-text', { opacity: 1, y: 0, duration: 0.4 }, '-=0.2')
        .to('.success-btn', { opacity: 1, y: 0, duration: 0.4 }, '-=0.1')
    }, 100)
  }
}

const copyVA = () => {
  alert('Virtual Account disalin ke papan klip!')
}

const closeSuccessScreen = () => {
  successScreenVisible.value = false
  // Reset form
  form.value.amount = null
  isCustomAmountSelected.value = false
  // Redirect back to dashboard to see updated stats
  router.push('/')
}

const registerNewMember = () => {
  if (!newMember.value.name.trim() || !newMember.value.address.trim()) {
    alert('Nama dan Alamat wajib diisi!')
    return
  }

  const generatedCode = newMember.value.address.slice(0, 3).toUpperCase().replace(/[^A-Z0-9]/g, 'X')
  
  const created = store.addShohibul({
    name: newMember.value.name,
    address: newMember.value.address,
    code: generatedCode || 'GEN',
    type: calc.value.targetType,
    animalGroup: calc.value.targetType === 'sapi' ? 'Sapi Kelompok B' : 'Kambing Mandiri',
    target: calc.value.targetValue
  })

  if (created) {
    alert(`Berhasil mendaftarkan ${created.name} sebagai Shohibul baru!`)
    // Pre-select the newly created member in deposit form
    form.value.shohibulId = created.id
    newMember.value.name = ''
    newMember.value.address = ''
    // Switch to deposit tab
    activeTab.value = 'setor'
  }
}

onMounted(() => {
  // Pre-fill shohibul if query parameters are present
  const queryShohibulId = route.query.shohibulId
  if (queryShohibulId) {
    form.value.shohibulId = queryShohibulId
  }

  ctx = gsap.context(() => {
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })
    
    tl.from('.page-header', { opacity: 0, y: -10, duration: 0.5 })
      .from('.tab-toggle', { opacity: 0, duration: 0.4 }, '-=0.2')
  }, containerRef.value)
})

onUnmounted(() => {
  if (ctx) ctx.revert()
})
</script>

<style scoped>
/* Modal slide-up transitions */
.slide-up-enter-active,
.slide-up-leave-active {
  transition: all 0.35s cubic-bezier(0.16, 1, 0.3, 1);
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

/* Confetti Fade transitions */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
