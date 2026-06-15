<template>
  <div class="space-y-4 sm:space-y-5 pb-2" ref="containerRef">
    
    <div class="flex flex-col gap-3 sm:gap-4">
        
        <div class="order-1 bg-white dark:bg-white/[0.03] border-2 border-gray-300 dark:border-white/10 rounded-[2rem] sm:rounded-[2.5rem] shadow-lg overflow-hidden flex flex-col relative z-10">
          
          <div class="relative overflow-hidden bg-gradient-to-br from-[#022c22] via-[#064e3b] to-[#0f766e] text-white p-5 sm:p-6 hero-card flex flex-col justify-between group">
            
            <div class="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none opacity-60"></div>
            
            <div class="absolute top-0 right-0 w-[70%] h-[70%] bg-teal-400/15 rounded-full blur-3xl translate-x-1/3 -translate-y-1/4 pointer-events-none animate-float" style="animation-duration: 6s;"></div>
            <div class="absolute bottom-0 left-0 w-[60%] h-[60%] bg-emerald-500/15 rounded-full blur-3xl -translate-x-1/4 translate-y-1/4 pointer-events-none animate-float" style="animation-duration: 8s; animation-delay: 1s;"></div>
            <div class="absolute top-1/2 left-[40%] w-[50%] h-[50%] bg-amber-400/10 rounded-full blur-3xl -translate-y-1/2 pointer-events-none"></div>
            
            <div class="absolute -right-16 -top-16 w-64 h-64 border border-white/20 rounded-full bg-gradient-to-br from-white/10 to-transparent backdrop-blur-sm pointer-events-none transform rotate-45"></div>
            <div class="absolute -left-20 -bottom-20 w-80 h-80 border border-white/10 rounded-full bg-gradient-to-tr from-white/5 to-transparent backdrop-blur-md pointer-events-none"></div>
            
            <div class="absolute top-8 left-1/4 w-1.5 h-1.5 bg-amber-300 rounded-full animate-ping pointer-events-none" style="animation-duration: 3s"></div>
            <div class="absolute bottom-1/3 right-1/4 w-2 h-2 bg-teal-300 rounded-full animate-pulse pointer-events-none" style="animation-duration: 4s"></div>
            <div class="absolute top-[40%] left-6 text-white/20 text-xs animate-bounce pointer-events-none" style="animation-duration: 5s">✦</div>
            <div class="absolute top-1/4 right-12 text-amber-400/30 text-lg animate-pulse pointer-events-none" style="animation-duration: 6s">✧</div>

            <div class="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/[0.07] to-white/0 opacity-60 pointer-events-none transform -skew-x-12 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 ease-in-out"></div>

            <div class="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cpath d=\'M36 34v-4h-4v-4h4v-4h4v4h4v4h-4v4h-4zm-8 8v-4h-4v-4h4v-4h4v4h-4v4h-4zm-8 0v-4h-4v-4h4v-4h4v4h-4v4h-4zm16 8v-4h-4v-4h4v-4h4v4h-4v4h-4z\' fill=\'%23ffffff\' fill-opacity=\'0.04\'/%3E%3C/g%3E%3C/svg%3E')] opacity-70 pointer-events-none mix-blend-overlay"></div>
            
            <div class="absolute -right-24 -bottom-24 w-96 h-96 opacity-20 pointer-events-none animate-[spin_60s_linear_infinite]">
              <div class="absolute inset-10 border-[1.5px] border-amber-300/40 rounded-3xl shadow-[0_0_30px_rgba(251,191,36,0.1)]"></div>
              <div class="absolute inset-10 border-[1.5px] border-amber-300/40 rounded-3xl shadow-[0_0_30px_rgba(251,191,36,0.1)] transform rotate-45"></div>
              <div class="absolute inset-16 border border-teal-300/30 rounded-full"></div>
            </div>

            <div class="absolute inset-0 pointer-events-none overflow-hidden">
              <div class="absolute top-[-50%] right-[20%] w-[1px] h-[200%] bg-gradient-to-b from-transparent via-white/30 to-transparent transform rotate-[35deg] opacity-70"></div>
              <div class="absolute top-[-50%] right-[30%] w-[2px] h-[200%] bg-gradient-to-b from-transparent via-white/10 to-transparent transform rotate-[35deg] opacity-50 blur-[1px]"></div>
            </div>
            
            <div class="relative z-10 flex flex-col h-full space-y-4 sm:space-y-5">
              <div class="flex justify-between items-center">
                <div @click="openDisclaimerModal" class="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 border border-white/10 backdrop-blur-md shadow-sm cursor-pointer hover:bg-white/20 transition-colors">
                  <span class="w-1.5 h-1.5 rounded-full bg-secondary animate-pulse shadow-[0_0_8px_rgba(217,119,6,0.8)]"></span>
                  <span class="text-white/90 text-[8px] sm:text-[9px] font-bold tracking-widest uppercase flex flex-col leading-tight">
                    <span>TARGET QURBAN</span>
                    <span>2026 (1447 H)</span>
                  </span>
                </div>
                
                <div class="text-right flex items-center gap-2 drop-shadow-md">
                  <CalendarIcon class="w-4 h-4 text-white opacity-90" /> 
                  <div class="flex flex-col text-left">
                    <span class="text-white font-black text-[9px] uppercase tracking-wider block leading-tight">KALENDER HIJRIAH</span>
                    <span class="text-teal-100 font-bold text-[7.5px] uppercase tracking-widest block leading-none">{{ currentHijriDate }}</span>
                  </div>
                </div>
              </div>
              
              <div class="pt-1">
                <p class="text-[10px] sm:text-[11px] text-teal-100/80 font-bold tracking-widest uppercase mb-0.5">Total Tabungan Qurban</p>
                <h2 class="text-3xl sm:text-4xl font-black text-white font-heading drop-shadow-lg tracking-tight leading-none mb-2">
                  {{ formatRp(Math.round(animatedStats.collected)) }}
                </h2>
                <div class="flex items-center space-x-2">
                  <div @click="openDisclaimerModal" class="flex items-center text-[10px] sm:text-xs text-teal-200/90 font-semibold cursor-pointer hover:text-white transition-colors bg-black/10 px-2 py-0.5 rounded-full border border-teal-200/20 backdrop-blur-sm">
                    <p>Target: {{ formatRp(store.targetTotal) }}</p>
                    <InfoIcon class="w-3.5 h-3.5 ml-1.5 opacity-90" />
                  </div>
                  <span class="text-[8px] bg-secondary/20 text-secondary-light px-1.5 py-0.5 rounded-full font-bold border border-secondary/20">{{ Math.round(animatedStats.percentage) }}% Tercapai</span>
                </div>
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
                      <span class="flex items-center"><span class="mr-1 opacity-80">🐄</span> {{ Math.ceil(store.sapiCount / 7) }} Sapi</span>
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

        </div>

        <div class="order-2 grid grid-cols-3 gap-2 sm:gap-4 quick-stats">
          <div class="bg-white dark:bg-white/[0.03] border-[2px] border-gray-300 dark:border-white/10 rounded-[1.2rem] sm:rounded-2xl p-3 sm:p-4 flex flex-col items-center sm:items-start sm:flex-row sm:justify-between shadow-sm hover:shadow-md transition-all duration-300 relative overflow-hidden group">
            <div class="absolute right-[-10px] top-[-10px] opacity-[0.03] dark:opacity-5 group-hover:scale-110 transition-transform duration-500 pointer-events-none hidden sm:block">
              <UsersIcon class="w-32 h-32" />
            </div>
            <div class="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-primary/10 dark:bg-primary/20 flex items-center justify-center text-primary dark:text-primary-light shrink-0 mb-1 sm:mb-0">
              <UsersIcon class="w-4 h-4 sm:w-5 sm:h-5" />
            </div>
            <div class="text-center sm:text-right w-full sm:w-auto">
              <p class="text-[8px] sm:text-[9px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-0.5 truncate">Shohibul</p>
              <p class="text-xs sm:text-lg font-black text-gray-800 dark:text-white leading-none font-heading truncate">{{ Math.round(animatedStats.shohibuls) }}</p>
            </div>
          </div>

          <div class="bg-white dark:bg-white/[0.03] border-[2px] border-gray-300 dark:border-white/10 rounded-[1.2rem] sm:rounded-2xl p-3 sm:p-4 flex flex-col items-center sm:items-start sm:flex-row sm:justify-between shadow-sm hover:shadow-md transition-all duration-300 relative overflow-hidden group">
            <div class="absolute right-[-10px] top-[-10px] opacity-[0.03] dark:opacity-5 group-hover:scale-110 transition-transform duration-500 pointer-events-none hidden sm:block">
              <CheckCircleIcon class="w-32 h-32" />
            </div>
            <div class="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-green-100 dark:bg-green-900/30 flex items-center justify-center text-green-600 dark:text-green-400 shrink-0 mb-1 sm:mb-0">
              <CheckCircleIcon class="w-4 h-4 sm:w-5 sm:h-5" />
            </div>
            <div class="text-center sm:text-right w-full sm:w-auto">
              <p class="text-[8px] sm:text-[9px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-0.5 truncate">Lunas</p>
              <p class="text-xs sm:text-lg font-black text-gray-800 dark:text-white leading-none font-heading">{{ Math.round(animatedStats.lunas) }}</p>
            </div>
          </div>

          <div class="bg-white dark:bg-white/[0.03] border-[2px] border-gray-300 dark:border-white/10 rounded-[1.2rem] sm:rounded-2xl p-3 sm:p-4 flex flex-col items-center sm:items-start sm:flex-row sm:justify-between shadow-sm hover:shadow-md transition-all duration-300 relative overflow-hidden group">
            <div class="absolute right-[-10px] top-[-10px] opacity-[0.03] dark:opacity-5 group-hover:scale-110 transition-transform duration-500 pointer-events-none hidden sm:block">
              <ClockIcon class="w-32 h-32" />
            </div>
            <div class="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center text-amber-600 dark:text-amber-400 shrink-0 mb-1 sm:mb-0">
              <ClockIcon class="w-4 h-4 sm:w-5 sm:h-5" />
            </div>
            <div class="text-center sm:text-right w-full sm:w-auto">
              <p class="text-[8px] sm:text-[9px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-0.5 truncate">Belum Lunas</p>
              <p class="text-xs sm:text-lg font-black text-gray-800 dark:text-white leading-none font-heading">{{ Math.round(animatedStats.proses) }}</p>
            </div>
          </div>
        </div>

      <div class="order-3 sm:order-4 space-y-2 recent-payments-list sm:pt-2">
        <div class="flex justify-between items-center px-1">
          <h4 class="text-sm font-bold text-gray-800 dark:text-white font-heading">Setoran Terbaru</h4>
          <router-link to="/shohibul" class="text-[10px] font-bold text-primary dark:text-primary-light hover:bg-primary/15 transition-colors bg-primary/10 dark:bg-white/5 px-3 py-1.5 rounded-full">
            Lihat Semua
          </router-link>
        </div>

        <div class="bg-white dark:bg-white/[0.02] border-[2px] border-gray-300 dark:border-white/10 rounded-[1.5rem] p-1.5 shadow-md">
          <div class="flex flex-col">
            <template v-for="(tx, index) in store.transactions.slice(0, 5)" :key="tx.id">
              <div 
                @click="openReceiptModal(tx)"
                class="flex justify-between items-center py-2.5 px-3 rounded-[1rem] hover:bg-gray-50 dark:hover:bg-white/[0.04] transition-all duration-300 cursor-pointer group"
              >
                <div class="flex items-center space-x-3">
                  <div 
                    class="w-10 h-10 rounded-[1rem] flex items-center justify-center font-bold text-xs shrink-0 shadow-inner text-white"
                    :style="getAvatarStyle(tx.name)"
                  >
                    {{ getInitials(tx.name) }}
                  </div>
                  <div class="flex flex-col justify-center">
                    <h5 class="text-xs font-extrabold text-gray-800 dark:text-white leading-none mb-1 group-hover:text-primary dark:group-hover:text-primary-light transition-colors">{{ tx.name }}</h5>
                    <div class="flex items-center text-[9px] font-semibold text-gray-500 dark:text-gray-400">
                      <span>{{ formatDate(tx.date) }}</span>
                      <span class="mx-1 text-gray-300 dark:text-gray-600">•</span>
                      <span class="text-secondary font-bold">{{ getAnimalEmoji(getTxShohibul(tx).type) }}</span>
                    </div>
                  </div>
                </div>
                <div class="text-right">
                  <span class="block text-sm font-bold text-gray-800 dark:text-white">{{ formatRp(tx.amount) }}</span>
                  <span v-if="tx.status === 'success'" class="inline-block px-2 py-0.5 mt-1 bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400 text-[8px] font-bold rounded-md uppercase tracking-widest border border-green-200/50 dark:border-green-800/30">Sukses</span>
                  <span v-else class="inline-block px-2 py-0.5 mt-1 bg-amber-50 dark:bg-amber-900/20 text-amber-600 dark:text-amber-400 text-[8px] font-bold rounded-md uppercase tracking-widest border border-amber-200/50 dark:border-amber-800/30">Pending</span>
                </div>
              </div>
              
              <div v-if="index !== store.transactions.slice(0, 5).length - 1" class="h-[1px] mx-3 bg-gray-200 dark:bg-white/5 my-0.5"></div>
            </template>
          </div>
        </div>
      </div>
    </div>

    <div v-if="isReceiptModalOpen" class="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60] flex flex-col justify-end modal-backdrop" style="margin: 0; padding: 0;">
        <div class="flex-1 w-full h-full absolute inset-0 cursor-pointer" @click="closeReceiptModal"></div>
        
        <div class="bg-white dark:bg-dark rounded-t-[2rem] p-6 max-h-[90vh] flex flex-col relative border-t border-gray-200/50 dark:border-white/10 shadow-2xl pb-[calc(20px+env(safe-area-inset-bottom,0px))] receipt-modal-content w-full max-w-lg mx-auto z-10 overflow-y-auto custom-scrollbar">
          <div class="w-12 h-1.5 bg-gray-300 dark:bg-gray-600 rounded-full mx-auto -mt-2 mb-6 cursor-pointer hover:bg-gray-400 transition-colors" @click="closeReceiptModal"></div>
          
          <div v-if="selectedTx" class="flex flex-col items-center w-full">
            <div class="w-16 h-16 rounded-full flex items-center justify-center mb-4" :class="selectedTx.status === 'success' ? 'bg-green-100 dark:bg-green-900/30 text-green-500' : 'bg-amber-100 dark:bg-amber-900/30 text-amber-500'">
              <CheckCircleIcon v-if="selectedTx.status === 'success'" class="w-8 h-8" />
              <ClockIcon v-else class="w-8 h-8" />
            </div>
            
            <h3 class="text-lg font-bold text-gray-800 dark:text-white">{{ selectedTx.status === 'success' ? 'Pembayaran Berhasil' : 'Menunggu Pembayaran' }}</h3>
            <p class="text-3xl font-extrabold text-gray-800 dark:text-white mt-1 mb-6 font-heading">{{ formatRp(selectedTx.amount) }}</p>

            <div class="w-full bg-gray-50 dark:bg-white/[0.02] border-[2px] border-gray-300 dark:border-white/10 rounded-2xl p-4 space-y-4 mb-6 shadow-sm">
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
                <span class="text-gray-500 dark:text-gray-400 font-medium">Alamat</span>
                <span class="font-bold text-gray-800 dark:text-white max-w-[60%] text-right truncate">{{ getTxShohibul(selectedTx).address || 'Tidak ada alamat' }}</span>
              </div>
              <div class="flex justify-between items-center text-sm">
                <span class="text-gray-500 dark:text-gray-400 font-medium">Nomor HP</span>
                <span class="font-bold text-gray-800 dark:text-white">{{ getMaskedPhone(getTxShohibul(selectedTx).phone) }}</span>
              </div>
            </div>

            <div class="w-full space-y-3">
              <button v-if="selectedTx.status === 'pending'" @click="continuePayment" class="w-full py-3.5 bg-amber-500 hover:bg-amber-600 text-white rounded-xl font-bold transition-colors shadow-lg shadow-amber-500/20 text-sm">
                Lanjutkan Proses Pembayaran
              </button>
              
              <button @click="closeReceiptModal" class="w-full py-3.5 bg-gray-100 dark:bg-white/5 hover:bg-gray-200 dark:hover:bg-white/10 text-gray-700 dark:text-gray-300 rounded-xl font-bold transition-colors text-sm">
                Tutup
              </button>
            </div>
          </div>
        </div>
      </div>
      <!-- Disclaimer Modal -->
      <div v-if="isDisclaimerModalOpen" class="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60] flex items-center justify-center modal-backdrop p-4" style="margin: 0;">
        <div class="absolute inset-0 cursor-pointer" @click="closeDisclaimerModal"></div>
        
        <div class="bg-white dark:bg-dark rounded-[2rem] p-6 max-w-xs w-full relative z-10 shadow-2xl disclaimer-modal-content border border-gray-200/50 dark:border-white/10">
          <div class="w-12 h-12 rounded-full bg-amber-100 dark:bg-amber-900/30 text-amber-500 flex items-center justify-center mb-4 mx-auto shadow-inner">
            <InfoIcon class="w-6 h-6" />
          </div>
          
          <h3 class="text-lg font-bold text-gray-800 dark:text-white text-center mb-2 font-heading">Catatan Pelaksanaan</h3>
          <p class="text-[11px] sm:text-xs text-gray-600 dark:text-gray-400 text-center mb-6 leading-relaxed font-medium">
            Pencapaian target nominal (Rp) tidak bersifat mengikat dan tidak memaksa. Target yang belum tercapai akan dilanjutkan di tahun berikutnya. Nominal akhir akan selalu menyesuaikan dengan harga pasar hewan qurban pada tahun pelaksanaan.
          </p>
          
          <button @click="closeDisclaimerModal" class="w-full py-3.5 bg-gray-100 dark:bg-white/5 hover:bg-gray-200 dark:hover:bg-white/10 text-gray-700 dark:text-gray-300 rounded-xl font-bold transition-colors text-sm shadow-sm">
            Saya Mengerti
          </button>
        </div>
      </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted, onUnmounted, watch, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useQurbanStore } from '@/stores/qurban'
