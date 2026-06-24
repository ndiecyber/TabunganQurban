<template>
  <div class="space-y-4 sm:space-y-5 pb-2" ref="containerRef">
    <StaleBanner :visible="store.isFromCache" @refresh="store.fetchShohibuls()" />

    <template v-if="store.loading.shohibuls && store.shohibuls.length === 0">
      <LoadingSkeleton variant="hero" />
      <LoadingSkeleton variant="row" :count="8" />
    </template>
    
    <template v-else-if="store.error.shohibuls && store.shohibuls.length === 0">
      <RetryError :message="store.error.shohibuls" @retry="store.fetchShohibuls()" />
    </template>

    <template v-else>
    <div class="order-1 bg-white dark:bg-white/[0.03] border-2 border-gray-300 dark:border-white/10 rounded-[2rem] sm:rounded-[2.5rem] shadow-lg overflow-hidden flex flex-col relative z-10">
      <div class="relative overflow-hidden bg-gradient-to-br from-[#022c22] via-[#064e3b] to-[#0f766e] text-white p-6 sm:p-8 hero-card flex flex-col min-h-[180px] group">
        <div class="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none opacity-60"></div>
        
        <div class="absolute top-0 right-0 w-[80%] h-[80%] bg-emerald-400/15 rounded-full blur-3xl translate-x-1/3 -translate-y-1/4 pointer-events-none animate-float" style="animation-duration: 7s;"></div>
        <div class="absolute bottom-0 left-0 w-[60%] h-[60%] bg-teal-500/15 rounded-full blur-3xl -translate-x-1/4 translate-y-1/4 pointer-events-none animate-float" style="animation-duration: 9s; animation-delay: 1s;"></div>
        <div class="absolute top-1/2 left-[30%] w-[50%] h-[50%] bg-secondary/15 rounded-full blur-3xl -translate-y-1/2 pointer-events-none"></div>

        <div class="absolute -right-20 -bottom-20 w-72 h-72 border border-white/20 rounded-[3rem] bg-gradient-to-br from-white/10 to-transparent backdrop-blur-sm pointer-events-none transform rotate-12"></div>
        <div class="absolute -left-16 -top-16 w-64 h-64 border border-white/10 rounded-full bg-gradient-to-tr from-white/5 to-transparent backdrop-blur-md pointer-events-none"></div>
        
        <div class="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cpath d=\'M36 34v-4h-4v-4h4v-4h4v4h4v4h-4v4h-4zm-8 8v-4h-4v-4h4v-4h4v4h-4v4h-4zm-8 0v-4h-4v-4h4v-4h4v4h-4v4h-4zm16 8v-4h-4v-4h4v-4h4v4h-4v4h-4z\' fill=\'%23ffffff\' fill-opacity=\'0.04\'/%3E%3C/g%3E%3C/svg%3E')] opacity-80 pointer-events-none mix-blend-overlay"></div>

        <div class="absolute -right-24 -bottom-24 w-80 h-80 opacity-20 pointer-events-none animate-[spin_60s_linear_infinite]">
          <div class="absolute inset-10 border-[1.5px] border-amber-300/40 rounded-3xl shadow-[0_0_30px_rgba(251,191,36,0.1)]"></div>
          <div class="absolute inset-10 border-[1.5px] border-amber-300/40 rounded-3xl shadow-[0_0_30px_rgba(251,191,36,0.1)] transform rotate-45"></div>
          <div class="absolute inset-16 border border-teal-300/30 rounded-full"></div>
        </div>

        <div class="absolute inset-0 pointer-events-none overflow-hidden">
          <div class="absolute top-[-50%] left-[20%] w-[1px] h-[200%] bg-gradient-to-b from-transparent via-white/30 to-transparent transform rotate-[35deg] opacity-70"></div>
          <div class="absolute top-[-50%] left-[30%] w-[2px] h-[200%] bg-gradient-to-b from-transparent via-white/10 to-transparent transform rotate-[35deg] opacity-50 blur-[1px]"></div>
        </div>

        <div class="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/[0.07] to-white/0 opacity-60 pointer-events-none transform -skew-x-12 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 ease-in-out"></div>
        
        <div class="relative z-10 flex flex-col h-full justify-between space-y-6">
          <div class="flex justify-between items-start">
            <div class="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 border border-white/10 backdrop-blur-md shadow-sm">
              <span class="w-1.5 h-1.5 rounded-full bg-secondary animate-pulse shadow-[0_0_8px_rgba(217,119,6,0.8)]"></span>
              <span class="text-white/90 text-[10px] font-bold tracking-[0.2em] uppercase">Daftar Jamaah</span>
            </div>
            <div class="w-11 h-11 bg-white/10 rounded-full flex items-center justify-center backdrop-blur-xl border border-white/20 shadow-[0_0_15px_rgba(255,255,255,0.1)] group-hover:scale-110 transition-transform duration-500">
              <UsersIcon class="w-5 h-5 text-secondary drop-shadow-md" />
            </div>
          </div>
          
          <div>
            <h2 class="text-3xl sm:text-4xl font-bold text-white font-heading drop-shadow-lg tracking-tight">
              Data Shohibul
            </h2>
            <div class="flex items-center space-x-3 mt-4">
              <span class="text-[10px] sm:text-xs bg-secondary/20 text-secondary-light px-3 py-1.5 rounded-full font-extrabold border border-secondary/30 backdrop-blur-md shadow-sm flex items-center">
                <UsersIcon class="w-3.5 h-3.5 mr-1.5 opacity-90" /> {{ store.shohibuls.length }} Terdaftar
              </span>
              <router-link to="/menabung?mode=register" class="text-[10px] sm:text-xs bg-white/10 hover:bg-white/20 text-white px-3.5 py-1.5 rounded-full font-bold border border-white/20 backdrop-blur-md shadow-sm transition-all duration-300 flex items-center hover:scale-105 hover:shadow-white/10">
                <UserPlusIcon class="w-3.5 h-3.5 mr-1.5 opacity-90" /> Daftar Shohibul Baru
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="flex flex-col space-y-3 mt-1">
      <div class="relative search-box">
        <input 
          v-model="searchQuery" 
          type="text" 
          placeholder="Cari nama atau kode shohibul..." 
          class="w-full bg-white dark:bg-white/[0.02] text-sm border-[2px] border-gray-300 dark:border-white/10 rounded-[1.5rem] pl-12 pr-4 py-4 shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent dark:text-white transition-all font-medium"
        />
        <div class="absolute left-4 top-4 text-gray-400">
          <SearchIcon class="w-5 h-5" />
        </div>
      </div>

      <div class="flex space-x-2 overflow-x-auto pb-1 custom-scrollbar filter-scroll">
        <button 
          v-for="filter in filters" 
          :key="filter.value"
          @click="activeFilter = filter.value"
          class="px-5 py-2 rounded-full text-[10px] sm:text-xs font-bold whitespace-nowrap transition-all duration-300 cursor-pointer flex items-center space-x-2 border"
          :class="activeFilter === filter.value 
            ? 'bg-[#0f766e] text-white border-[#0f766e] shadow-md scale-[1.02]' 
            : 'bg-white dark:bg-white/[0.03] text-gray-500 dark:text-gray-400 border-gray-200/50 dark:border-white/10 hover:bg-gray-50 dark:hover:bg-white/[0.05]'"
        >
          <component v-if="filter.lucide" :is="filter.lucide" class="w-3.5 h-3.5" />
          <span v-else-if="filter.icon" class="text-xs sm:text-sm">{{ filter.icon }}</span>
          <span>{{ filter.label }}</span>
        </button>
      </div>

      <div class="text-[9px] sm:text-[10px] text-gray-400 dark:text-gray-500 px-1 font-bold tracking-widest uppercase count-label">
        Menampilkan {{ filteredShohibuls.length }} dari {{ store.shohibuls.length }} shohibul
      </div>
    </div>

    <div class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 shohibul-cards-container">
      <div 
        v-for="shohibul in filteredShohibuls" 
        :key="shohibul.id"
        @click="openDetails(shohibul, $event)"
        class="bg-white dark:bg-white/[0.02] border-[1.5px] border-gray-200 dark:border-white/10 rounded-[1.5rem] p-4 shadow-sm cursor-pointer hover:shadow-md hover:border-primary/40 transition-all duration-300 flex flex-col space-y-3 group"
      >
        <div class="flex justify-between items-start">
          <div class="flex items-center space-x-3">
            <div 
              class="w-10 h-10 rounded-[0.8rem] flex items-center justify-center font-bold text-xs shrink-0 text-white shadow-inner"
              :style="getAvatarStyle(shohibul.name)"
            >
              {{ getInitials(shohibul.name) }}
            </div>
            <div>
              <h3 class="text-sm font-extrabold text-gray-800 dark:text-white leading-tight mb-1">{{ shohibul.name }}</h3>
              <div class="text-[9px] text-gray-500 font-semibold space-y-0.5">
                 <p class="flex items-center text-gray-600 dark:text-gray-400">
                   <HomeIcon class="w-2.5 h-2.5 mr-1 shrink-0" />
                   <span class="truncate">{{ shohibul.address || 'Alamat tidak diketahui' }}</span>
                 </p>
                 <p class="flex items-center cursor-pointer hover:text-gray-800 dark:hover:text-gray-200 transition-colors w-fit" @click.stop="togglePhoneReveal(shohibul.id, $event)">
                   <PhoneIcon class="w-2.5 h-2.5 mr-1" /> {{ getDisplayPhone(shohibul) }}
                 </p>
              </div>
            </div>
          </div>
          
          <div class="flex flex-col items-end gap-1.5">
            <button @click.stop="openDetails(shohibul, $event)" class="px-2.5 py-1 bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 text-gray-600 dark:text-gray-300 rounded-lg text-[9px] font-bold uppercase tracking-widest hover:bg-gray-100 transition-colors">
              Detail
            </button>
            <span class="text-[10px] font-bold text-gray-400 flex items-center">
              <span class="text-sm mr-1">{{ shohibul.target_type === 'sapi' ? '🐄' : '🐐' }}</span> {{ shohibul.target_type === 'sapi' ? 'Sapi' : 'Kambing' }}
            </span>
          </div>
        </div>

        <div class="space-y-1.5 pt-1">
          <div class="flex justify-between items-end">
            <div class="flex items-center gap-1.5">
              <p class="text-[13px] font-bold text-gray-800 dark:text-white">
                {{ formatRp(shohibul.collected_amount) }}
              </p>
              <span v-if="getPendingAmount(shohibul) > 0" class="text-[9px] font-bold text-amber-700 dark:text-amber-400 bg-amber-100 dark:bg-amber-950/40 px-1.5 py-0.5 rounded-md flex items-center">
                <ClockIcon class="w-2.5 h-2.5 mr-0.5" /> +{{ formatRp(getPendingAmount(shohibul)) }}
              </span>
            </div>
            <div class="text-right">
              <span 
                v-if="shohibul.is_lunas" 
                class="inline-block px-1.5 py-0.5 bg-green-100 dark:bg-green-950/40 text-green-700 dark:text-green-400 text-[9px] font-bold rounded uppercase tracking-wider"
              >
                Lunas
              </span>
              <span v-else class="text-[9px] font-bold text-primary dark:text-primary-light">{{ getPercentage(shohibul) }}%</span>
            </div>
          </div>
          
          <div class="w-full h-1.5 bg-gray-100 dark:bg-white/5 rounded-full overflow-hidden shadow-inner">
            <div 
              class="h-full rounded-full transition-all duration-1000 ease-out"
              :class="shohibul.is_lunas ? 'bg-gradient-to-r from-green-400 to-emerald-400' : 'bg-gradient-to-r from-primary to-primary-light'"
              :style="{ width: getPercentage(shohibul) + '%' }"
            ></div>
          </div>
        </div>
      </div>

      <div v-if="filteredShohibuls.length === 0" class="text-center py-12 text-gray-400 dark:text-gray-600 col-span-full border-2 border-dashed border-gray-200 dark:border-white/5 rounded-[2rem]">
        <UsersIcon class="w-10 h-10 mx-auto mb-2 opacity-30" />
        <p class="text-sm font-bold text-gray-500 dark:text-gray-400">Data shohibul tidak ditemukan</p>
        <p class="text-[10px] mt-1 mb-4">Coba sesuaikan kata kunci pencarian atau filter.</p>
      </div>
    </div>

    <transition @enter="onDetailsEnter" @leave="onDetailsLeave" :css="false">
      <div v-if="isDetailsModalOpen" class="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60] flex flex-col justify-end modal-backdrop" style="margin: 0; padding: 0;">
        <div class="flex-1 w-full h-full absolute inset-0 cursor-pointer" @click="closeDetails"></div>
        
        <div class="bg-white dark:bg-dark rounded-t-[2rem] p-5 sm:p-6 max-h-[90%] overflow-y-auto space-y-4 relative border-[2px] border-b-0 border-gray-300 dark:border-white/10 shadow-2xl pb-[calc(20px+env(safe-area-inset-bottom,0px))] details-modal-content w-full max-w-2xl mx-auto z-10 custom-scrollbar">
          <div class="w-12 h-1.5 bg-gray-300 dark:bg-gray-600 rounded-full mx-auto -mt-2 sm:-mt-4 mb-4 cursor-pointer hover:bg-gray-400 transition-colors" @click="closeDetails"></div>
          
          <div class="flex justify-between items-start">
            <div class="flex items-center space-x-4">
              <div 
                class="w-14 h-14 rounded-[1.2rem] flex items-center justify-center font-bold text-lg shrink-0 text-white shadow-inner"
                :style="getAvatarStyle(selectedShohibul.name)"
              >
                {{ getInitials(selectedShohibul.name) }}
              </div>
              <div>
                <div class="flex items-center space-x-2">
                  <h3 class="text-xl font-bold text-gray-800 dark:text-white font-heading">{{ selectedShohibul.name }}</h3>
                </div>
                <div class="text-[11px] text-gray-500 mt-0.5 font-medium space-y-0">
                  <p class="flex items-center text-gray-600 dark:text-gray-400">
                    <HomeIcon class="w-3 h-3 mr-1 shrink-0" />
                    <span class="truncate">{{ selectedShohibul.address || 'Belum ada alamat' }}</span>
                  </p>
                  <p class="flex items-center cursor-pointer hover:text-gray-800 dark:hover:text-gray-200 transition-colors w-fit" @click="togglePhoneReveal(selectedShohibul.id, $event)">
                    <PhoneIcon class="w-3 h-3 mr-1" /> {{ getDisplayPhone(selectedShohibul) }}
                  </p>
                </div>
              </div>
            </div>
            <button @click="closeDetails" class="p-2 rounded-full bg-gray-100 dark:bg-white/5 hover:bg-gray-200 dark:hover:bg-white/10 transition-colors text-gray-500 dark:text-gray-400">
              <XIcon class="w-5 h-5" />
            </button>
          </div>

          <div class="grid grid-cols-2 gap-3">
            <div class="bg-gray-50 dark:bg-white/[0.02] border-[1.5px] border-gray-200 dark:border-white/5 p-3 rounded-2xl text-center space-y-1.5 shadow-sm">
              <span class="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Hewan Target</span>
              <span class="text-base font-bold text-gray-800 dark:text-white block flex items-center justify-center">
                <span class="mr-1.5 text-xl">{{ selectedShohibul.target_type === 'sapi' ? '🐄' : '🐐' }}</span>
                {{ selectedShohibul.target_type === 'sapi' ? 'Sapi' : 'Kambing' }}
              </span>
              <span class="text-[9px] text-gray-400 font-semibold block bg-white dark:bg-black/20 py-1 rounded-md mx-4 border border-gray-100 dark:border-white/5">{{ selectedShohibul.animal_group?.name || '-' }}</span>
            </div>
            
            <div class="bg-gray-50 dark:bg-white/[0.02] border-[1.5px] border-gray-200 dark:border-white/5 p-3 rounded-2xl text-center space-y-1.5 shadow-sm">
              <span class="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Status Tabungan</span>
              <span 
                class="text-[10px] font-bold block py-1.5 px-3 rounded-lg w-fit mx-auto uppercase tracking-wider"
                :class="selectedShohibul.is_lunas
                  ? 'bg-green-100 text-green-700 dark:bg-green-950/40 dark:text-green-400' 
                  : 'bg-amber-100 text-amber-700 dark:bg-amber-950/40 dark:text-amber-400'"
              >
                {{ selectedShohibul.is_lunas ? 'Lunas' : 'Belum Lunas' }}
              </span>
              <span class="text-[10px] font-bold text-primary dark:text-primary-light block">{{ getPercentage(selectedShohibul) }}% Terkumpul</span>
            </div>
          </div>

          <div class="space-y-2 bg-gray-50 dark:bg-white/[0.02] border-[1.5px] border-gray-200 dark:border-white/5 p-3 rounded-2xl shadow-sm">
            <h4 class="text-[10px] font-bold text-gray-600 dark:text-gray-400 uppercase tracking-widest flex items-center">
              <ActivityIcon class="w-3.5 h-3.5 mr-1.5" /> Perkembangan Dana
            </h4>
            <div class="space-y-2">
              <div class="flex justify-between items-center text-xs">
                <span class="text-gray-500 dark:text-gray-400 font-semibold">Telah Terbayar</span>
                <span class="font-bold text-primary dark:text-primary-light">{{ formatRp(selectedShohibul.collected_amount) }}</span>
              </div>
              <div class="flex justify-between items-center text-xs">
                <span class="text-gray-500 dark:text-gray-400 font-semibold">Target Qurban</span>
                <span class="font-bold text-gray-800 dark:text-white">{{ formatRp(selectedShohibul.target_amount) }}</span>
              </div>
              <div class="w-full h-1.5 bg-gray-200 dark:bg-white/10 rounded-full overflow-hidden mt-2">
                <div 
                  class="h-full rounded-full transition-all duration-1000 ease-out"
                  :class="selectedShohibul.is_lunas ? 'bg-green-500' : 'bg-primary'"
                  :style="{ width: getPercentage(selectedShohibul) + '%' }"
                ></div>
              </div>
              <div v-if="!selectedShohibul.is_lunas && Number(selectedShohibul.target_amount) - Number(selectedShohibul.collected_amount) > 0" class="flex justify-between items-center text-xs pt-3 border-t border-gray-200/50 dark:border-white/5 mt-2">
                <span class="text-gray-500 dark:text-gray-400 font-bold">Kekurangan</span>
                <span class="font-bold text-secondary">{{ formatRp(Number(selectedShohibul.target_amount) - Number(selectedShohibul.collected_amount)) }}</span>
              </div>
            </div>
          </div>

          <div class="space-y-2">
            <h4 class="text-[10px] font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest flex items-center">
              <HistoryIcon class="w-3.5 h-3.5 mr-1.5" /> Riwayat Setoran
            </h4>
            
            <div v-if="memberTransactions.length > 0" class="space-y-2 max-h-[250px] overflow-y-auto pr-1 custom-scrollbar">
              <div 
                v-for="tx in memberTransactions" 
                :key="tx.id"
                @click="openReceiptModal(tx)"
                class="bg-white dark:bg-white/[0.02] border-[1.5px] p-2.5 rounded-2xl flex justify-between items-center shadow-sm transition-colors cursor-pointer"
                :class="getStatusBorderClass(tx.status)"
              >
                <div class="flex items-center space-x-3">
                  <div class="w-10 h-10 rounded-xl flex items-center justify-center" :class="getStatusIconClass(tx.status)">
                    <ClockIcon v-if="tx.status === 'pending'" class="w-5 h-5" />
                    <XCircleIcon v-else-if="['cancelled', 'expire', 'expired', 'failed', 'deny'].includes(tx.status)" class="w-5 h-5" />
                    <WalletIcon v-else class="w-5 h-5" />
                  </div>
                  <div>
                    <span class="text-xs font-bold block" :class="getStatusTextClass(tx.status)">
                      {{ getStatusLabel(tx.status) }}
                    </span>
                    <span class="text-[9px] text-gray-400 dark:text-gray-500 font-semibold">{{ formatDate(tx.completed_at || tx.created_at) }}</span>
                  </div>
                </div>
                <span class="text-sm font-bold" :class="getStatusTextClass(tx.status)">
                  {{ formatRp(tx.amount) }}
                </span>
              </div>
            </div>
            
            <div v-else class="text-center py-6 bg-gray-50 dark:bg-white/[0.02] rounded-2xl border border-dashed border-gray-200 dark:border-white/5">
              <p class="text-xs text-gray-400 font-semibold">Belum ada riwayat setoran.</p>
            </div>
          </div>
          
          <div class="pt-3 border-t border-gray-200/50 dark:border-white/10 pb-2">
            <button 
              v-if="Number(selectedShohibul.collected_amount) < Number(selectedShohibul.target_amount)"
              @click="goToDeposit(selectedShohibul.id)"
              class="w-full py-3 bg-primary hover:bg-primary-light text-white rounded-xl font-bold text-sm transition-all shadow-md shadow-primary/20 flex items-center justify-center space-x-2"
            >
              <WalletIcon class="w-5 h-5" />
              <span>Tambah Setoran</span>
            </button>
            <button 
              v-else
              disabled
              class="w-full py-3 bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded-xl font-bold text-sm cursor-not-allowed flex items-center justify-center space-x-2 border border-green-200 dark:border-green-800/50"
            >
              <CheckCircleIcon class="w-5 h-5" />
              <span>Tabungan Sudah Lunas</span>
            </button>
          </div>
        </div>
      </div>
    </transition>

    <transition @enter="onReceiptEnter" @leave="onReceiptLeave" :css="false">
      <div v-if="isReceiptModalOpen" class="fixed inset-0 bg-black/60 backdrop-blur-sm z-[70] flex flex-col justify-end receipt-backdrop" style="margin: 0; padding: 0;">
        <div class="flex-1 w-full h-full absolute inset-0 cursor-pointer" @click="closeReceiptModal"></div>
        
        <div class="bg-white dark:bg-dark rounded-t-[2rem] p-6 max-h-[90vh] flex flex-col relative border-t border-gray-200/50 dark:border-white/10 shadow-2xl pb-[calc(20px+env(safe-area-inset-bottom,0px))] receipt-modal-content w-full max-w-lg mx-auto z-10 overflow-y-auto custom-scrollbar">
          <div class="w-12 h-1.5 bg-gray-300 dark:bg-gray-600 rounded-full mx-auto -mt-2 mb-6 cursor-pointer hover:bg-gray-400 transition-colors" @click="closeReceiptModal"></div>
          
          <div v-if="selectedTx" class="flex flex-col items-center w-full">
            <div class="w-16 h-16 rounded-full flex items-center justify-center mb-4" :class="getStatusIconClass(selectedTx.status)">
              <CheckCircleIcon v-if="selectedTx.status === 'success' || selectedTx.status === 'settlement'" class="w-8 h-8" />
              <ClockIcon v-else-if="selectedTx.status === 'pending'" class="w-8 h-8" />
              <XCircleIcon v-else class="w-8 h-8" />
            </div>
            
            <h3 class="text-lg font-bold" :class="getStatusTextClass(selectedTx.status)">{{ getStatusModalTitle(selectedTx.status) }}</h3>
            <p class="text-3xl font-extrabold mt-1 mb-6 font-heading" :class="[getStatusTextClass(selectedTx.status), ['cancelled', 'expire', 'expired', 'failed', 'deny'].includes(selectedTx.status) ? 'line-through opacity-70' : '']">{{ formatRp(selectedTx.amount) }}</p>

            <div class="w-full bg-gray-50 dark:bg-white/[0.02] border-[2px] border-gray-300 dark:border-white/10 rounded-2xl p-4 space-y-4 mb-6 shadow-sm">
              <div class="flex justify-between items-center text-sm">
                <span class="text-gray-500 dark:text-gray-400 font-medium">Status</span>
                <span class="inline-block px-2 py-0.5 text-[10px] font-bold rounded-md uppercase tracking-widest border" :class="getStatusBadgeClass(selectedTx.status)">
                  {{ getStatusLabel(selectedTx.status) }}
                </span>
              </div>
              <div class="flex justify-between items-center text-sm">
                <span class="text-gray-500 dark:text-gray-400 font-medium">Tanggal</span>
                <span class="font-bold text-gray-800 dark:text-white">{{ formatDate(selectedTx.completed_at || selectedTx.created_at) }}</span>
              </div>
              <div class="flex justify-between items-center text-sm">
                <span class="text-gray-500 dark:text-gray-400 font-medium">ID Transaksi</span>
                <span class="font-bold text-gray-800 dark:text-white uppercase">{{ selectedTx.id }}</span>
              </div>
              <div class="flex justify-between items-center text-sm">
                <span class="text-gray-500 dark:text-gray-400 font-medium">Metode</span>
                <span class="font-bold text-gray-800 dark:text-white uppercase">{{ selectedTx.payment_method || 'Tunai/Transfer' }}</span>
              </div>
              <div class="h-px w-full bg-gray-200 dark:bg-white/10 my-2"></div>
              <div class="flex justify-between items-center text-sm">
                <span class="text-gray-500 dark:text-gray-400 font-medium">Nama Shohibul</span>
                <span class="font-bold text-gray-800 dark:text-white">{{ getTxShohibul(selectedTx).name }}</span>
              </div>
              <div class="flex justify-between items-center text-sm">
                <span class="text-gray-500 dark:text-gray-400 font-medium">Alamat</span>
                <span class="font-bold text-gray-800 dark:text-white max-w-[60%] text-right truncate">{{ getTxShohibul(selectedTx).address || 'Tidak ada alamat' }}</span>
              </div>
              <div class="flex justify-between items-center text-sm">
                <span class="text-gray-500 dark:text-gray-400 font-medium">Nomor WhatsApp</span>
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
    </transition>
    </template>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted, nextTick } from 'vue'
