<template>
  <div class="space-y-3 sm:space-y-4 pb-2" ref="containerRef">
    <StaleBanner :visible="store.isFromCache" @refresh="store.fetchDashboard()" />

    <!-- Loading state -->
    <template v-if="store.loading.dashboard && !store.dashboardStats">
      <LoadingSkeleton variant="hero" />
      <LoadingSkeleton variant="stats" />
      <LoadingSkeleton variant="card" :count="2" />
    </template>

    <!-- Error state -->
    <template v-else-if="store.error.dashboard && !store.dashboardStats">
      <RetryError :message="store.error.dashboard" @retry="store.fetchDashboard()" />
    </template>

    <!-- Data loaded -->
    <template v-else>
    <div class="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-[#022c22] via-[#064e3b] to-[#0f766e] text-white p-6 sm:p-8 shadow-[0_15px_40px_-10px_rgba(2,44,34,0.7)] border border-white/10 hero-card flex flex-col min-h-[220px] group">
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
            <span class="text-white/90 text-[10px] font-bold tracking-[0.2em] uppercase">Laporan Keuangan</span>
          </div>
          <div class="w-11 h-11 bg-white/10 rounded-full flex items-center justify-center backdrop-blur-xl border border-white/20 shadow-[0_0_15px_rgba(255,255,255,0.1)] group-hover:scale-110 transition-transform duration-500">
            <FileTextIcon class="w-5 h-5 text-secondary drop-shadow-md" />
          </div>
        </div>
        
        <div>
          <p class="text-xs sm:text-sm text-teal-100/70 font-semibold tracking-wide uppercase mb-1">Total Kas Qurban Terkumpul</p>
          <h2 class="text-4xl sm:text-5xl font-bold text-white font-heading drop-shadow-lg tracking-tight">
            {{ formatRp(store.totalCollected) }},-
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

    <!-- UNIFIED QUICK STATS CARD -->
    <div class="bg-white dark:bg-white/[0.03] border-[2px] border-gray-300 dark:border-white/10 rounded-[1.5rem] p-3.5 sm:p-5 shadow-sm hover:shadow-md transition-all duration-300 quick-stats">
      <div class="grid grid-cols-3 divide-x divide-gray-300 dark:divide-white/10">
        
        <!-- Terkumpul Stats -->
        <div class="flex flex-col items-center justify-center text-center px-1 group overflow-hidden">
          <div class="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-primary/10 dark:bg-primary/20 flex items-center justify-center text-primary dark:text-primary-light mb-1.5 group-hover:scale-110 transition-transform shrink-0">
            <WalletIcon class="w-4 h-4 sm:w-5 sm:h-5" />
          </div>
          <p class="text-[8px] sm:text-[9px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-0.5 truncate w-full">Terkumpul</p>
          <p class="text-[10px] sm:text-sm font-bold text-gray-800 dark:text-white leading-none font-heading mb-0.5 truncate w-full" :title="formatRp(store.totalCollected)">{{ formatRp(store.totalCollected) }}</p>
        </div>

        <!-- Lunas Stats -->
        <div class="flex flex-col items-center justify-center text-center px-1 group overflow-hidden">
          <div class="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-green-100 dark:bg-green-900/30 flex items-center justify-center text-green-600 dark:text-green-400 mb-1.5 group-hover:scale-110 transition-transform shrink-0">
            <CheckCircleIcon class="w-4 h-4 sm:w-5 sm:h-5" />
          </div>
          <p class="text-[8px] sm:text-[9px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-0.5 truncate w-full">Lunas</p>
          <p class="text-[11px] sm:text-sm font-bold text-gray-800 dark:text-white leading-none font-heading mb-0.5 truncate w-full">{{ store.totalLunas }} / {{ store.shohibuls.length }}</p>
        </div>

        <!-- Progress Stats -->
        <div class="flex flex-col items-center justify-center text-center px-1 group overflow-hidden">
          <div class="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center text-amber-600 dark:text-amber-400 mb-1.5 group-hover:scale-110 transition-transform shrink-0">
            <PieChartIcon class="w-4 h-4 sm:w-5 sm:h-5" />
          </div>
          <p class="text-[8px] sm:text-[9px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-0.5 truncate w-full">Progress</p>
          <p class="text-[11px] sm:text-sm font-bold text-gray-800 dark:text-white leading-none font-heading mb-0.5 truncate w-full">{{ averageProgress }}%</p>
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
          <template v-if="topSavers.length > 0">
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
              <div v-if="index !== topSavers.length - 1" class="border-b border-dashed border-gray-200 dark:border-white/10 mx-8 mt-2 mb-1"></div>
            </template>
          </template>
          <div v-else class="text-center py-6 text-gray-400 dark:text-gray-500">
            <TrophyIcon class="w-8 h-8 mx-auto mb-2 opacity-30" />
            <p class="text-xs font-bold">Belum ada data tabungan</p>
          </div>
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
                <span class="block text-xs font-bold text-primary dark:text-primary-light">{{ sapiLunasCount }} / {{ store.sapiCount }}</span>
                <span class="block text-[8px] font-bold text-gray-400 uppercase tracking-wider">Slot Lunas</span>
              </div>
            </div>
            <div class="w-full h-2 bg-gray-200 dark:bg-white/10 rounded-full overflow-hidden shadow-inner">
              <div 
                class="h-full rounded-full transition-all duration-1000 ease-out"
                :class="sapiLunasCount > 0 ? 'bg-gradient-to-r from-emerald-500 to-teal-400 shadow-[0_0_8px_rgba(16,185,129,0.4)]' : 'bg-transparent'" 
                :style="{ width: (store.sapiCount > 0 ? (sapiLunasCount / store.sapiCount) * 100 : 0) + '%' }"
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
                <span class="block text-xs font-bold text-secondary">{{ kambingLunasCount }} / {{ store.kambingCount }}</span>
                <span class="block text-[8px] font-bold text-gray-400 uppercase tracking-wider">Slot Lunas</span>
              </div>
            </div>
            <div class="w-full h-2 bg-gray-200 dark:bg-white/10 rounded-full overflow-hidden shadow-inner">
              <div 
                class="h-full rounded-full transition-all duration-1000 ease-out" 
                :class="kambingLunasCount > 0 ? 'bg-gradient-to-r from-amber-500 to-yellow-400 shadow-[0_0_8px_rgba(245,158,11,0.4)]' : 'bg-transparent'"
                :style="{ width: (store.kambingCount > 0 ? (kambingLunasCount / store.kambingCount) * 100 : 0) + '%' }"
              ></div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="space-y-3 groups-widget mt-2">
      <div class="flex justify-between items-center px-1">
        <h4 class="text-base font-bold text-gray-800 dark:text-white font-heading">Daftar Sapi Qurban</h4>
        <span class="px-2.5 py-1 bg-primary/10 dark:bg-white/5 text-primary dark:text-primary-light text-[9px] font-bold rounded-full">1 Slot = 1/7 Sapi</span>
      </div>

      <div v-if="sapiGroups.length > 0" class="flex overflow-x-auto snap-x snap-mandatory gap-3 sm:gap-4 pb-2 -mx-4 px-4 sm:mx-0 sm:px-0 lg:grid lg:grid-cols-2 lg:overflow-visible custom-scrollbar">
        
        <div 
          v-for="(group, gIdx) in sapiGroups" 
          :key="group.name"
          class="min-w-[85vw] sm:min-w-[320px] lg:min-w-0 snap-center bg-white dark:bg-white/[0.02] border-[1.5px] border-gray-200 dark:border-white/10 rounded-[1.5rem] p-4 shadow-sm space-y-3 shrink-0 transition-all"
        >
          <div class="flex justify-between items-center pb-2 border-b border-gray-100 dark:border-white/5">
            <span class="text-sm font-bold text-gray-800 dark:text-white flex items-center">
              <span class="mr-1.5 text-base">🐄</span> {{ group.name }}
            </span>
            <span 
              class="px-2 py-0.5 rounded text-[8px] font-bold uppercase tracking-wider"
              :class="gIdx % 2 === 0 ? 'bg-emerald-100 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400' : 'bg-amber-100 dark:bg-amber-950/40 text-amber-700 dark:text-amber-400'"
            >
              {{ group.members.length }} / 7 Slot
            </span>
          </div>

          <div class="space-y-1">
            <div 
              v-for="(member, idx) in group.members" 
              :key="member.id"
              class="flex justify-between items-center text-sm py-2 px-2 rounded-lg hover:bg-gray-50 dark:hover:bg-white/[0.03] transition-colors"
            >
              <div class="flex items-center space-x-2.5">
                <span class="w-4 h-4 rounded bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-[8px] font-bold text-gray-500">{{ idx + 1 }}</span>
                <div class="flex flex-col">
                  <span class="font-bold text-gray-800 dark:text-gray-200">{{ member.name }}</span>
                  <span class="text-[10px] text-gray-500 dark:text-gray-400 font-semibold mt-0.5">{{ formatRp(member.collected_amount) }} / {{ formatRp(member.target_amount) }}</span>
                </div>
              </div>
              <span 
                class="px-1.5 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider"
                :class="member.is_lunas ? 'bg-green-100 dark:bg-green-950/40 text-green-700 dark:text-green-400' : 'bg-amber-100 dark:bg-amber-950/40 text-amber-700 dark:text-amber-400'"
              >
                {{ member.is_lunas ? 'Lunas' : 'Belum Lunas' }}
              </span>
              </div>
            
            <div 
              v-for="i in Math.max(0, 7 - group.members.length)" 
              :key="'empty-'+gIdx+'-'+i" 
              class="flex justify-between items-center text-sm py-2 px-2 rounded-lg border border-dashed border-gray-200 dark:border-white/10 text-gray-400 dark:text-gray-500"
            >
              <div class="flex items-center space-x-2.5">
                <span class="w-4 h-4 rounded border border-dashed border-gray-300 dark:border-gray-600 flex items-center justify-center text-[8px] font-bold">{{ group.members.length + i }}</span>
                <span class="italic font-medium text-xs">Slot Kosong</span>
              </div>
              <span class="text-[9px] font-bold uppercase bg-gray-50 dark:bg-gray-800 px-1.5 py-0.5 rounded text-gray-400">Tersedia</span>
            </div>
          </div>
        </div>
      </div>
      <div v-else class="bg-white dark:bg-white/[0.02] border-[1.5px] border-dashed border-gray-200 dark:border-white/10 rounded-[1.5rem] p-6 text-center text-gray-400 dark:text-gray-500 shadow-sm">
        <span class="text-4xl block mb-2 opacity-50">🐄</span>
        <p class="text-sm font-bold">Belum ada daftar sapi qurban</p>
      </div>
    </div>

    <div class="space-y-3 recent-payments-list mt-2">
      <div class="flex justify-between items-center px-1">
        <h4 class="text-sm font-bold text-gray-800 dark:text-white font-heading">Aktivitas Terbaru</h4>
      </div>

      <div class="bg-white dark:bg-white/[0.02] border-[1.5px] border-gray-200 dark:border-white/10 rounded-[1.5rem] p-1.5 shadow-sm">
        <div class="flex flex-col max-h-[350px] overflow-y-auto pr-1 custom-scrollbar">
          <template v-if="store.transactions.length > 0">
            <template v-for="(tx, index) in store.transactions" :key="tx.id">
              <div @click="openReceiptModal(tx)" class="flex justify-between items-center py-2.5 px-3 rounded-[1rem] hover:bg-gray-50 dark:hover:bg-white/[0.04] transition-all duration-300 cursor-pointer group">
                <div class="flex items-center space-x-3 sm:space-x-4">
                  <div 
                    class="w-10 h-10 rounded-[1rem] flex items-center justify-center font-bold text-xs shrink-0 shadow-inner text-white"
                    :style="getAvatarStyle(getTxShohibul(tx).name)"
                  >
                    {{ getInitials(getTxShohibul(tx).name) }}
                  </div>
                  <div class="flex flex-col justify-center">
                    <h5 class="text-xs font-extrabold text-gray-800 dark:text-white leading-none mb-1 group-hover:text-primary dark:group-hover:text-primary-light transition-colors">{{ getTxShohibul(tx).name }}</h5>
                    <div class="flex items-center text-[9px] font-semibold text-gray-500 dark:text-gray-400">
                      <span>{{ formatDate(tx.completed_at || tx.created_at) }}</span>
                      <span class="mx-1 text-gray-300 dark:text-gray-600">•</span>
                      <span class="text-secondary font-bold">{{ getAnimalEmoji(getTxShohibul(tx).target_type) }}</span>
                    </div>
                  </div>
                </div>
                <div class="text-right">
                  <span class="block text-sm sm:text-[15px] font-bold text-gray-800 dark:text-white">{{ formatRp(tx.amount) }}</span>
                  <span class="inline-block px-2 py-0.5 mt-1 text-[8px] font-bold rounded-md uppercase tracking-widest border" :class="getStatusBadgeClass(tx.status)">
                    {{ getStatusLabel(tx.status) }}
                  </span>
                </div>
              </div>
              
              <div v-if="index !== store.transactions.length - 1" class="border-b border-dashed border-gray-200 dark:border-white/10 mx-4 my-1"></div>
            </template>
          </template>
          <div v-else class="text-center py-8 text-gray-400 dark:text-gray-500">
            <HistoryIcon class="w-8 h-8 mx-auto mb-2 opacity-30" />
            <p class="text-xs font-bold">Belum ada aktivitas terbaru</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Receipt Modal -->
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
              <span class="text-gray-500 dark:text-gray-400 font-medium">Nomor Whatsapp</span>
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

    <BottomNav />
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted, nextTick } from 'vue'
import { useRouter } from 'vue-router'
import { useQurbanStore } from '@/stores/qurban'
import gsap from 'gsap'
import { FileTextIcon, TrendingUpIcon, WalletIcon, CheckCircleIcon, PieChartIcon, TrophyIcon, TargetIcon, ClockIcon, HistoryIcon, XCircleIcon } from 'lucide-vue-next'
import LoadingSkeleton from '@/components/ui/LoadingSkeleton.vue'
import RetryError from '@/components/ui/RetryError.vue'
import StaleBanner from '@/components/ui/StaleBanner.vue'

