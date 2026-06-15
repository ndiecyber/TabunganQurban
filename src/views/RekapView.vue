<template>
  <div class="space-y-3 sm:space-y-4 pb-2" ref="containerRef">
    
    <div class="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-[#022c22] via-[#064e3b] to-[#0f766e] text-white p-6 sm:p-8 shadow-[0_15px_40px_-10px_rgba(2,44,34,0.7)] border border-white/10 hero-card flex flex-col min-h-[220px] group">
      <div class="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none opacity-60"></div>
      
      <div class="absolute top-0 right-0 w-[80%] h-[80%] bg-emerald-400/15 rounded-full blur-3xl translate-x-1/3 -translate-y-1/4 pointer-events-none animate-float" style="animation-duration: 7s;"></div>
      <div class="absolute bottom-0 left-0 w-[60%] h-[60%] bg-teal-500/15 rounded-full blur-3xl -translate-x-1/4 translate-y-1/4 pointer-events-none animate-float" style="animation-duration: 9s; animation-delay: 1s;"></div>
      <div class="absolute top-1/2 left-[30%] w-[50%] h-[50%] bg-secondary/15 rounded-full blur-3xl -translate-y-1/2 pointer-events-none"></div>

      <div class="absolute -right-20 -bottom-20 w-72 h-72 border border-white/20 rounded-[3rem] bg-gradient-to-br from-white/10 to-transparent backdrop-blur-sm pointer-events-none transform rotate-12"></div>
      <div class="absolute -left-16 -top-16 w-64 h-64 border border-white/10 rounded-full bg-gradient-to-tr from-white/5 to-transparent backdrop-blur-md pointer-events-none"></div>
      
      <div class="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cpath d=\'M36 34v-4h-4v-4h4v-4h4v4h4v4h-4v4h-4zm-8 8v-4h-4v-4h4v-4h4v4h-4v4h-4zm-8 0v-4h-4v-4h4v-4h4v4h-4v4h-4zm16 8v-4h-4v-4h4v-4h4v4h-4v4h-4z\' fill=\'%23ffffff\' fill-opacity=\'0.04\'/%3E%3C/g%3E%3C/svg%3E')] opacity-80 pointer-events-none mix-blend-overlay"></div>

      <div class="absolute top-8 left-1/4 w-1.5 h-1.5 bg-amber-300 rounded-full animate-ping pointer-events-none" style="animation-duration: 3s"></div>
      <div class="absolute bottom-1/3 right-1/4 w-2 h-2 bg-teal-300 rounded-full animate-pulse pointer-events-none" style="animation-duration: 4s"></div>
      <div class="absolute top-[40%] left-6 text-white/20 text-[10px] animate-bounce pointer-events-none" style="animation-duration: 5s">✦</div>
      <div class="absolute top-1/4 right-12 text-amber-400/30 text-sm animate-pulse pointer-events-none" style="animation-duration: 6s">✧</div>

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
            <span class="text-white/90 text-[10px] font-black tracking-[0.2em] uppercase">Laporan Keuangan</span>
          </div>
          <div class="w-11 h-11 bg-white/10 rounded-full flex items-center justify-center backdrop-blur-xl border border-white/20 shadow-[0_0_15px_rgba(255,255,255,0.1)] group-hover:scale-110 transition-transform duration-500">
            <FileTextIcon class="w-5 h-5 text-secondary drop-shadow-md" />
          </div>
        </div>
        
        <div>
          <p class="text-xs sm:text-sm text-teal-100/70 font-semibold tracking-wide uppercase mb-1">Total Kas Qurban Terkumpul</p>
          <h2 class="text-4xl sm:text-5xl font-black text-white font-heading drop-shadow-lg tracking-tight">
            {{ formatRp(store.totalCollected) }}
          </h2>
          <div class="flex items-center space-x-2 mt-3">
            <span class="text-[10px] sm:text-xs bg-secondary/20 text-secondary-light px-3 py-1.5 rounded-full font-extrabold border border-secondary/30 backdrop-blur-md shadow-sm flex items-center">
              <TrendingUpIcon class="w-3.5 h-3.5 mr-1.5 opacity-90" />
              Periode Aktif
            </span>
            <p class="text-[10px] sm:text-xs text-teal-200/80 font-medium ml-2">Diperbarui secara real-time</p>
          </div>
        </div>
      </div>
    </div>

    <div class="grid grid-cols-3 gap-2.5 sm:gap-4 quick-stats">
      <div class="bg-white dark:bg-white/[0.03] border-[2px] border-gray-300 dark:border-white/10 rounded-[1.2rem] sm:rounded-2xl p-3 sm:p-4 flex flex-col items-center sm:items-start sm:flex-row sm:justify-between shadow-sm hover:shadow-md transition-all duration-300 relative overflow-hidden group">
        <div class="absolute right-[-10px] top-[-10px] opacity-[0.03] dark:opacity-5 group-hover:scale-110 transition-transform duration-500 pointer-events-none hidden sm:block">
          <WalletIcon class="w-32 h-32" />
        </div>
        <div class="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-primary/10 dark:bg-primary/20 flex items-center justify-center text-primary dark:text-primary-light shrink-0 mb-1 sm:mb-0">
          <WalletIcon class="w-4 h-4 sm:w-5 sm:h-5" />
        </div>
        <div class="text-center sm:text-right w-full sm:w-auto">
          <p class="text-[8px] sm:text-[9px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-0.5 truncate">Terkumpul</p>
          <p class="text-xs sm:text-lg font-black text-gray-800 dark:text-white leading-none font-heading truncate">{{ formatRp(store.totalCollected) }}</p>
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
          <p class="text-xs sm:text-lg font-black text-gray-800 dark:text-white leading-none font-heading">{{ store.totalLunas }} / {{ store.shohibuls.length }}</p>
        </div>
      </div>

      <div class="bg-white dark:bg-white/[0.03] border-[2px] border-gray-300 dark:border-white/10 rounded-[1.2rem] sm:rounded-2xl p-3 sm:p-4 flex flex-col items-center sm:items-start sm:flex-row sm:justify-between shadow-sm hover:shadow-md transition-all duration-300 relative overflow-hidden group">
        <div class="absolute right-[-10px] top-[-10px] opacity-[0.03] dark:opacity-5 group-hover:scale-110 transition-transform duration-500 pointer-events-none hidden sm:block">
          <PieChartIcon class="w-32 h-32" />
        </div>
        <div class="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center text-amber-600 dark:text-amber-400 shrink-0 mb-1 sm:mb-0">
          <PieChartIcon class="w-4 h-4 sm:w-5 sm:h-5" />
        </div>
        <div class="text-center sm:text-right w-full sm:w-auto">
          <p class="text-[8px] sm:text-[9px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-0.5 truncate">Progress</p>
          <p class="text-xs sm:text-lg font-black text-gray-800 dark:text-white leading-none font-heading">{{ store.averageProgress }}%</p>
        </div>
      </div>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-5 statistics-split pt-1">
      
      <div class="bg-white dark:bg-white/[0.02] border-[1.5px] border-gray-200 dark:border-white/10 rounded-[1.5rem] p-4 sm:p-5 shadow-sm flex flex-col gap-3">
        <div class="flex justify-between items-center px-1">
          <h4 class="text-sm font-bold text-gray-800 dark:text-white font-heading flex items-center">
            <TrophyIcon class="w-4 h-4 mr-1.5 text-secondary" />
            Top Tabungan
          </h4>
        </div>
        
        <div class="space-y-3">
          <template v-for="(top, index) in topSavers" :key="top.name">
            <div class="group">
              <div class="flex items-center space-x-3 mb-1.5">
                <div class="w-5 h-5 rounded-full flex items-center justify-center text-[9px] font-bold shrink-0 shadow-sm"
                     :class="index === 0 ? 'bg-gradient-to-br from-yellow-300 to-yellow-600 text-white shadow-yellow-500/50' : 
                             index === 1 ? 'bg-gradient-to-br from-gray-300 to-gray-500 text-white shadow-gray-500/50' :
                             index === 2 ? 'bg-gradient-to-br from-orange-300 to-orange-700 text-white shadow-orange-500/50' :
                             'bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400 border border-gray-200 dark:border-gray-700'">
                  {{ index + 1 }}
                </div>
                <div class="flex-1 flex justify-between items-end">
                  <span class="text-xs font-bold text-gray-700 dark:text-gray-200 truncate group-hover:text-primary dark:group-hover:text-primary-light transition-colors">{{ top.name }}</span>
                  <span class="text-xs font-bold text-gray-900 dark:text-white">{{ formatRp(top.amount) }}</span>
                </div>
              </div>
              <div class="w-full h-1.5 bg-gray-100 dark:bg-white/5 rounded-full overflow-hidden shadow-inner ml-8" style="width: calc(100% - 2rem)">
                <div 
                  class="h-full rounded-full transition-all duration-1000 ease-out" 
                  :class="index === 0 ? 'bg-gradient-to-r from-yellow-400 to-yellow-600 shadow-[0_0_8px_rgba(234,179,8,0.5)]' : 'bg-gradient-to-r from-primary to-primary-light'"
                  :style="{ width: (top.target > 0 ? (top.amount / top.target) * 100 : 0) + '%' }"
                ></div>
              </div>
            </div>
            <div v-if="index !== topSavers.length - 1" class="h-[1px] mx-8 bg-gray-100 dark:bg-white/5 mt-2 mb-1"></div>
          </template>
        </div>
      </div>
 
      <div class="bg-white dark:bg-white/[0.02] border-[1.5px] border-gray-200 dark:border-white/10 rounded-[1.5rem] p-4 sm:p-5 shadow-sm flex flex-col gap-4">
        <div class="flex justify-between items-center px-1">
          <h4 class="text-sm font-bold text-gray-800 dark:text-white font-heading flex items-center">
            <TargetIcon class="w-4 h-4 mr-1.5 text-primary dark:text-primary-light" />
            Target Hewan
          </h4>
        </div>

        <div class="space-y-4">
          <div class="space-y-2.5 p-3.5 rounded-xl bg-gray-50 dark:bg-white/[0.03] border border-gray-100 dark:border-white/5 transition-all hover:border-primary/30">
            <div class="flex justify-between items-center">
              <div class="flex items-center space-x-2">
                <div class="w-7 h-7 rounded-lg bg-white dark:bg-gray-800 shadow-sm flex items-center justify-center text-sm">🐄</div>
                <div>
                  <span class="block text-xs font-bold text-gray-800 dark:text-white">Sapi Qurban</span>
                  <span class="block text-[9px] text-gray-500 dark:text-gray-400">Target: {{ Math.ceil(store.sapiCount / 7) }} Ekor ({{ store.sapiCount }} Shohibul)</span>
                </div>
              </div>
              <div class="text-right">
                <span class="block text-xs font-black text-primary dark:text-primary-light">{{ store.sapiLunasCount }} / {{ store.sapiCount }}</span>
                <span class="block text-[8px] font-bold text-gray-400 uppercase tracking-wider">Slot Lunas</span>
              </div>
            </div>
            <div class="w-full h-2 bg-gray-200 dark:bg-white/10 rounded-full overflow-hidden shadow-inner">
              <div 
                class="h-full rounded-full transition-all duration-1000 ease-out"
                :class="store.sapiLunasCount > 0 ? 'bg-gradient-to-r from-emerald-500 to-teal-400 shadow-[0_0_8px_rgba(16,185,129,0.4)]' : 'bg-transparent'" 
                :style="{ width: (store.sapiCount > 0 ? (store.sapiLunasCount / store.sapiCount) * 100 : 0) + '%' }"
              ></div>
            </div>
          </div>

          <div class="space-y-2.5 p-3.5 rounded-xl bg-gray-50 dark:bg-white/[0.03] border border-gray-100 dark:border-white/5 transition-all hover:border-secondary/30">
            <div class="flex justify-between items-center">
              <div class="flex items-center space-x-2">
                <div class="w-7 h-7 rounded-lg bg-white dark:bg-gray-800 shadow-sm flex items-center justify-center text-sm">🐐</div>
                <div>
                  <span class="block text-xs font-bold text-gray-800 dark:text-white">Kambing Qurban</span>
                  <span class="block text-[9px] text-gray-500 dark:text-gray-400">Target: {{ store.kambingCount }} Ekor</span>
                </div>
              </div>
              <div class="text-right">
                <span class="block text-xs font-black text-secondary">{{ store.kambingLunasCount }} / {{ store.kambingCount }}</span>
                <span class="block text-[8px] font-bold text-gray-400 uppercase tracking-wider">Slot Lunas</span>
              </div>
            </div>
            <div class="w-full h-2 bg-gray-200 dark:bg-white/10 rounded-full overflow-hidden shadow-inner">
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

    <div class="space-y-3 groups-widget mt-2">
      <div class="flex justify-between items-center px-1">
        <h4 class="text-sm font-bold text-gray-800 dark:text-white font-heading">Kelompok Sapi Qurban</h4>
        <span class="px-2.5 py-1 bg-primary/10 dark:bg-white/5 text-primary dark:text-primary-light text-[9px] font-bold rounded-full">1 Slot = 1/7 Sapi</span>
      </div>

      <div class="flex overflow-x-auto snap-x snap-mandatory gap-3 sm:gap-4 pb-2 -mx-4 px-4 sm:mx-0 sm:px-0 lg:grid lg:grid-cols-2 lg:overflow-visible custom-scrollbar">
        
        <div 
          v-for="(group, gIdx) in sapiGroups" 
          :key="group.name"
          class="min-w-[85vw] sm:min-w-[320px] lg:min-w-0 snap-center bg-white dark:bg-white/[0.02] border-[1.5px] border-gray-200 dark:border-white/10 rounded-[1.5rem] p-4 shadow-sm space-y-3 shrink-0 transition-all"
        >
          <div class="flex justify-between items-center pb-2 border-b border-gray-100 dark:border-white/5">
            <span class="text-xs font-black text-gray-800 dark:text-white flex items-center">
              <span class="mr-1.5 text-sm">🐄</span> {{ group.name }}
            </span>
            <span 
              class="px-2 py-0.5 rounded text-[8px] font-black uppercase tracking-wider"
              :class="gIdx % 2 === 0 ? 'bg-emerald-100 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400' : 'bg-amber-100 dark:bg-amber-950/40 text-amber-700 dark:text-amber-400'"
            >
              {{ group.members.length }} / 7 Slot
            </span>
          </div>

          <div class="space-y-1">
            <div 
              v-for="(member, idx) in group.members" 
              :key="member.id"
              class="flex justify-between items-center text-xs py-1.5 px-2 rounded-lg hover:bg-gray-50 dark:hover:bg-white/[0.03] transition-colors"
            >
              <div class="flex items-center space-x-2.5">
                <span class="w-4 h-4 rounded bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-[8px] font-bold text-gray-500">{{ idx + 1 }}</span>
                <div class="flex flex-col">
                  <span class="font-bold text-gray-800 dark:text-gray-200">{{ member.name }}</span>
                  <span class="text-[8px] text-gray-500 dark:text-gray-400 font-semibold mt-0.5">{{ formatRp(member.collected) }} / {{ formatRp(member.target) }}</span>
                </div>
              </div>
              <span 
                class="px-1.5 py-0.5 rounded text-[8px] font-bold uppercase tracking-wider"
                :class="member.collected >= member.target ? 'bg-green-100 dark:bg-green-950/40 text-green-700 dark:text-green-400' : 'bg-amber-100 dark:bg-amber-950/40 text-amber-700 dark:text-amber-400'"
              >
                {{ member.collected >= member.target ? 'Lunas' : 'Belum Lunas' }}
              </span>
              </div>
            
            <div 
              v-for="i in Math.max(0, 7 - group.members.length)" 
              :key="'empty-'+gIdx+'-'+i" 
              class="flex justify-between items-center text-xs py-1.5 px-2 rounded-lg border border-dashed border-gray-200 dark:border-white/10 text-gray-400 dark:text-gray-500"
            >
              <div class="flex items-center space-x-2.5">
                <span class="w-4 h-4 rounded border border-dashed border-gray-300 dark:border-gray-600 flex items-center justify-center text-[8px] font-bold">{{ group.members.length + i }}</span>
                <span class="italic font-medium text-[10px]">Slot Kosong</span>
              </div>
              <span class="text-[8px] font-bold uppercase bg-gray-50 dark:bg-gray-800 px-1.5 py-0.5 rounded text-gray-400">Tersedia</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="space-y-3 recent-payments-list mt-2">
      <div class="flex justify-between items-center px-1">
        <h4 class="text-sm font-bold text-gray-800 dark:text-white font-heading">Aktivitas Terbaru</h4>
      </div>

      <div class="bg-white dark:bg-white/[0.02] border-[1.5px] border-gray-200 dark:border-white/10 rounded-[1.5rem] p-1.5 shadow-sm">
        <div class="flex flex-col max-h-[350px] overflow-y-auto pr-1 custom-scrollbar">
          <template v-for="(tx, index) in store.transactions" :key="tx.id">
            <div @click="openReceiptModal(tx)" class="flex justify-between items-center py-2.5 px-3 rounded-[1rem] hover:bg-gray-50 dark:hover:bg-white/[0.04] transition-all duration-300 cursor-pointer group">
              <div class="flex items-center space-x-3 sm:space-x-4">
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
                <span class="block text-sm sm:text-[15px] font-bold text-gray-800 dark:text-white">{{ formatRp(tx.amount) }}</span>
                <span v-if="tx.status === 'success'" class="inline-block px-2 py-0.5 mt-1 bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400 text-[8px] font-bold rounded-md uppercase tracking-widest border border-green-200/50 dark:border-green-800/30">Sukses</span>
                <span v-else class="inline-block px-2 py-0.5 mt-1 bg-amber-50 dark:bg-amber-900/20 text-amber-600 dark:text-amber-400 text-[8px] font-bold rounded-md uppercase tracking-widest border border-amber-200/50 dark:border-amber-800/30">Pending</span>
              </div>
            </div>
            
            <div v-if="index !== store.transactions.length - 1" class="h-[1px] mx-3 bg-gray-200 dark:bg-white/5 my-0.5"></div>
          </template>
        </div>
      </div>
    </div>

    <!-- Receipt Modal -->
    <div v-if="isReceiptModalOpen" class="fixed inset-0 bg-black/60 backdrop-blur-sm z-[70] flex flex-col justify-end modal-backdrop" style="margin: 0; padding: 0;">
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

  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { useQurbanStore } from '@/stores/qurban'
