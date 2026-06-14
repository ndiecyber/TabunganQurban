<template>
  <div class="space-y-4 sm:space-y-5 pb-2" ref="containerRef">
    
    <div class="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-[#022c22] via-[#064e3b] to-[#0f766e] text-white p-6 sm:p-8 shadow-[0_15px_40px_-10px_rgba(2,44,34,0.7)] border border-white/10 hero-card flex flex-col min-h-[180px] group">
      <!-- 1. Modern Grid Base -->
      <div class="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none opacity-60"></div>
      
      <!-- 2. Dynamic Glowing Ambient Orbs -->
      <div class="absolute top-0 right-0 w-[80%] h-[80%] bg-emerald-400/15 rounded-full blur-3xl translate-x-1/3 -translate-y-1/4 pointer-events-none animate-float" style="animation-duration: 7s;"></div>
      <div class="absolute bottom-0 left-0 w-[60%] h-[60%] bg-teal-500/15 rounded-full blur-3xl -translate-x-1/4 translate-y-1/4 pointer-events-none animate-float" style="animation-duration: 9s; animation-delay: 1s;"></div>
      <div class="absolute top-1/2 left-[30%] w-[50%] h-[50%] bg-secondary/15 rounded-full blur-3xl -translate-y-1/2 pointer-events-none"></div>

      <!-- 3. Giant Frosted Glass Geometric Rings -->
      <div class="absolute -right-20 -bottom-20 w-72 h-72 border border-white/20 rounded-[3rem] bg-gradient-to-br from-white/10 to-transparent backdrop-blur-sm pointer-events-none transform rotate-12"></div>
      <div class="absolute -left-16 -top-16 w-64 h-64 border border-white/10 rounded-full bg-gradient-to-tr from-white/5 to-transparent backdrop-blur-md pointer-events-none"></div>
      
      <!-- 4. Islamic Subtle Pattern Overlay -->
      <div class="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cpath d=\'M36 34v-4h-4v-4h4v-4h4v4h4v4h-4v4h-4zm-8 8v-4h-4v-4h4v-4h4v4h-4v4h-4zm-8 0v-4h-4v-4h4v-4h4v4h-4v4h-4zm16 8v-4h-4v-4h4v-4h4v4h-4v4h-4z\' fill=\'%23ffffff\' fill-opacity=\'0.04\'/%3E%3C/g%3E%3C/svg%3E')] opacity-80 pointer-events-none mix-blend-overlay"></div>

      <!-- 5. Floating Particles & Stars -->
      <div class="absolute top-8 left-1/4 w-1.5 h-1.5 bg-amber-300 rounded-full animate-ping pointer-events-none" style="animation-duration: 3s"></div>
      <div class="absolute bottom-1/3 right-1/4 w-2 h-2 bg-teal-300 rounded-full animate-pulse pointer-events-none" style="animation-duration: 4s"></div>
      <div class="absolute top-[40%] left-6 text-white/20 text-[10px] animate-bounce pointer-events-none" style="animation-duration: 5s">✦</div>
      <div class="absolute top-1/4 right-12 text-amber-400/30 text-sm animate-pulse pointer-events-none" style="animation-duration: 6s">✧</div>

      <!-- 6. Giant Geometric Rub el Hizb (Islamic Star) Watermark -->
      <div class="absolute -right-24 -bottom-24 w-80 h-80 opacity-20 pointer-events-none animate-[spin_60s_linear_infinite]">
        <div class="absolute inset-10 border-[1.5px] border-amber-300/40 rounded-3xl shadow-[0_0_30px_rgba(251,191,36,0.1)]"></div>
        <div class="absolute inset-10 border-[1.5px] border-amber-300/40 rounded-3xl shadow-[0_0_30px_rgba(251,191,36,0.1)] transform rotate-45"></div>
        <div class="absolute inset-16 border border-teal-300/30 rounded-full"></div>
      </div>

      <!-- 7. Sweeping Modern Light Beams -->
      <div class="absolute inset-0 pointer-events-none overflow-hidden">
        <div class="absolute top-[-50%] left-[20%] w-[1px] h-[200%] bg-gradient-to-b from-transparent via-white/30 to-transparent transform rotate-[35deg] opacity-70"></div>
        <div class="absolute top-[-50%] left-[30%] w-[2px] h-[200%] bg-gradient-to-b from-transparent via-white/10 to-transparent transform rotate-[35deg] opacity-50 blur-[1px]"></div>
      </div>

      <!-- 8. Glass Overlay Shine -->
      <div class="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/[0.07] to-white/0 opacity-60 pointer-events-none transform -skew-x-12 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 ease-in-out"></div>
      
      <div class="relative z-10 flex flex-col h-full justify-between space-y-6">
        <div class="flex justify-between items-start">
          <div class="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 border border-white/10 backdrop-blur-md shadow-sm">
            <span class="w-1.5 h-1.5 rounded-full bg-secondary animate-pulse shadow-[0_0_8px_rgba(217,119,6,0.8)]"></span>
            <span class="text-white/90 text-[10px] font-black tracking-[0.2em] uppercase">Daftar Jamaah</span>
          </div>
          <div class="w-11 h-11 bg-white/10 rounded-full flex items-center justify-center backdrop-blur-xl border border-white/20 shadow-[0_0_15px_rgba(255,255,255,0.1)] group-hover:scale-110 transition-transform duration-500">
            <UsersIcon class="w-5 h-5 text-secondary drop-shadow-md" />
          </div>
        </div>
        
        <div>
          <h2 class="text-3xl sm:text-4xl font-black text-white font-heading drop-shadow-lg tracking-tight">
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

    <div class="relative search-box">
      <input 
        v-model="searchQuery" 
        type="text" 
        placeholder="Cari nama atau kode shohibul..." 
        class="w-full bg-white dark:bg-white/[0.02] text-sm border-[2px] border-gray-300 dark:border-white/10 rounded-[1.5rem] pl-12 pr-4 py-4 shadow-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent dark:text-white transition-all font-medium"
      />
      <div class="absolute left-4 top-4 text-gray-400">
        <SearchIcon class="w-5 h-5" />
      </div>
    </div>

    <div class="grid grid-cols-2 sm:grid-cols-4 gap-1.5 pb-3 pt-1 px-1 sm:px-0">
      <button 
        v-for="filter in filters" 
        :key="filter.value"
        @click="activeFilter = filter.value"
        class="w-full py-1.5 rounded-full text-[11px] sm:text-xs font-extrabold transition-all duration-300 cursor-pointer flex items-center justify-center space-x-1.5 border-[1.5px]"
        :class="activeFilter === filter.value 
          ? 'bg-primary text-white border-primary-light shadow-[0_8px_20px_-6px_rgba(15,118,110,0.5)] scale-[1.02] z-10 relative' 
          : 'bg-white dark:bg-white/[0.03] text-gray-600 dark:text-gray-400 border-[2px] border-gray-300 dark:border-white/10 hover:border-primary/40 hover:text-primary dark:hover:text-primary-light hover:bg-primary/5 shadow-md hover:shadow-lg'"
      >
        <span v-if="filter.icon" class="text-[11px] sm:text-xs">{{ filter.icon }}</span>
        <span class="tracking-wide">{{ filter.label }}</span>
      </button>
    </div>

    <div class="text-center text-[10px] sm:text-xs text-gray-400 dark:text-gray-500 px-1 font-bold tracking-wide uppercase count-label mb-2">
      Menampilkan {{ filteredShohibuls.length }} dari {{ store.shohibuls.length }} shohibul
    </div>

    <div class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5 sm:gap-6 shohibul-cards-container">
      <div 
        v-for="shohibul in filteredShohibuls" 
        :key="shohibul.id"
        @click="openDetails(shohibul, $event)"
        class="bg-white dark:bg-white/[0.02] border-[2px] border-gray-300 dark:border-white/10 rounded-[1.5rem] p-3.5 shadow-xl cursor-pointer hover:shadow-2xl hover:border-primary/50 transition-all duration-300 flex flex-col justify-between space-y-2 group"
      >
        <div class="flex justify-between items-start">
          <div class="flex items-center space-x-3">
            <div 
              class="w-9 h-9 rounded-[0.8rem] flex items-center justify-center font-bold text-[11px] shrink-0 shadow-inner group-hover:scale-105 transition-transform duration-300"
              :style="getAvatarStyle(shohibul.name)"
            >
              {{ getInitials(shohibul.name) }}
            </div>
            <div>
              <h3 class="text-sm font-extrabold text-gray-800 dark:text-white leading-tight group-hover:text-primary dark:group-hover:text-primary-light transition-colors">{{ shohibul.name }}</h3>
              <div class="text-[10px] text-gray-500 mt-1 space-y-0.5 font-medium">
                 <p class="flex items-center"><MapPinIcon class="w-2.5 h-2.5 mr-1 text-gray-400" /> {{ shohibul.address || 'Belum ada alamat' }}</p>
                 <p class="flex items-center"><PhoneIcon class="w-2.5 h-2.5 mr-1 text-gray-400" /> {{ shohibul.phone || '08XX-XXXX-XXXX' }}</p>
              </div>
            </div>
          </div>
          <button @click.stop="openDetails(shohibul, $event)" class="px-2.5 py-1 bg-primary/10 border-[2px] border-primary/30 text-primary dark:text-primary-light rounded-lg text-[9px] font-bold uppercase tracking-widest flex items-center hover:bg-primary/20 transition-colors">
            Detail
          </button>
        </div>

        <div class="flex justify-between items-center bg-gray-50 dark:bg-white/[0.02] border-[2px] border-gray-300 dark:border-transparent p-1 px-2 rounded-xl mt-1 mb-0.5">
          <span class="text-[9px] font-bold text-gray-700 dark:text-gray-300">
            {{ shohibul.type === 'sapi' ? '🐄 Sapi' : '🐐 Kambing' }}
          </span>
          <span class="text-[10px] font-black text-primary dark:text-primary-light uppercase tracking-widest">{{ shohibul.code }}</span>
        </div>

        <div class="space-y-2">
          <div class="flex justify-between items-end">
            <div>
              <p class="text-[10px] text-gray-400 dark:text-gray-500 font-semibold mb-0.5">Terkumpul</p>
              <div class="flex items-center flex-wrap gap-1.5">
                <p class="text-sm font-bold text-gray-800 dark:text-white">
                  {{ formatRp(shohibul.collected) }}
                </p>
                <span v-if="getPendingAmount(shohibul.id) > 0" class="text-[9px] font-bold text-amber-700 dark:text-amber-400 bg-amber-100 dark:bg-amber-950/40 px-1.5 py-0.5 rounded-md flex items-center">
                  <ClockIcon class="w-2.5 h-2.5 mr-0.5" />
                  +{{ formatRp(getPendingAmount(shohibul.id)) }}
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
          
          <div class="w-full h-2 bg-gray-100 dark:bg-white/5 border-[2px] border-gray-300 dark:border-transparent rounded-full overflow-hidden shadow-inner mt-1">
            <div 
              class="h-full rounded-full transition-all duration-1000 ease-out"
              :class="shohibul.collected >= shohibul.target ? 'bg-gradient-to-r from-green-500 to-emerald-400 shadow-[0_0_8px_rgba(16,185,129,0.5)]' : 'bg-gradient-to-r from-primary to-primary-light'"
              :style="{ width: getPercentage(shohibul) + '%' }"
            ></div>
          </div>
        </div>

        <div class="pt-2 border-t border-gray-100 dark:border-white/5">
          <button 
            v-if="shohibul.collected < shohibul.target"
            @click.stop="goToDeposit(shohibul.id)"
            class="w-full py-1.5 bg-primary hover:bg-primary-light text-white rounded-xl text-[11px] font-bold transition-all flex items-center justify-center space-x-1.5 shadow-md shadow-primary/20"
          >
            <WalletIcon class="w-4 h-4" />
            <span>Tabung Sekarang</span>
          </button>
        </div>
      </div>

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

    <div v-if="selectedShohibul" class="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex flex-col justify-end modal-backdrop" style="margin: 0; padding: 0;">
        <div class="flex-1 w-full h-full absolute inset-0 cursor-pointer" @click="closeDetails"></div>
        
        <div class="bg-white dark:bg-dark rounded-t-[2rem] p-6 sm:p-8 max-h-[90%] overflow-y-auto space-y-6 relative border-[2px] border-b-0 border-gray-300 dark:border-white/10 shadow-2xl pb-[calc(20px+env(safe-area-inset-bottom,0px))] details-modal-content w-full max-w-2xl mx-auto z-10 custom-scrollbar">
          <div class="w-12 h-1.5 bg-gray-300 dark:bg-gray-600 rounded-full mx-auto -mt-2 sm:-mt-4 mb-4 cursor-pointer hover:bg-gray-400 transition-colors" @click="closeDetails"></div>
          
          <div class="flex justify-between items-start">
            <div class="flex items-center space-x-4">
              <div 
                class="w-14 h-14 rounded-[1.2rem] flex items-center justify-center font-bold text-lg shrink-0 shadow-inner"
                :style="getAvatarStyle(selectedShohibul.name)"
              >
                {{ getInitials(selectedShohibul.name) }}
              </div>
              <div>
                <div class="flex items-center space-x-2">
                  <h3 class="text-xl font-bold text-gray-800 dark:text-white font-heading">{{ selectedShohibul.name }}</h3>
                  <span class="px-2 py-0.5 bg-gray-100 dark:bg-white/5 text-[9px] text-gray-700 dark:text-gray-400 font-bold rounded uppercase tracking-widest border-[2px] border-gray-300 dark:border-white/10">{{ selectedShohibul.code }}</span>
                </div>
                <div class="text-xs text-gray-400 dark:text-gray-500 mt-1 font-medium space-y-0.5">
                  <p class="flex items-center"><MapPinIcon class="w-3 h-3 mr-1" /> {{ selectedShohibul.address || 'Belum ada alamat' }}</p>
                  <p class="flex items-center"><PhoneIcon class="w-3 h-3 mr-1" /> {{ selectedShohibul.phone || '08XX-XXXX-XXXX' }}</p>
                </div>
              </div>
            </div>
            <button @click="closeDetails" class="p-2 rounded-full bg-gray-100 dark:bg-white/5 hover:bg-gray-200 dark:hover:bg-white/10 transition-colors text-gray-500 dark:text-gray-400">
              <XIcon class="w-5 h-5" />
            </button>
          </div>

          <div class="grid grid-cols-2 gap-4">
            <div class="bg-gray-50 dark:bg-white/[0.02] border-[2px] border-gray-300 dark:border-white/5 p-4 rounded-[1.5rem] text-center space-y-2 shadow-md">
              <span class="text-[10px] font-bold text-gray-500 dark:text-gray-500 uppercase tracking-widest">Hewan Target</span>
              <span class="text-base font-black text-gray-800 dark:text-white block flex items-center justify-center">
                <span class="mr-1.5 text-xl">{{ selectedShohibul.type === 'sapi' ? '🐄' : '🐐' }}</span>
                {{ selectedShohibul.type === 'sapi' ? 'Sapi' : 'Kambing' }}
              </span>
              <span class="text-[9px] text-gray-400 font-semibold block bg-white dark:bg-black/20 py-1 rounded-md mx-4 border border-gray-100 dark:border-white/5">{{ selectedShohibul.animalGroup }}</span>
            </div>
            
            <div class="bg-gray-50 dark:bg-white/[0.02] border-[2px] border-gray-300 dark:border-white/5 p-4 rounded-[1.5rem] text-center space-y-2 shadow-md">
              <span class="text-[10px] font-bold text-gray-500 dark:text-gray-500 uppercase tracking-widest">Status Tabungan</span>
              <span 
                class="text-[10px] font-black block py-1.5 px-3 rounded-lg w-fit mx-auto uppercase tracking-wider"
                :class="selectedShohibul.collected >= selectedShohibul.target 
                  ? 'bg-green-100 text-green-700 dark:bg-green-950/40 dark:text-green-400' 
                  : 'bg-amber-100 text-amber-700 dark:bg-amber-950/40 dark:text-amber-400'"
              >
                {{ selectedShohibul.collected >= selectedShohibul.target ? 'Terpenuhi (Lunas)' : 'Dalam Proses' }}
              </span>
              <span class="text-[10px] font-black text-primary dark:text-primary-light block">{{ getPercentage(selectedShohibul) }}% Terkumpul</span>
            </div>
          </div>

          <div class="space-y-4 bg-gray-50 dark:bg-white/[0.02] border-[2px] border-gray-300 dark:border-white/5 p-5 rounded-[1.5rem] shadow-md">
            <h4 class="text-[10px] font-bold text-gray-600 dark:text-gray-400 uppercase tracking-widest flex items-center">
              <ActivityIcon class="w-3.5 h-3.5 mr-1.5" /> Perkembangan Dana
            </h4>
            <div class="space-y-3">
              <div class="flex justify-between items-center text-sm">
                <span class="text-gray-500 dark:text-gray-400 font-semibold">Telah Terbayar</span>
                <span class="font-black text-primary dark:text-primary-light">{{ formatRp(selectedShohibul.collected) }}</span>
              </div>
              <div class="flex justify-between items-center text-sm">
                <span class="text-gray-500 dark:text-gray-400 font-semibold">Target Qurban</span>
                <span class="font-black text-gray-800 dark:text-white">{{ formatRp(selectedShohibul.target) }}</span>
              </div>
              <div class="w-full h-1.5 bg-gray-200 border-[2px] border-gray-300 dark:border-transparent dark:bg-white/10 rounded-full overflow-hidden shadow-inner mt-2">
                <div 
                  class="h-full rounded-full transition-all duration-1000 ease-out"
                  :class="selectedShohibul.collected >= selectedShohibul.target ? 'bg-green-500' : 'bg-primary'"
                  :style="{ width: getPercentage(selectedShohibul) + '%' }"
                ></div>
              </div>
              <div v-if="selectedShohibul.target - selectedShohibul.collected > 0" class="flex justify-between items-center text-sm pt-3 border-t border-gray-200/50 dark:border-white/5 mt-2">
                <span class="text-gray-500 dark:text-gray-400 font-bold">Kekurangan</span>
                <span class="font-black text-secondary">{{ formatRp(selectedShohibul.target - selectedShohibul.collected) }}</span>
              </div>
            </div>
          </div>

          <div class="space-y-3">
            <h4 class="text-[10px] font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest flex items-center">
              <HistoryIcon class="w-3.5 h-3.5 mr-1.5" /> Riwayat Setoran
            </h4>
            
            <div v-if="memberTransactions.length > 0" class="space-y-2 max-h-[250px] overflow-y-auto pr-1 custom-scrollbar">
              <div 
                v-for="tx in memberTransactions" 
                :key="tx.id"
                @click="openReceiptModal(tx)"
                class="bg-white dark:bg-white/[0.02] border-[2px] p-4 rounded-[1.5rem] flex justify-between items-center shadow-md transition-colors cursor-pointer"
                :class="tx.status === 'pending' ? 'border-amber-300 dark:border-amber-900/50 hover:border-amber-400' : 'border-gray-300 dark:border-white/5 hover:border-gray-400 dark:hover:border-white/10'"
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
                <span class="text-sm font-bold" :class="tx.status === 'pending' ? 'text-amber-700 dark:text-amber-400' : 'text-gray-800 dark:text-white'">
                  {{ formatRp(tx.amount) }}
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

    <div v-if="isReceiptModalOpen" class="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60] flex flex-col justify-end receipt-backdrop" style="margin: 0; padding: 0;">
      <div class="flex-1 w-full h-full absolute inset-0 cursor-pointer" @click="closeReceiptModal"></div>
      
      <div class="bg-white dark:bg-dark rounded-t-[2rem] p-6 max-h-[90vh] flex flex-col relative border-t border-gray-200/50 dark:border-white/10 shadow-2xl pb-[calc(20px+env(safe-area-inset-bottom,0px))] receipt-modal-content w-full max-w-lg mx-auto z-10 overflow-y-auto custom-scrollbar">
        <div class="w-12 h-1.5 bg-gray-300 dark:bg-gray-600 rounded-full mx-auto -mt-2 mb-6 cursor-pointer hover:bg-gray-400 transition-colors" @click="closeReceiptModal"></div>
        
        <div v-if="selectedTx" class="flex flex-col items-center w-full">
          <div class="w-16 h-16 rounded-full flex items-center justify-center mb-4" :class="selectedTx.status === 'success' ? 'bg-green-100 dark:bg-green-900/30 text-green-500' : 'bg-amber-100 dark:bg-amber-900/30 text-amber-500'">
            <CheckCircleIcon v-if="selectedTx.status === 'success'" class="w-8 h-8" />
            <ClockIcon v-else class="w-8 h-8" />
          </div>
          
          <h3 class="text-lg font-bold text-gray-800 dark:text-white">{{ selectedTx.status === 'success' ? 'Pembayaran Berhasil' : 'Menunggu Pembayaran' }}</h3>
          <p class="text-3xl font-black text-gray-800 dark:text-white mt-1 mb-6 font-heading">{{ formatRp(selectedTx.amount) }}</p>

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
import { UsersIcon, SearchIcon, InfoIcon, WalletIcon, XIcon, ActivityIcon, HistoryIcon, CheckCircleIcon, ClockIcon, MapPinIcon, PhoneIcon, ChevronRightIcon, UserPlusIcon } from 'lucide-vue-next'

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

// Fungsi format Rupiah lokal
const formatRp = (val) => {
  if (!val) return 'Rp. 0'
  return 'Rp. ' + new Intl.NumberFormat('id-ID').format(val)
}

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