import { useRouter } from 'vue-router'
import { useQurbanStore } from '@/stores/qurban'
import gsap from 'gsap'
import { UsersIcon, SearchIcon, InfoIcon, WalletIcon, XIcon, ActivityIcon, HistoryIcon, CheckCircleIcon, ClockIcon, MapPinIcon, PhoneIcon, ChevronRightIcon, UserPlusIcon, HomeIcon, XCircleIcon } from 'lucide-vue-next'
import LoadingSkeleton from '@/components/ui/LoadingSkeleton.vue'
import RetryError from '@/components/ui/RetryError.vue'
import StaleBanner from '@/components/ui/StaleBanner.vue'

const store = useQurbanStore()
const router = useRouter()
const containerRef = ref(null)
let ctx

const searchQuery = ref('')
const activeFilter = ref('all')
const selectedShohibul = ref(null)
const isDetailsModalOpen = ref(false)

const filters = [
  { label: 'Semua', value: 'all', lucide: null },
  { label: 'Sapi', value: 'sapi', icon: '🐄' },
  { label: 'Kambing', value: 'kambing', icon: '🐐' },
  { label: 'Pending', value: 'pending', lucide: ClockIcon },
  { label: 'Belum Lunas', value: 'belum_lunas', lucide: ActivityIcon },
  { label: 'Lunas', value: 'lunas', lucide: CheckCircleIcon }
]