const store = useQurbanStore()
const router = useRouter()
const containerRef = ref(null)
let ctx

const formatRp = (val) => {
  if (!val) return 'Rp. 0'
  return 'Rp. ' + new Intl.NumberFormat('id-ID').format(val)
}

const sapiLunasCount = computed(() => store.shohibuls.filter(s => s.target_type === 'sapi' && s.is_lunas).length)
const kambingLunasCount = computed(() => store.shohibuls.filter(s => s.target_type === 'kambing' && s.is_lunas).length)

const averageProgress = computed(() => {
  if (store.shohibuls.length === 0) return 0
  const totalPct = store.shohibuls.reduce((sum, s) => {
    const target = Number(s.target_amount) || 0
    if (target === 0) return sum
    return sum + (Number(s.collected_amount) / target)
  }, 0)
  return Math.round((totalPct / store.shohibuls.length) * 100)
})

const topSavers = computed(() => {
  return [...store.shohibuls]
    .filter(s => Number(s.collected_amount) > 0)
    .sort((a, b) => Number(b.collected_amount) - Number(a.collected_amount))
    .slice(0, 5)
    .map(s => ({
      name: s.name,
      amount: Number(s.collected_amount),
      target: Number(s.target_amount)
    }))
})

const sapiGroups = computed(() => {
  const groups = {}
  store.shohibuls.forEach(member => {
    if (member.target_type === 'sapi' && member.animal_group && member.animal_group.name !== 'Belum Ditentukan') {
      const gName = member.animal_group.name
      if (!groups[gName]) {
        groups[gName] = {
           name: gName,
           members: []
        }
      }
      groups[gName].members.push(member)
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
  const shohibulId = tx.shohibul_id || tx.shohibul?.id
  const shohibulFromStore = store.shohibuls.find(s => s.id === shohibulId)
  return shohibulFromStore || tx.shohibul || {}
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

const getStatusLabel = (status) => {
  if (status === 'success' || status === 'settlement') return 'Sukses'
  if (status === 'pending') return 'Pending'
  if (['cancelled', 'expire', 'expired', 'failed', 'deny'].includes(status)) return 'Batal'
  return status
}

const getStatusBadgeClass = (status) => {
  if (status === 'success' || status === 'settlement') return 'bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400 border-green-200/50 dark:border-green-800/30'
  if (status === 'pending') return 'bg-amber-50 dark:bg-amber-900/20 text-amber-600 dark:text-amber-400 border-amber-200/50 dark:border-amber-800/30'
  if (['cancelled', 'expire', 'expired', 'failed', 'deny'].includes(status)) return 'bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 border-red-200/50 dark:border-red-800/30'
  return 'bg-gray-50 dark:bg-gray-900/20 text-gray-600 dark:text-gray-400 border-gray-200/50 dark:border-gray-800/30'
}

const getStatusTextClass = (status) => {
  if (status === 'success' || status === 'settlement') return 'text-green-600 dark:text-green-400'
  if (status === 'pending') return 'text-amber-600 dark:text-amber-400'
  if (['cancelled', 'expire', 'expired', 'failed', 'deny'].includes(status)) return 'text-red-600 dark:text-red-400'
  return 'text-gray-800 dark:text-white'
}

const getStatusIconClass = (status) => {
  if (status === 'success' || status === 'settlement') return 'bg-green-100 dark:bg-green-900/30 text-green-500'
  if (status === 'pending') return 'bg-amber-100 dark:bg-amber-900/30 text-amber-500'
  if (['cancelled', 'expire', 'expired', 'failed', 'deny'].includes(status)) return 'bg-red-100 dark:bg-red-900/30 text-red-500'
  return 'bg-gray-100 dark:bg-gray-800 text-gray-500'
}

const getStatusModalTitle = (status) => {
  if (status === 'success' || status === 'settlement') return 'Pembayaran Berhasil'
  if (status === 'pending') return 'Menunggu Pembayaran'
  if (['cancelled', 'expire', 'expired', 'failed', 'deny'].includes(status)) return 'Pembayaran Dibatalkan'
  return 'Status Transaksi'
}

const isReceiptModalOpen = ref(false)
const selectedTx = ref(null)

const openReceiptModal = (tx) => {
  selectedTx.value = tx
  isReceiptModalOpen.value = true
  document.body.style.overflow = 'hidden'
}

const closeReceiptModal = () => {
  isReceiptModalOpen.value = false
  document.body.style.overflow = ''
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
    closeReceiptModal()
    router.push({ path: '/menabung', query: { shohibulId: shohibulId } })
  }
}

onMounted(() => {
  // Ensure data is loaded
  if (store.shohibuls.length === 0) store.fetchShohibuls()
  if (store.transactions.length === 0) store.fetchTransactions()

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
