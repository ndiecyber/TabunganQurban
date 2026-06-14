<template>
  <div class="space-y-6 sm:space-y-8 pb-8" ref="containerRef">
    
    <!-- HERO CARD -->
    <div class="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-primary-dark via-primary to-teal-800 text-white p-6 sm:p-8 shadow-2xl hero-card flex flex-col min-h-[180px]">
      <!-- Background Elements -->
      <div class="absolute right-[-10%] top-[-20%] w-64 h-64 rounded-full bg-white/5 border border-white/10 pointer-events-none"></div>
      <div class="absolute left-[-10%] bottom-[-30%] w-48 h-48 rounded-full bg-secondary/20 blur-3xl pointer-events-none"></div>
      
      <div class="relative z-10 flex flex-col h-full justify-between space-y-6">
        <div class="flex justify-between items-start">
          <div class="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/10 backdrop-blur-md shadow-sm">
            <span class="text-white/90 text-[10px] font-extrabold tracking-[0.2em] uppercase">Daftar Jamaah</span>
          </div>
          <div class="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center backdrop-blur-md border border-white/10 shadow-inner">
            <UsersIcon class="w-5 h-5 text-secondary" />
          </div>
        </div>
        
        <div>
          <h2 class="text-3xl sm:text-4xl font-black text-white  drop-shadow-lg tracking-tight">
            Data Shohibul
          </h2>
          <div class="flex items-center space-x-3 mt-2">
            <span class="text-[10px] sm:text-xs bg-secondary/20 text-secondary-light px-2.5 py-1.5 rounded-full font-bold border border-secondary/20 backdrop-blur-sm shadow-sm">
              {{ store.shohibuls.length }} Terdaftar
            </span>
            <router-link to="/menabung?mode=register" class="text-[10px] sm:text-xs bg-white/10 hover:bg-white/20 text-white px-3 py-1.5 rounded-full font-bold border border-white/10 backdrop-blur-sm shadow-sm transition-colors flex items-center">
              Daftar Shohibul Baru
            </router-link>
          </div>
        </div>
      </div>
    </div>

    <!-- Search Input -->
    <div class="relative search-box">
      <input 
        v-model="searchQuery" 
        type="text" 
        placeholder="Cari nama atau kode shohibul..." 
        class="w-full bg-white dark:bg-white/[0.02] text-sm border border-gray-200/50 dark:border-white/10 rounded-[1.5rem] pl-12 pr-4 py-4 shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent dark:text-white transition-all font-medium"
      />
      <div class="absolute left-4 top-4 text-gray-400">
        <SearchIcon class="w-5 h-5" />
      </div>
    </div>

    <!-- Filtering Badges -->
    <div class="flex space-x-2 overflow-x-auto pb-2 -mx-4 px-4 sm:mx-0 sm:px-0 custom-scrollbar filter-scroll">
      <button 
        v-for="filter in filters" 
        :key="filter.value"
        @click="activeFilter = filter.value"
        class="px-5 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-all duration-300 cursor-pointer flex items-center space-x-2 border"
        :class="activeFilter === filter.value 
          ? 'bg-primary text-white border-primary shadow-md shadow-primary/20 scale-[1.02]' 
          : 'bg-white dark:bg-white/[0.03] text-gray-500 dark:text-gray-400 border-gray-200/50 dark:border-white/10 hover:bg-gray-50 dark:hover:bg-white/[0.05]'"
      >
        <span v-if="filter.icon" class="text-sm">{{ filter.icon }}</span>
        <span>{{ filter.label }}</span>
      </button>
    </div>

    <!-- Count Indicator -->
    <div class="text-[10px] sm:text-xs text-gray-400 dark:text-gray-500 px-1 font-bold tracking-wide uppercase count-label">
      Menampilkan {{ filteredShohibuls.length }} dari {{ store.shohibuls.length }} shohibul
    </div>

    <!-- Shohibuls Card Grid -->
    <div class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5 sm:gap-6 shohibul-cards-container">
      <div 
        v-for="shohibul in filteredShohibuls" 
        :key="shohibul.id"
        @click="openDetails(shohibul, $event)"
        class="bg-white dark:bg-white/[0.02] border border-gray-200/50 dark:border-white/10 rounded-[2rem] p-5 shadow-sm cursor-pointer hover:shadow-lg hover:border-primary/30 transition-all duration-300 flex flex-col justify-between space-y-5 group"
      >
        <!-- Top Row: Avatar Initials + Name/Address + Code -->
        <div class="flex justify-between items-start">
          <div class="flex items-center space-x-4">
            <div 
              class="w-12 h-12 rounded-[1rem] flex items-center justify-center font-bold text-sm shrink-0 shadow-inner group-hover:scale-105 transition-transform duration-300"
              :style="getAvatarStyle(shohibul.name)"
            >
              {{ getInitials(shohibul.name) }}
            </div>
            <div>
              <h3 class="text-sm font-extrabold text-gray-800 dark:text-white leading-tight group-hover:text-primary dark:group-hover:text-primary-light transition-colors">{{ shohibul.name }}</h3>
              <p class="text-[10px] text-gray-400 dark:text-gray-500 mt-1 font-semibold">
                {{ shohibul.type === 'sapi' ? '🐄 Sapi' : '🐐 Kambing' }}
              </p>
            </div>
          </div>
          <span class="px-2 py-1 bg-gray-100 dark:bg-white/5 text-gray-500 dark:text-gray-400 rounded-md text-[9px] font-bold uppercase tracking-widest">
            {{ shohibul.code }}
          </span>
        </div>

        <!-- Progress Bar Section -->
        <div class="space-y-2">
          <div class="flex justify-between items-end">
            <div>
              <p class="text-[10px] text-gray-400 dark:text-gray-500 font-semibold mb-0.5">Terkumpul</p>
              <div class="flex items-center flex-wrap gap-1.5">
                <p class="text-sm font-black text-gray-800 dark:text-white">
                  {{ store.formatRupiahFull(shohibul.collected) }}
                </p>
                <span v-if="getPendingAmount(shohibul.id) > 0" class="text-[9px] font-bold text-amber-700 dark:text-amber-400 bg-amber-100 dark:bg-amber-950/40 px-1.5 py-0.5 rounded-md flex items-center">
                  <ClockIcon class="w-2.5 h-2.5 mr-0.5" />
                  +{{ store.formatRupiah(getPendingAmount(shohibul.id)) }}
                </span>
              </div>
            </div>
            <div class="text-right">
              <span 
                v-if="shohibul.collected >= shohibul.target" 
                class="inline-block px-2 py-0.5 mb-1 bg-green-100 dark:bg-green-950/40 text-green-700 dark:text-green-400 text-[9px] font-black rounded uppercase tracking-wider shadow-sm"
              >
                Lunas
              </span>
              <span v-else class="text-[10px] font-black text-primary dark:text-primary-light">{{ getPercentage(shohibul) }}%</span>
            </div>
          </div>
          
          <div class="w-full h-2.5 bg-gray-100 dark:bg-white/5 rounded-full overflow-hidden shadow-inner">
            <div 
              class="h-full rounded-full transition-all duration-1000 ease-out"
              :class="shohibul.collected >= shohibul.target ? 'bg-gradient-to-r from-green-500 to-emerald-400 shadow-[0_0_8px_rgba(16,185,129,0.5)]' : 'bg-gradient-to-r from-primary to-primary-light'"
              :style="{ width: getPercentage(shohibul) + '%' }"
            ></div>
          </div>
        </div>

        <!-- Bottom Row: Action Buttons -->
        <div class="flex items-center justify-end space-x-3 pt-4 border-t border-gray-100 dark:border-white/5">
          <button 
            @click.stop="openDetails(shohibul, $event)"
            class="px-4 py-2 border border-gray-200 dark:border-white/10 rounded-xl text-xs font-bold text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-white/5 transition-all flex items-center space-x-1.5"
          >
            <InfoIcon class="w-4 h-4" />
            <span>Detail</span>
          </button>
          
          <button 
            v-if="shohibul.collected < shohibul.target"
            @click.stop="goToDeposit(shohibul.id)"
            class="px-5 py-2 bg-primary hover:bg-primary-light text-white rounded-xl text-xs font-bold transition-all flex items-center space-x-1.5 shadow-md shadow-primary/20"
          >
            <WalletIcon class="w-4 h-4" />
            <span>Tabung</span>
          </button>
        </div>
      </div>

      <!-- Empty State -->
      <div v-if="filteredShohibuls.length === 0" class="text-center py-16 text-gray-400 dark:text-gray-600 col-span-full border-2 border-dashed border-gray-200 dark:border-white/5 rounded-[2rem]">
        <UsersIcon class="w-12 h-12 mx-auto mb-3 opacity-30" />
        <p class="text-sm font-semibold text-gray-500 dark:text-gray-400">Data shohibul tidak ditemukan</p>
        <p class="text-[10px] mt-1 mb-4">Coba sesuaikan kata kunci pencarian atau filter.</p>
        
        <div class="inline-flex flex-col items-center p-5 bg-primary/5 dark:bg-primary/10 rounded-[1.5rem] border border-primary/20">
          <p class="text-xs font-bold text-primary dark:text-primary-light mb-1">Belum Terdaftar?</p>
          <p class="text-[10px] text-gray-500 dark:text-gray-400 max-w-[250px] leading-relaxed mb-4">
            Daftar sekarang untuk mengamankan slot hewan Qurban Anda tahun ini.
          </p>
          <router-link to="/menabung?mode=register" class="px-5 py-2.5 bg-primary text-white font-bold text-xs rounded-xl shadow-md shadow-primary/20 hover:bg-primary-light transition-colors">
            Daftar Peserta Baru
          </router-link>
        </div>
      </div>
    </div>

    <!-- Shohibul Detail Slide-Up Modal -->
      <div v-if="selectedShohibul" class="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex flex-col justify-end modal-backdrop" style="margin: 0; padding: 0;">
        <div class="flex-1 w-full h-full absolute inset-0 cursor-pointer" @click="closeDetails"></div>
        
        <div class="bg-white dark:bg-dark rounded-t-[2rem] p-6 sm:p-8 max-h-[90%] overflow-y-auto space-y-6 relative border-t border-gray-200/50 dark:border-white/10 shadow-2xl pb-[calc(20px+env(safe-area-inset-bottom,0px))] details-modal-content w-full max-w-2xl mx-auto z-10">
          <div class="w-12 h-1.5 bg-gray-300 dark:bg-gray-600 rounded-full mx-auto -mt-2 sm:-mt-4 mb-4 cursor-pointer hover:bg-gray-400 transition-colors" @click="closeDetails"></div>
          
          <div class="flex justify-between items-start">
            <div class="flex items-center space-x-4">
              <div 
                class="w-14 h-14 rounded-[1.2rem] flex items-center justify-center font-black text-lg shrink-0 shadow-inner"
                :style="getAvatarStyle(selectedShohibul.name)"
              >
                {{ getInitials(selectedShohibul.name) }}
              </div>
              <div>
                <div class="flex items-center space-x-2">
                  <h3 class="text-xl font-black text-gray-800 dark:text-white ">{{ selectedShohibul.name }}</h3>
                  <span class="px-2 py-0.5 bg-gray-100 dark:bg-white/5 text-[9px] text-gray-500 dark:text-gray-400 font-bold rounded uppercase tracking-widest border border-gray-200 dark:border-white/10">{{ selectedShohibul.code }}</span>
                </div>
                <p class="text-xs text-gray-400 dark:text-gray-500 mt-1 font-medium">{{ selectedShohibul.address }}</p>
              </div>
            </div>
            <button @click="closeDetails" class="p-2 rounded-full bg-gray-100 dark:bg-white/5 hover:bg-gray-200 dark:hover:bg-white/10 transition-colors text-gray-500 dark:text-gray-400">
              <XIcon class="w-5 h-5" />
            </button>
          </div>

          <!-- Quick Information Boxes -->
          <div class="grid grid-cols-2 gap-4">
            <div class="bg-gray-50 dark:bg-white/[0.02] border border-gray-200/50 dark:border-white/5 p-4 rounded-[1.5rem] text-center space-y-2">
              <span class="text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest">Hewan Target</span>
              <span class="text-base font-black text-gray-800 dark:text-white block flex items-center justify-center">
                <span class="mr-1.5 text-xl">{{ selectedShohibul.type === 'sapi' ? '🐄' : '🐐' }}</span>
                {{ selectedShohibul.type === 'sapi' ? 'Sapi' : 'Kambing' }}
              </span>
              <span class="text-[9px] text-gray-400 font-semibold block bg-white dark:bg-black/20 py-1 rounded-md mx-4 border border-gray-100 dark:border-white/5">{{ selectedShohibul.animalGroup }}</span>
            </div>
            
            <div class="bg-gray-50 dark:bg-white/[0.02] border border-gray-200/50 dark:border-white/5 p-4 rounded-[1.5rem] text-center space-y-2">
              <span class="text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest">Status Tabungan</span>
              <span 
                class="text-xs font-black block py-1.5 px-3 rounded-lg w-fit mx-auto uppercase tracking-wider"
                :class="selectedShohibul.collected >= selectedShohibul.target 
                  ? 'bg-green-100 text-green-700 dark:bg-green-950/40 dark:text-green-400' 
                  : 'bg-amber-100 text-amber-700 dark:bg-amber-950/40 dark:text-amber-400'"
              >
                {{ selectedShohibul.collected >= selectedShohibul.target ? 'Terpenuhi (Lunas)' : 'Dalam Proses' }}
              </span>
              <span class="text-[10px] font-black text-primary dark:text-primary-light block">{{ getPercentage(selectedShohibul) }}% Terkumpul</span>
            </div>
          </div>

          <!-- Target Metrics -->
          <div class="space-y-4 bg-gray-50 dark:bg-white/[0.02] border border-gray-200/50 dark:border-white/5 p-5 rounded-[1.5rem]">
            <h4 class="text-[10px] font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest flex items-center">
              <ActivityIcon class="w-3.5 h-3.5 mr-1.5" /> Perkembangan Dana
            </h4>
            <div class="space-y-3">
              <div class="flex justify-between items-center text-sm">
                <span class="text-gray-500 dark:text-gray-400 font-semibold">Telah Terbayar</span>
                <span class="font-black text-primary dark:text-primary-light">{{ store.formatRupiahFull(selectedShohibul.collected) }}</span>
              </div>
              <div class="flex justify-between items-center text-sm">
                <span class="text-gray-500 dark:text-gray-400 font-semibold">Target Qurban</span>
                <span class="font-black text-gray-800 dark:text-white">{{ store.formatRupiahFull(selectedShohibul.target) }}</span>
              </div>
              <div class="w-full h-1.5 bg-gray-200 dark:bg-white/10 rounded-full overflow-hidden shadow-inner mt-2">
                <div 
                  class="h-full rounded-full transition-all duration-1000 ease-out"
                  :class="selectedShohibul.collected >= selectedShohibul.target ? 'bg-green-500' : 'bg-primary'"
                  :style="{ width: getPercentage(selectedShohibul) + '%' }"
                ></div>
              </div>
              <div v-if="selectedShohibul.target - selectedShohibul.collected > 0" class="flex justify-between items-center text-sm pt-3 border-t border-gray-200/50 dark:border-white/5 mt-2">
                <span class="text-gray-500 dark:text-gray-400 font-bold">Kekurangan</span>
                <span class="font-black text-secondary">{{ store.formatRupiahFull(selectedShohibul.target - selectedShohibul.collected) }}</span>
              </div>
            </div>
          </div>

          <!-- Individual User Transactions Log -->
          <div class="space-y-3">
            <h4 class="text-[10px] font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest flex items-center">
              <HistoryIcon class="w-3.5 h-3.5 mr-1.5" /> Riwayat Setoran
            </h4>
            
            <div v-if="memberTransactions.length > 0" class="space-y-2 max-h-[250px] overflow-y-auto pr-1 custom-scrollbar">
              <div 
                v-for="tx in memberTransactions" 
                :key="tx.id"
                @click="openReceiptModal(tx)"
                class="bg-white dark:bg-white/[0.02] border p-4 rounded-[1.5rem] flex justify-between items-center shadow-sm transition-colors cursor-pointer"
                :class="tx.status === 'pending' ? 'border-amber-200 dark:border-amber-900/50 hover:border-amber-400/50' : 'border-gray-200/50 dark:border-white/5 hover:border-gray-300 dark:hover:border-white/10'"
              >
                <div class="flex items-center space-x-3">
                  <div class="w-10 h-10 rounded-xl flex items-center justify-center" :class="tx.status === 'pending' ? 'bg-amber-100 dark:bg-amber-900/30 text-amber-500' : 'bg-gray-50 dark:bg-white/5 text-primary dark:text-primary-light'">
                    <ClockIcon v-if="tx.status === 'pending'" class="w-5 h-5" />
                    <WalletIcon v-else class="w-5 h-5" />
                  </div>
                  <div>
                    <span class="text-xs font-bold block" :class="tx.status === 'pending' ? 'text-amber-700 dark:text-amber-400' : 'text-gray-800 dark:text-white'">
                      {{ tx.status === 'pending' ? 'Menunggu Pembayaran' : 'Setoran Masuk' }}
                    </span>
                    <span class="text-[9px] text-gray-400 dark:text-gray-500 font-semibold">{{ formatDate(tx.date) }}</span>
                  </div>
                </div>
                <span class="text-sm font-black" :class="tx.status === 'pending' ? 'text-amber-700 dark:text-amber-400' : 'text-gray-800 dark:text-white'">
                  {{ store.formatRupiah(tx.amount) }}
                </span>
              </div>
            </div>
            
            <div v-else class="text-center py-8 bg-gray-50 dark:bg-white/[0.02] rounded-[1.5rem] border border-dashed border-gray-200 dark:border-white/5">
              <p class="text-xs text-gray-400 font-semibold">Belum ada riwayat setoran.</p>
            </div>
          </div>
          
          <div class="pt-4 border-t border-gray-200/50 dark:border-white/10 pb-4">
            <button 
              v-if="selectedShohibul.collected < selectedShohibul.target"
              @click="goToDeposit(selectedShohibul.id)"
              class="w-full py-4 bg-primary hover:bg-primary-light text-white rounded-2xl font-black text-sm transition-all shadow-md shadow-primary/20 flex items-center justify-center space-x-2"
            >
              <WalletIcon class="w-5 h-5" />
              <span>Tambah Setoran</span>
            </button>
            <button 
              v-else
              disabled
              class="w-full py-4 bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded-2xl font-black text-sm cursor-not-allowed flex items-center justify-center space-x-2 border border-green-200 dark:border-green-800/50"
            >
              <CheckCircleIcon class="w-5 h-5" />
              <span>Tabungan Sudah Lunas</span>
            </button>
          </div>
      </div>
    </div>

    <!-- E-Wallet Receipt Modal (for Shohibul Detail) -->
    <div v-if="isReceiptModalOpen" class="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60] flex flex-col justify-end receipt-backdrop" style="margin: 0; padding: 0;">
      <div class="flex-1 w-full h-full absolute inset-0 cursor-pointer" @click="closeReceiptModal"></div>
      
      <div class="bg-white dark:bg-dark rounded-t-[2rem] p-6 max-h-[90vh] flex flex-col relative border-t border-gray-200/50 dark:border-white/10 shadow-2xl pb-[calc(20px+env(safe-area-inset-bottom,0px))] receipt-modal-content w-full max-w-lg mx-auto z-10 overflow-y-auto custom-scrollbar">
        <div class="w-12 h-1.5 bg-gray-300 dark:bg-gray-600 rounded-full mx-auto -mt-2 mb-6 cursor-pointer hover:bg-gray-400 transition-colors" @click="closeReceiptModal"></div>
        
        <div v-if="selectedTx" class="flex flex-col items-center w-full">
          <!-- Status Icon -->
          <div class="w-16 h-16 rounded-full flex items-center justify-center mb-4" :class="selectedTx.status === 'success' ? 'bg-green-100 dark:bg-green-900/30 text-green-500' : 'bg-amber-100 dark:bg-amber-900/30 text-amber-500'">
            <CheckCircleIcon v-if="selectedTx.status === 'success'" class="w-8 h-8" />
            <ClockIcon v-else class="w-8 h-8" />
          </div>
          
          <h3 class="text-lg font-bold text-gray-800 dark:text-white">{{ selectedTx.status === 'success' ? 'Pembayaran Berhasil' : 'Menunggu Pembayaran' }}</h3>
          <p class="text-3xl font-black text-gray-800 dark:text-white mt-1 mb-6 font-sans">{{ store.formatRupiahFull(selectedTx.amount) }}</p>

          <div class="w-full bg-gray-50 dark:bg-white/[0.02] border border-gray-200/50 dark:border-white/10 rounded-2xl p-4 space-y-4 mb-6">
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
              <span class="text-gray-500 dark:text-gray-400 font-medium">Kode Hewan</span>
              <span class="font-bold text-gray-800 dark:text-white">{{ selectedTx.code }}</span>
            </div>
          </div>

          <div class="w-full space-y-3">
            <button v-if="selectedTx.status === 'pending'" @click="simulateSuccess" class="w-full py-3.5 bg-primary hover:bg-primary-light text-white rounded-xl font-bold transition-colors shadow-lg shadow-primary/20 text-sm">
              Simulasikan Pembayaran Berhasil
            </button>
            
            <button @click="closeReceiptModal" class="w-full py-3.5 bg-gray-100 dark:bg-white/5 hover:bg-gray-200 dark:hover:bg-white/10 text-gray-700 dark:text-gray-300 rounded-xl font-bold transition-colors text-sm">
              Tutup
            </button>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted, nextTick } from 'vue'