const formatRp = (val) => {
  if (!val) return 'Rp. 0'
  return 'Rp. ' + new Intl.NumberFormat('id-ID').format(val)
}

const filteredShohibuls = computed(() => {
  return store.shohibuls.filter(s => {
    const matchesSearch = searchQuery.value === '' || 
                          (s.name && s.name.toLowerCase().includes(searchQuery.value.toLowerCase())) ||
                          (s.address && s.address.toLowerCase().includes(searchQuery.value.toLowerCase()))
    
    let matchesFilter = true
    if (activeFilter.value === 'sapi') matchesFilter = s.target_type === 'sapi'
    if (activeFilter.value === 'kambing') matchesFilter = s.target_type === 'kambing'
    if (activeFilter.value === 'belum_lunas') matchesFilter = !s.is_lunas
    if (activeFilter.value === 'lunas') matchesFilter = s.is_lunas
    if (activeFilter.value === 'pending') matchesFilter = getPendingAmount(s) > 0
    
    return matchesSearch && matchesFilter
  })
})

const revealedPhones = ref(new Set())

const togglePhoneReveal = (id, event) => {
  if (event) event.stopPropagation()
  if (revealedPhones.value.has(id)) {
    revealedPhones.value.delete(id)
  } else {
    revealedPhones.value.add(id)
  }
}