import gsap from 'gsap'
import { UsersIcon, WalletIcon, CalculatorIcon, FileTextIcon, CheckCircleIcon, ClockIcon, CalendarIcon, InfoIcon } from 'lucide-vue-next'

const store = useQurbanStore()
const router = useRouter()
const containerRef = ref(null)
let ctx

const currentHijriDate = computed(() => {
  try {
    const formatter = new Intl.DateTimeFormat('id-ID-u-ca-islamic', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
    let dateStr = formatter.format(new Date());
    return dateStr.replace(/ AH| H/g, '') + ' H';
  } catch (e) {
    return '1447 H';
  }
})

// Fungsi lokal format Rp.
const formatRp = (val) => {
  if (!val) return 'Rp. 0'
  return 'Rp. ' + new Intl.NumberFormat('id-ID').format(val)
}

// Format date
const formatDate = (dateStr) => {
  const date = new Date(dateStr)
  return date.toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })
}

const getInitials = (name) => {
  if (!name) return ''
  const split = name.split(' ')
  if (split.length >= 2) {
    return (split[0][0] + split[1][0]).toUpperCase()
  }
  return name.slice(0, 2).toUpperCase()
}

const getAvatarStyle = (name) => {
  if (!name) return {}
  const gradients = [
    { from: '#8b5cf6', to: '#6d28d9', text: '#ffffff' }, // Purple
    { from: '#f43f5e', to: '#be123c', text: '#ffffff' }, // Rose
    { from: '#ec4899', to: '#be185d', text: '#ffffff' }, // Pink
    { from: '#10b981', to: '#047857', text: '#ffffff' }, // Emerald
    { from: '#3b82f6', to: '#1d4ed8', text: '#ffffff' }, // Blue
  ]
  let hash = 0
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash)
  }
  const index = Math.abs(hash) % gradients.length
  const g = gradients[index]
  return {
    background: `linear-gradient(135deg, ${g.from} 0%, ${g.to} 100%)`,
    color: g.text
  }
}