import { useRouter } from 'vue-router'
import { useQurbanStore } from '@/stores/qurban'
import gsap from 'gsap'
import { UsersIcon, SearchIcon, InfoIcon, WalletIcon, XIcon, ActivityIcon, HistoryIcon, CheckCircleIcon, ClockIcon } from 'lucide-vue-next'

const store = useQurbanStore()
const router = useRouter()
const containerRef = ref(null)
let ctx

const searchQuery = ref('')
const activeFilter = ref('all')
const selectedShohibul = ref(null)

const filters = [
  { label: 'Semua', value: 'all', icon: '' },
  { label: 'Sapi', value: 'sapi', icon: '🐄' },
  { label: 'Kambing', value: 'kambing', icon: '🐐' },
  { label: 'Lunas', value: 'lunas', icon: '✓' }
]

const filteredShohibuls = computed(() => {
  return store.shohibuls.filter(s => {
    // Text search
    const matchesSearch = s.name.toLowerCase().includes(searchQuery.value.toLowerCase()) || 
                          s.code.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
                          s.address.toLowerCase().includes(searchQuery.value.toLowerCase())
    
    // Category filter
    let matchesFilter = true
    if (activeFilter.value === 'sapi') matchesFilter = s.type === 'sapi'
    if (activeFilter.value === 'kambing') matchesFilter = s.type === 'kambing'
    if (activeFilter.value === 'lunas') matchesFilter = s.collected >= s.target
    
    return matchesSearch && matchesFilter
  })
})