const getDisplayPhone = (shohibul) => {
  const phone = shohibul.phone
  if (!phone) return '08XX-XXXX-XXXX'
  if (revealedPhones.value.has(shohibul.id)) return phone
  
  const cleaned = phone.replace(/[^0-9]/g, '')
  if (cleaned.length < 8) return '08XX-••••-XXXX'
  return cleaned.substring(0, 4) + ' •••• ' + cleaned.substring(cleaned.length - 3)
}

const getMaskedPhone = (phone) => {
  if (!phone) return '08XX-XXXX-XXXX'
  if (phone.length <= 6) return phone
  return phone.slice(0, 4) + '****' + phone.slice(-3)
}

const getPercentage = (shohibul) => {
  const target = Number(shohibul.target_amount) || 0
  if (target === 0) return 0
  const pct = (Number(shohibul.collected_amount) / target) * 100
  return Math.min(Math.round(pct), 100)
}

const getTxShohibul = (tx) => {
  return tx.shohibul || store.shohibuls.find(s => s.id === tx.shohibul_id) || selectedShohibul.value || {}
}

const getPendingAmount = (shohibul) => {
  const storePending = store.transactions.filter(tx => (tx.shohibul_id === shohibul.id || tx.shohibulId === shohibul.id) && tx.status === 'pending')
  if (storePending.length > 0) {
    return storePending.reduce((sum, tx) => sum + Number(tx.amount), 0)
  }
  
  if (shohibul.transactions) {
    return shohibul.transactions
      .filter(tx => tx.status === 'pending')
      .reduce((sum, tx) => sum + Number(tx.amount), 0)
  }
  
  return 0
}