import gsap from 'gsap'
import { FileTextIcon, TrendingUpIcon, WalletIcon, CheckCircleIcon, PieChartIcon, TrophyIcon, TargetIcon, ClockIcon } from 'lucide-vue-next'

const store = useQurbanStore()
const router = useRouter()
const containerRef = ref(null)
let ctx

const formatRp = (val) => {
  if (!val) return 'Rp. 0'
  return 'Rp. ' + new Intl.NumberFormat('id-ID').format(val)
}

const topSavers = computed(() => {
  return [...store.shohibuls]
    .filter(s => s.collected > 0)
    .sort((a, b) => b.collected - a.collected)
    .slice(0, 5)
    .map(s => ({
      name: s.name,
      amount: s.collected,
      target: s.target
    }))
})

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

const isReceiptModalOpen = ref(false)
const selectedTx = ref(null)

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
    document.body.style.overflow = ''
    setTimeout(() => { selectedTx.value = null }, 300)
  }})
}

const continuePayment = () => {
  if (selectedTx.value && selectedTx.value.shohibulId) {
    const shohibulId = selectedTx.value.shohibulId
    closeReceiptModal()
    router.push({ path: '/menabung', query: { shohibulId: shohibulId } })
  }
}

onMounted(() => {
  ctx = gsap.context(() => {
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })
    
    tl.from('.hero-card', { opacity: 0, y: -20, duration: 0.6 })
      .from('.statistics-split > div', { opacity: 0, y: 20, stagger: 0.15, duration: 0.5 }, '-=0.3')
      .from('.groups-widget', { opacity: 0, y: 20, duration: 0.5 }, '-=0.3')
      .from('.recent-payments-list', { opacity: 0, y: 30, duration: 0.5 }, '-=0.2')
  }, containerRef.value)
})

onUnmounted(() => {
  if (ctx) ctx.revert()
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
</style>