const getPercentage = (shohibul) => {
  if (shohibul.target === 0) return 0
  const pct = (shohibul.collected / shohibul.target) * 100
  return Math.min(Math.round(pct), 100)
}

const getPendingAmount = (id) => {
  return store.transactions
    .filter(tx => tx.shohibulId === id && tx.status === 'pending')
    .reduce((sum, tx) => sum + tx.amount, 0)
}

const formatDate = (dateStr) => {
  const date = new Date(dateStr)
  return date.toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })
}

// Get initials for avatar
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

// Modal handling logic
const memberTransactions = computed(() => {
  if (!selectedShohibul.value) return []
  return store.transactions
    .filter(tx => tx.shohibulId === selectedShohibul.value.id)
    .sort((a, b) => new Date(b.date) - new Date(a.date)) // newest first
})

const openDetails = (shohibul, event) => {
  selectedShohibul.value = shohibul
  document.body.style.overflow = 'hidden' // Prevent background scrolling
  
  // Animate modal appearance
  nextTick(() => {
    gsap.fromTo('.modal-backdrop', { opacity: 0 }, { opacity: 1, duration: 0.3 })
    gsap.fromTo('.details-modal-content', { y: '100%' }, { y: '0%', duration: 0.4, ease: 'power3.out' })
  })
}