const formatDate = (dateStr) => {
  if (!dateStr) return '-'
  const date = new Date(dateStr)
  if (isNaN(date.getTime())) return '-'
  return date.toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })
}

const getInitials = (name) => {
  if (!name) return ''
  const split = name.split(' ')
  if (split.length >= 2) return (split[0][0] + split[1][0]).toUpperCase()
  return name.slice(0, 2).toUpperCase()
}

const getAvatarStyle = (name) => {
  if (!name) return {}
  const gradients = [
    { from: '#8b5cf6', to: '#6d28d9', text: '#ffffff' },
    { from: '#f43f5e', to: '#be123c', text: '#ffffff' },
    { from: '#ec4899', to: '#be185d', text: '#ffffff' },
    { from: '#10b981', to: '#047857', text: '#ffffff' },
    { from: '#3b82f6', to: '#1d4ed8', text: '#ffffff' },
  ]
  let hash = 0
  for (let i = 0; i < name.length; i++) hash = name.charCodeAt(i) + ((hash << 5) - hash)
  const index = Math.abs(hash) % gradients.length
  const g = gradients[index]
  return { background: `linear-gradient(135deg, ${g.from} 0%, ${g.to} 100%)`, color: g.text }
}

const getStatusLabel = (status) => {
  if (status === 'success' || status === 'settlement') return 'Sukses'
  if (status === 'pending') return 'Pending'
  if (['cancelled', 'expire', 'expired', 'failed', 'deny'].includes(status)) return 'Batal'
  return status
}