const getTxShohibul = (tx) => {
  return store.shohibuls.find(s => s.id === tx.shohibulId) || {}
}

const getAnimalEmoji = (type) => {
  if (type === 'sapi') return '🐄 Sapi'
  if (type === 'kambing') return '🐐 Kambing'
  return 'Hewan Lain'
}

const getMaskedPhone = (phone) => {
  if (!phone) return '08XX-XXXX-XXXX'
  if (phone.length <= 6) return phone
  return phone.slice(0, 4) + '****' + phone.slice(-3)
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

const isDisclaimerModalOpen = ref(false)

const openDisclaimerModal = () => {
  isDisclaimerModalOpen.value = true
  document.body.style.overflow = 'hidden'
  import('vue').then(({ nextTick }) => {
    nextTick(() => {
      gsap.fromTo('.modal-backdrop', { opacity: 0 }, { opacity: 1, duration: 0.3 })
      gsap.fromTo('.disclaimer-modal-content', { scale: 0.9, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.4, ease: 'back.out(1.5)' })
    })
  })
}

const closeDisclaimerModal = () => {
  gsap.to('.disclaimer-modal-content', { scale: 0.9, opacity: 0, duration: 0.2, ease: 'power2.in' })
  gsap.to('.modal-backdrop', { opacity: 0, duration: 0.2, onComplete: () => {
    isDisclaimerModalOpen.value = false
    document.body.style.overflow = ''
  }})
}

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

const continuePayment = () => {
  if (selectedTx.value && selectedTx.value.shohibulId) {
    const shohibulId = selectedTx.value.shohibulId
    closeReceiptModal()
    router.push({ path: '/menabung', query: { shohibulId: shohibulId } })
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
  gsap.to(animatedStats, {
    shohibuls: store.shohibuls.length,
    lunas: store.totalLunas,
    proses: store.totalProses,
    collected: store.totalCollected,
    percentage: store.progressPercentage,
    duration: 1.8,
    ease: 'power3.out'
  })

  ctx = gsap.context(() => {
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })
    
    tl.from('.hero-card', { opacity: 0, y: -20, duration: 0.6 })
      .from('.quick-actions > a', { opacity: 0, scale: 0.9, stagger: 0.08, duration: 0.4 }, '-=0.3')
      .from('.recent-payments-list', { opacity: 0, y: 30, duration: 0.5 }, '-=0.2')
  }, containerRef.value)
})

onUnmounted(() => {
  if (ctx) ctx.revert()
})
</script>