const closeDetails = () => {
  gsap.to('.details-modal-content', { y: '100%', duration: 0.3, ease: 'power3.in' })
  gsap.to('.modal-backdrop', { opacity: 0, duration: 0.3, onComplete: () => {
    selectedShohibul.value = null
    document.body.style.overflow = '' // Restore scrolling
  }})
}

const goToDeposit = (id) => {
  if (selectedShohibul.value) {
    // Close modal first without animation delay if routing
    selectedShohibul.value = null
    document.body.style.overflow = ''
  }
  // Navigate to menabung tab with query param
  router.push({ name: 'menabung', query: { shohibulId: id } })
}

const isReceiptModalOpen = ref(false)
const selectedTx = ref(null)

const openReceiptModal = (tx) => {
  selectedTx.value = tx
  isReceiptModalOpen.value = true
  nextTick(() => {
    gsap.fromTo('.receipt-backdrop', { opacity: 0 }, { opacity: 1, duration: 0.3 })
    gsap.fromTo('.receipt-modal-content', { y: '100%' }, { y: '0%', duration: 0.4, ease: 'power3.out' })
  })
}

const closeReceiptModal = () => {
  gsap.to('.receipt-modal-content', { y: '100%', duration: 0.3, ease: 'power3.in' })
  gsap.to('.receipt-backdrop', { opacity: 0, duration: 0.3, onComplete: () => {
    isReceiptModalOpen.value = false
    setTimeout(() => { selectedTx.value = null }, 300)
  }})
}