const getStatusBorderClass = (status) => {
  if (status === 'success' || status === 'settlement') return 'border-gray-200 dark:border-white/5 hover:border-gray-300'
  if (status === 'pending') return 'border-amber-300 dark:border-amber-900/50'
  if (['cancelled', 'expire', 'expired', 'failed', 'deny'].includes(status)) return 'border-red-300 dark:border-red-900/50'
  return 'border-gray-200 dark:border-white/5'
}

const getStatusTextClass = (status) => {
  if (status === 'success' || status === 'settlement') return 'text-gray-800 dark:text-white'
  if (status === 'pending') return 'text-amber-700 dark:text-amber-400'
  if (['cancelled', 'expire', 'expired', 'failed', 'deny'].includes(status)) return 'text-red-600 dark:text-red-400'
  return 'text-gray-500'
}

const getStatusIconClass = (status) => {
  if (status === 'success' || status === 'settlement') return 'bg-gray-50 dark:bg-white/5 text-primary dark:text-primary-light'
  if (status === 'pending') return 'bg-amber-100 dark:bg-amber-900/30 text-amber-500'
  if (['cancelled', 'expire', 'expired', 'failed', 'deny'].includes(status)) return 'bg-red-100 dark:bg-red-900/30 text-red-500'
  return 'bg-gray-50 dark:bg-gray-800 text-gray-500'
}

const getStatusModalTitle = (status) => {
  if (status === 'success' || status === 'settlement') return 'Pembayaran Berhasil'
  if (status === 'pending') return 'Menunggu Pembayaran'
  if (['cancelled', 'expire', 'expired', 'failed', 'deny'].includes(status)) return 'Pembayaran Dibatalkan'
  return 'Status Transaksi'
}

const getStatusBadgeClass = (status) => {
  if (status === 'success' || status === 'settlement') return 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 border-green-200 dark:border-green-800'
  if (status === 'pending') return 'bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400 border-amber-200 dark:border-amber-800'
  return 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 border-red-200 dark:border-red-800'
}

const memberTransactions = computed(() => {
  if (!selectedShohibul.value) return []
  if (selectedShohibul.value.transactions) {
    return selectedShohibul.value.transactions
  }
  
  return store.transactions
    .filter(tx => tx.shohibul_id === selectedShohibul.value.id || tx.shohibulId === selectedShohibul.value.id)
    .sort((a, b) => new Date(b.created_at || b.date) - new Date(a.created_at || a.date))
})

const openDetails = async (shohibul, event) => {
  if (event && (event.target.closest('a') || event.target.closest('button'))) return
  
  selectedShohibul.value = shohibul
  document.body.style.overflow = 'hidden'
  isDetailsModalOpen.value = true

  try {
    const detail = await store.fetchShohibulDetail(shohibul.id)
    if (detail && detail.transactions) {
      selectedShohibul.value = { ...shohibul, transactions: detail.transactions }
    }
  } catch (e) {}
}