const simulateSuccess = () => {
  if (selectedTx.value && selectedTx.value.id) {
    store.markTransactionSuccess(selectedTx.value.id)
    alert('Simulasi: Status pembayaran berhasil diperbarui menjadi Sukses!')
    
    if (selectedShohibul.value) {
      const updatedShohibul = store.shohibuls.find(s => s.id === selectedShohibul.value.id)
      if (updatedShohibul) {
        selectedShohibul.value = updatedShohibul
      }
    }
  }
}

onMounted(() => {
  ctx = gsap.context(() => {
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })
    
    tl.from('.hero-card', { opacity: 0, y: -20, duration: 0.5 })
      .from('.search-box', { opacity: 0, y: 10, duration: 0.4 }, '-=0.3')
      .from('.shohibul-cards-container', { opacity: 0, y: 20, duration: 0.5 }, '-=0.1')
  })
})

onUnmounted(() => {
  if (ctx) ctx.revert()
  document.body.style.overflow = '' // Safety
})
</script>

<style scoped>
.custom-scrollbar::-webkit-scrollbar {
  height: 4px;
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

.no-scrollbar::-webkit-scrollbar {
  display: none;
}
.no-scrollbar {
  -ms-overflow-style: none;  /* IE and Edge */
  scrollbar-width: none;  /* Firefox */
}
</style>