const closeDetails = () => {
  isDetailsModalOpen.value = false
  document.body.style.overflow = ''
}

const goToDeposit = (id) => {
  if (selectedShohibul.value) {
    selectedShohibul.value = null
    document.body.style.overflow = ''
  }
  router.push({ name: 'menabung', query: { shohibulId: id } })
}

const onDetailsEnter = (el, done) => {
  const content = el.querySelector('.details-modal-content')
  gsap.fromTo(el, { opacity: 0 }, { opacity: 1, duration: 0.3 })
  gsap.fromTo(content, { yPercent: 100 }, { yPercent: 0, duration: 0.4, ease: 'power3.out', onComplete: done })
}

const onDetailsLeave = (el, done) => {
  const content = el.querySelector('.details-modal-content')
  gsap.to(content, { yPercent: 100, duration: 0.3, ease: 'power3.in' })
  gsap.to(el, { opacity: 0, duration: 0.3, onComplete: () => {
    done()
    if (!isDetailsModalOpen.value) selectedShohibul.value = null
  }})
}

const isReceiptModalOpen = ref(false)
const selectedTx = ref(null)

const openReceiptModal = (tx) => {
  selectedTx.value = tx
  isReceiptModalOpen.value = true
}

const closeReceiptModal = () => {
  isReceiptModalOpen.value = false
}

const onReceiptEnter = (el, done) => {
  const content = el.querySelector('.receipt-modal-content')
  gsap.fromTo(el, { opacity: 0 }, { opacity: 1, duration: 0.3 })
  gsap.fromTo(content, { yPercent: 100 }, { yPercent: 0, duration: 0.4, ease: 'power3.out', onComplete: done })
}

const onReceiptLeave = (el, done) => {
  const content = el.querySelector('.receipt-modal-content')
  gsap.to(content, { yPercent: 100, duration: 0.3, ease: 'power3.in' })
  gsap.to(el, { opacity: 0, duration: 0.3, onComplete: () => {
    done()
    if (!isReceiptModalOpen.value) selectedTx.value = null
  }})
}

const continuePayment = () => {
  if (selectedTx.value && (selectedTx.value.shohibul_id || selectedTx.value.shohibulId)) {
    const shohibulId = selectedTx.value.shohibul_id || selectedTx.value.shohibulId
    isReceiptModalOpen.value = false
    selectedTx.value = null
    selectedShohibul.value = null
    document.body.style.overflow = ''
    router.push({ path: '/menabung', query: { shohibulId: shohibulId } })
  }
}

onMounted(() => {
  if (store.shohibuls.length === 0) {
    store.fetchShohibuls()
  }
  if (store.transactions.length === 0) {
    store.fetchTransactions()
  }

  ctx = gsap.context(() => {
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })
    
    tl.from('.hero-card', { opacity: 0, y: -20, duration: 0.5 })
      .from('.search-box', { opacity: 0, y: 10, duration: 0.4 }, '-=0.3')
      .from('.shohibul-cards-container', { opacity: 0, y: 20, duration: 0.5 }, '-=0.1')
  }, containerRef.value)
})

onUnmounted(() => {
  if (ctx) ctx.revert()
  document.body.style.overflow = ''
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
  -ms-overflow-style: none;
  scrollbar-width: none;
}
</style>
