<template>
  <div class="space-y-4 sm:space-y-5 pb-2" ref="containerRef">
    
    <div class="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-[#022c22] via-[#064e3b] to-[#0f766e] text-white p-6 sm:p-8 shadow-[0_15px_40px_-10px_rgba(2,44,34,0.7)] border border-white/10 hero-card flex flex-col min-h-[180px] group">
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
            <span class="text-white/90 text-[10px] font-bold tracking-[0.2em] uppercase">Pembayaran</span>
          </div>
          <div class="w-11 h-11 bg-white/10 rounded-full flex items-center justify-center backdrop-blur-xl border border-white/20 shadow-[0_0_15px_rgba(255,255,255,0.1)] group-hover:scale-110 transition-transform duration-500">
            <WalletIcon class="w-5 h-5 text-secondary drop-shadow-md" />
          </div>
        </div>
        
        <div>
          <h2 class="text-3xl sm:text-4xl font-bold text-white font-heading drop-shadow-lg tracking-tight">
            Menabung Qurban
          </h2>
          <div class="flex items-center space-x-2 mt-4">
            <span class="text-[10px] sm:text-xs bg-secondary/20 text-secondary-light px-3 py-1.5 rounded-full font-extrabold border border-secondary/30 backdrop-blur-md shadow-sm flex items-center">
              <ZapIcon class="w-3.5 h-3.5 mr-1.5 opacity-90" />
              Instan & Mudah
            </span>
          </div>
        </div>
      </div>
    </div>

    <div class="bg-gray-200/50 dark:bg-white/5 p-1.5 rounded-[1.2rem] flex tab-toggle w-full border border-gray-200/30 dark:border-white/5 relative shadow-inner">
      <button 
        @click="formMode = 'setor'"
        class="flex-1 py-3 text-xs sm:text-sm font-bold rounded-xl transition-all duration-300 cursor-pointer relative z-10"
        :class="formMode === 'setor' ? 'text-primary dark:text-primary-light' : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'"
      >
        Setoran Shohibul
      </button>
      <button 
        @click="formMode = 'register'"
        class="flex-1 py-3 text-xs sm:text-sm font-bold rounded-xl transition-all duration-300 cursor-pointer relative z-10"
        :class="formMode === 'register' ? 'text-primary dark:text-primary-light' : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'"
      >
        Daftar Shohibul Baru
      </button>
      <div 
        class="absolute top-1.5 bottom-1.5 w-[calc(50%-0.375rem)] bg-white dark:bg-gray-800 border-[2px] border-gray-300 dark:border-white/10 rounded-xl shadow-md transition-transform duration-300 ease-out"
        :class="formMode === 'setor' ? 'translate-x-0' : 'translate-x-[calc(100%+0.375rem)]'"
      ></div>
    </div>

    <div class="w-full form-panels space-y-3">
      
      <div class="space-y-3">
        <div class="bg-white dark:bg-white/[0.02] border-[2px] border-gray-300 dark:border-white/10 rounded-[1.5rem] sm:rounded-[2rem] p-4 sm:p-5 shadow-md space-y-3 relative overflow-hidden">
          
          <div class="flex items-center space-x-2 text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest mb-1">
            <UserIcon class="w-4 h-4 text-primary dark:text-primary-light" />
            <span>Data Shohibul</span>
          </div>
          
          <transition mode="out-in" enter-active-class="transition duration-300 ease-out" enter-from-class="opacity-0 translate-x-4" enter-to-class="opacity-100 translate-x-0" leave-active-class="transition duration-200 ease-in" leave-from-class="opacity-100 translate-x-0" leave-to-class="opacity-0 -translate-x-4">
            
            <div v-if="formMode === 'setor'" class="space-y-4">
              <div 
                @click="openShohibulModal"
                class="w-full bg-gray-50 dark:bg-white/[0.03] text-sm border-[2px] border-gray-300 dark:border-white/10 rounded-[1.5rem] px-5 py-4 font-bold text-gray-800 dark:text-white transition-all hover:border-primary/50 dark:hover:border-white/20 cursor-pointer flex justify-between items-center group shadow-sm hover:shadow-md"
              >
                <div class="flex items-center space-x-3 truncate">
                  <div v-if="selectedShohibulData" class="flex flex-col">
                    <span class="truncate font-extrabold">{{ selectedShohibulData.name }}</span>
                    <span class="text-[10px] text-gray-500 font-semibold mt-0.5 truncate">{{ selectedShohibulData.address || 'Alamat tidak diketahui' }}</span>
                  </div>
                  <span v-else class="text-gray-400">— Pilih shohibul yang terdaftar —</span>
                </div>
                <div class="text-gray-400 pointer-events-none group-hover:text-primary transition-colors">
                  <ChevronDownIcon class="w-5 h-5" />
                </div>
              </div>
              
              <transition
                enter-active-class="transition duration-300 ease-out"
                enter-from-class="opacity-0 -translate-y-2"
                enter-to-class="opacity-100 translate-y-0"
                leave-active-class="transition duration-200 ease-in"
                leave-from-class="opacity-100 translate-y-0"
                leave-to-class="opacity-0 -translate-y-2"
              >
                <div v-if="selectedShohibulData" class="flex items-center bg-gray-50 dark:bg-white/[0.02] rounded-xl p-3 border-[1.5px] border-gray-200/80 dark:border-white/10 shadow-sm w-full relative overflow-hidden group">
                   <div class="absolute -left-4 -bottom-4 w-16 h-16 bg-primary/5 rounded-full blur-xl pointer-events-none"></div>
                   <div class="flex-1 border-r border-gray-200 dark:border-white/10 text-center pr-2 relative z-10">
                     <div class="text-[9px] text-gray-400 uppercase tracking-widest font-bold mb-1">Sudah Menabung</div>
                     <div class="text-xs font-bold text-primary dark:text-primary-light">{{ formatRp(selectedShohibulData.collected_amount) }}</div>
                   </div>
                   <div class="flex-1 text-center pl-2 relative z-10">
                     <div class="text-[9px] text-gray-400 uppercase tracking-widest font-bold mb-1">Kekurangan</div>
                     <div class="text-xs font-bold text-amber-600 dark:text-amber-400">{{ formatRp(selectedShohibulData.target_amount - selectedShohibulData.collected_amount) }}</div>
                   </div>
                </div>
              </transition>
            </div>
            
            <div v-else class="space-y-3">
              <input 
                v-model="registerForm.name" 
                type="text" 
                placeholder="Nama Lengkap" 
                class="w-full bg-gray-50 dark:bg-white/[0.03] text-sm border-[2px] border-gray-300 dark:border-white/10 rounded-[1.2rem] px-5 py-3.5 font-bold focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent dark:text-white transition-all shadow-sm"
              />
              <input 
                v-model="registerForm.phone" 
                type="tel" 
                placeholder="Nomor WhatsApp" 
                class="w-full bg-gray-50 dark:bg-white/[0.03] text-sm border-[2px] border-gray-300 dark:border-white/10 rounded-[1.2rem] px-5 py-3.5 font-bold focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent dark:text-white transition-all shadow-sm"
              />
              <input 
                v-model="registerForm.address" 
                type="text" 
                placeholder="Alamat / Blok Perumahan" 
                class="w-full bg-gray-50 dark:bg-white/[0.03] text-sm border-[2px] border-gray-300 dark:border-white/10 rounded-[1.2rem] px-5 py-3.5 font-bold focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent dark:text-white transition-all shadow-sm"
              />
              
              <div class="grid grid-cols-2 gap-3 pt-1">
                <div 
                  @click="registerForm.type = 'kambing'" 
                  class="rounded-xl p-2.5 text-center cursor-pointer transition-all duration-300 font-bold text-sm select-none flex flex-col items-center justify-center"
                  :class="registerForm.type === 'kambing' ? 'border-[2px] border-primary bg-primary/10 text-primary dark:text-primary-light shadow-md' : 'border-[2px] border-gray-300 dark:border-white/10 text-gray-500 hover:bg-gray-50 hover:border-primary/50 dark:hover:bg-white/5 shadow-sm hover:shadow-md'"
                >
                  <div><span class="text-lg mr-1">🐐</span> Kambing</div>
                  <div class="text-[10px] font-bold opacity-80 mt-0.5" :class="registerForm.type === 'kambing' ? 'text-primary dark:text-primary-light' : 'text-gray-400'">{{ formatRp(store.animalPrices.kambing) }}</div>
                </div>
                <div 
                  @click="registerForm.type = 'sapi'" 
                  class="rounded-xl p-2.5 text-center cursor-pointer transition-all duration-300 font-bold text-sm select-none flex flex-col items-center justify-center"
                  :class="registerForm.type === 'sapi' ? 'border-[2px] border-primary bg-primary/10 text-primary dark:text-primary-light shadow-md' : 'border-[2px] border-gray-300 dark:border-white/10 text-gray-500 hover:bg-gray-50 hover:border-primary/50 dark:hover:bg-white/5 shadow-sm hover:shadow-md'"
                >
                  <div><span class="text-lg mr-1">🐄</span> Sapi</div>
                  <div class="text-[10px] font-bold opacity-80 mt-0.5" :class="registerForm.type === 'sapi' ? 'text-primary dark:text-primary-light' : 'text-gray-400'">{{ formatRp(store.animalPrices.sapi) }}</div>
                </div>
              </div>
              
              <div class="flex items-start space-x-2 bg-amber-50 dark:bg-amber-900/20 p-3 rounded-xl border border-amber-200/50 dark:border-amber-800/30 mt-2">
                <InfoIcon class="w-4 h-4 text-amber-600 dark:text-amber-500 shrink-0 mt-0.5" />
                <p class="text-[10px] leading-relaxed text-amber-700 dark:text-amber-400 font-semibold">
                  Pendaftaran baru mewajibkan setoran awal minimal <strong class="font-bold">Rp. 50.000</strong> untuk mengamankan (booking) slot hewan qurban Anda.
                </p>
              </div>
            </div>
          </transition>
        </div>

        <div class="bg-white dark:bg-white/[0.02] border-[2px] border-gray-300 dark:border-white/10 rounded-[1.5rem] sm:rounded-[2rem] p-4 sm:p-5 shadow-md space-y-4">
          <div class="flex items-center justify-between">
            <div class="flex items-center space-x-2 text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest">
              <CoinsIcon class="w-4 h-4 text-secondary" />
              <span>Pilih Nominal Setoran</span>
            </div>
            
            <button type="button" @click.prevent="isCalculatorModalOpen = true" class="text-[10px] sm:text-xs font-bold text-primary dark:text-primary-light flex items-center bg-primary/10 px-2.5 py-1.5 rounded-lg hover:bg-primary/20 transition-colors shadow-sm">
              <CalculatorIcon class="w-3.5 h-3.5 mr-1.5" />
              Kalkulator
            </button>
          </div>

          <div class="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-2.5">
            <button 
              v-for="preset in nominalPresets" 
              :key="preset.value"
              type="button"
              @click="selectPreset(preset.value)"
              class="rounded-[1.2rem] p-3 text-center cursor-pointer transition-all duration-300 select-none flex flex-col items-center justify-center space-y-1.5 group"
              :class="form.amount === preset.value && !isCustomAmountSelected
                ? 'border-[2px] border-primary bg-primary/10 dark:bg-primary/20 text-primary dark:text-primary-light font-bold shadow-lg scale-[1.03]' 
                : 'border-[2px] border-gray-300 dark:border-white/10 bg-white dark:bg-white/[0.02] text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-white/[0.05] hover:border-primary/50 font-bold shadow-md hover:shadow-lg'"
            >
              <component :is="getPresetIcon(preset.value)" class="w-6 h-6 sm:w-7 sm:h-7 transition-transform duration-300 group-hover:scale-110" />
              <span class="text-[11px] sm:text-xs text-gray-700 dark:text-gray-300 font-bold tracking-widest">{{ formatRp(preset.value) }}</span>
            </button>
          </div>

          <div 
            @click="activateCustomAmount"
            class="rounded-[1.2rem] p-3 sm:p-3.5 mt-2.5 cursor-pointer transition-all duration-300 select-none flex items-center justify-between"
            :class="isCustomAmountSelected 
              ? 'border-[2px] border-primary bg-primary/10 dark:bg-primary/20 shadow-lg scale-[1.02]' 
              : 'border-[2px] border-gray-300 dark:border-white/10 bg-white dark:bg-white/[0.02] hover:bg-gray-50 dark:hover:bg-white/[0.05] shadow-md hover:shadow-lg hover:border-primary/50'"
          >
            <div class="flex items-center space-x-3 text-left">
              <div class="w-10 h-10 rounded-full bg-gray-100 dark:bg-white/5 flex items-center justify-center text-gray-500 dark:text-gray-400">
                <Edit3Icon class="w-5 h-5" />
              </div>
              <div>
                <span class="text-xs sm:text-sm font-extrabold text-gray-800 dark:text-white block">Nominal Lain</span>
                <span class="text-[9px] sm:text-[10px] text-gray-400 dark:text-gray-500 font-semibold">Kelipatan Rp. 50.000</span>
              </div>
            </div>
            <div 
              class="w-6 h-6 rounded-full flex items-center justify-center text-white text-xs transition-colors"
              :class="isCustomAmountSelected ? 'bg-primary' : 'bg-gray-200 dark:bg-gray-700'"
            >
              <CheckIcon v-if="isCustomAmountSelected" class="w-3.5 h-3.5" />
            </div>
          </div>

          <transition 
            enter-active-class="transition duration-300 ease-out" 
            enter-from-class="transform -translate-y-4 opacity-0" 
            enter-to-class="transform translate-y-0 opacity-100" 
            leave-active-class="transition duration-200 ease-in" 
            leave-from-class="transform translate-y-0 opacity-100" 
            leave-to-class="transform -translate-y-4 opacity-0"
          >
            <div v-if="isCustomAmountSelected" class="pt-2">
              <div class="relative">
                <span class="absolute left-5 top-1/2 -translate-y-1/2 text-sm font-bold transition-colors" :class="amountErrorMessage ? 'text-red-400' : 'text-gray-400'">Rp. </span>
                <input 
                  v-model.number="form.amount" 
                  type="number" 
                  placeholder="Masukkan nominal..." 
                  class="w-full bg-gray-50 dark:bg-white/[0.03] text-base border rounded-[1.5rem] pl-14 pr-5 py-4 font-bold focus:outline-none focus:ring-2 transition-all shadow-inner dark:text-white"
                  :class="amountErrorMessage 
                    ? 'border-red-400 dark:border-red-500/50 focus:ring-red-500/50 focus:border-red-500 text-red-600 dark:text-red-400' 
                    : 'border-gray-200/50 dark:border-white/10 focus:ring-primary focus:border-transparent'"
                />
              </div>
              <transition
                enter-active-class="transition duration-300 ease-out"
                enter-from-class="opacity-0 -translate-y-2"
                enter-to-class="opacity-100 translate-y-0"
                leave-active-class="transition duration-200 ease-in"
                leave-from-class="opacity-100 translate-y-0"
                leave-to-class="opacity-0 -translate-y-2"
              >
                <p v-if="amountErrorMessage" class="text-[10px] sm:text-xs font-bold text-red-500 mt-2 ml-4 flex items-center">
                  <AlertCircleIcon class="w-3.5 h-3.5 mr-1" />
                  {{ amountErrorMessage }}
                </p>
              </transition>
            </div>
          </transition>

          <div class="space-y-3 pt-4 border-t border-gray-200/50 dark:border-white/5">
            <label class="text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest block">Metode Pembayaran</label>
            <div class="grid grid-cols-2 gap-4">
              <div 
                @click="form.paymentMethod = 'qris'"
                class="border rounded-[1.2rem] p-4 text-center cursor-pointer transition-all duration-300 select-none flex flex-col items-center space-y-2 relative overflow-hidden group"
                :class="form.paymentMethod === 'qris' 
                  ? 'border-[2px] border-primary bg-primary/10 dark:bg-primary/20 shadow-md' 
                  : 'border-[2px] border-gray-300 dark:border-white/10 bg-white dark:bg-white/[0.02] hover:bg-gray-50 dark:hover:bg-white/[0.05] hover:border-primary/50 shadow-sm hover:shadow-md'"
              >
                <div v-if="form.paymentMethod === 'qris'" class="absolute -right-4 -top-4 w-12 h-12 bg-primary/20 rounded-full blur-xl pointer-events-none"></div>
                <div class="w-14 h-14 bg-primary/10 dark:bg-primary/20 rounded-full flex items-center justify-center border border-primary/20 dark:border-primary/30 shadow-sm shrink-0">
                  <QrCodeIcon class="w-7 h-7 text-primary dark:text-primary-light" />
                </div>
                <div>
                  <span class="text-xs font-bold text-gray-800 dark:text-white block">QRIS Masjid</span>
                  <span class="text-[9px] text-gray-400 font-semibold">Verifikasi Instan</span>
                </div>
              </div>

              <div 
                @click="form.paymentMethod = 'va'"
                class="border rounded-[1.2rem] p-4 text-center cursor-pointer transition-all duration-300 select-none flex flex-col items-center space-y-2 relative overflow-hidden group"
                :class="form.paymentMethod === 'va' 
                  ? 'border-[2px] border-primary bg-primary/10 dark:bg-primary/20 shadow-md' 
                  : 'border-[2px] border-gray-300 dark:border-white/10 bg-white dark:bg-white/[0.02] hover:bg-gray-50 dark:hover:bg-white/[0.05] hover:border-primary/50 shadow-sm hover:shadow-md'"
              >
                <div v-if="form.paymentMethod === 'va'" class="absolute -right-4 -top-4 w-12 h-12 bg-primary/20 rounded-full blur-xl pointer-events-none"></div>
                
                <div class="relative w-14 h-14 bg-white dark:bg-dark/50 rounded-full flex items-center justify-center shadow-sm border border-teal-500/20 dark:border-teal-400/20 shrink-0">
                  <div class="absolute inset-1 rounded-full border border-teal-500/10 dark:border-teal-400/10 scale-105"></div>
                  <div class="absolute inset-0 rounded-full border border-teal-500/10 dark:border-teal-400/10 -rotate-12 scale-110"></div>
                  <!-- BRI Logo -->
                  <span class="font-extrabold text-blue-800 dark:text-blue-500 text-[19px] tracking-tighter pr-1 leading-none" style="font-family: Arial, sans-serif; font-style: italic;">BRI</span>
                </div>
                
                <div>
                  <span class="text-xs font-bold text-gray-800 dark:text-white block">Transfer Bank</span>
                  <span class="text-[9px] text-gray-400 font-semibold">Virtual Account</span>
                </div>
              </div>
            </div>
          </div>

          <div class="pt-4">
            <button 
              v-if="!isFormValid"
              disabled
              class="w-full py-4.5 text-sm font-bold bg-gray-100 dark:bg-white/5 text-gray-400 dark:text-gray-600 rounded-[1.5rem] cursor-not-allowed flex items-center justify-center space-x-2 transition-all border border-transparent"
            >
              <span>{{ validationMessage }}</span>
            </button>
            <button 
              v-else
              @click="submitDeposit"
              class="w-full py-4.5 text-sm font-bold bg-primary hover:bg-primary-light text-white rounded-[1.5rem] transition-all shadow-lg shadow-primary/30 flex items-center justify-center space-x-2 font-heading tracking-wide"
            >
              <span>{{ formMode === 'register' ? 'Daftar & Lanjutkan Pembayaran' : 'Lanjutkan Pembayaran' }}</span>
              <ArrowRightIcon class="w-4 h-4 ml-1" />
            </button>
          </div>

        </div>
      </div>
    </div>

    <transition
      enter-active-class="transition duration-300 ease-out"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition duration-200 ease-in"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div v-if="isCalculatorModalOpen" class="fixed inset-0 z-[60] flex items-center justify-center p-4 sm:p-6">
        <div class="absolute inset-0 bg-gray-900/40 dark:bg-black/60 backdrop-blur-sm" @click="isCalculatorModalOpen = false"></div>
        
        <div class="bg-white dark:bg-gray-900 border border-gray-200/50 dark:border-white/10 rounded-[2rem] p-6 shadow-2xl relative w-full max-w-md max-h-[90vh] overflow-y-auto z-10 transform transition-all space-y-6">
          <div class="flex items-center justify-between pb-3 border-b border-gray-100 dark:border-white/5">
            <div class="flex items-center space-x-2">
              <CalculatorIcon class="w-5 h-5 text-secondary" />
              <h3 class="text-base font-bold text-gray-800 dark:text-white font-heading">Simulasi Rencana Qurban</h3>
            </div>
            <button @click="isCalculatorModalOpen = false" class="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 bg-gray-100 dark:bg-white/5 p-1.5 rounded-full transition-colors">
              <XIcon class="w-5 h-5" />
            </button>
          </div>
          
          <div class="space-y-3">
            <label class="text-[10px] font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest block">Target Qurban</label>
            <div class="grid grid-cols-2 gap-4">
              <button 
                v-for="target in calcTargets" 
                :key="target.label"
                @click="calc.targetValue = target.price; calc.targetName = target.label; calc.targetType = target.type"
                class="p-4 rounded-[1.2rem] transition-all duration-300 flex flex-col justify-between items-center text-center space-y-2"
                :class="calc.targetName === target.label 
                  ? 'bg-primary/5 border-[2px] border-primary text-primary dark:bg-primary/20 dark:text-primary-light shadow-md scale-[1.02]' 
                  : 'bg-white dark:bg-white/[0.03] border-[1.5px] border-gray-300 dark:border-white/10 text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-white/[0.05] hover:border-primary/50 shadow-sm hover:shadow-md'"
              >
                <span class="text-4xl mb-1">{{ target.icon }}</span>
                <span class="text-xs font-bold leading-tight text-gray-800 dark:text-gray-200">{{ target.label }}</span>
                <span class="text-[10px] font-bold" :class="calc.targetName === target.label ? 'text-secondary' : 'text-gray-400'">{{ formatRp(target.price) }}</span>
              </button>
            </div>
          </div>

          <div class="space-y-4 pt-4 border-t border-gray-100 dark:border-white/5">
            <div class="flex justify-between items-center text-xs">
              <label class="text-[10px] font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest block">Lama Menabung</label>
              <span class="font-bold text-lg text-primary dark:text-primary-light bg-primary/10 px-3 py-0.5 rounded-lg">{{ calc.durationMonths }} Bulan</span>
            </div>
            
            <div class="relative pt-2 pb-6 px-1">
              <input 
                v-model.number="calc.durationMonths" 
                type="range" 
                min="1" 
                max="12" 
                class="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-primary"
              />
              <div class="flex justify-between text-[10px] text-gray-400 dark:text-gray-500 font-bold mt-3 px-1">
                <span>1 Bln</span>
                <span>6 Bln</span>
                <span>12 Bln</span>
              </div>
            </div>
          </div>

          <div class="bg-gray-50 dark:bg-white/[0.03] border-[1.5px] border-gray-300 dark:border-white/10 p-5 rounded-[1.5rem] mt-2 relative overflow-hidden group shadow-md">
            <div class="absolute -right-6 -bottom-6 w-24 h-24 bg-secondary/10 rounded-full blur-xl pointer-events-none group-hover:scale-150 transition-transform duration-700"></div>
            
            <p class="text-[10px] font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest mb-1 relative z-10">Rekomendasi Setoran</p>
            <div class="flex items-end space-x-2 relative z-10">
              <span class="text-3xl font-bold text-gray-800 dark:text-white font-heading tracking-tight">{{ formatRp(monthlyInstallment) }}</span>
              <span class="text-xs text-gray-500 dark:text-gray-400 font-bold mb-1.5">/ bulan</span>
            </div>
            
            <div class="mt-4 pt-4 border-t border-gray-200/80 dark:border-white/10 flex items-start space-x-3 relative z-10">
              <div class="w-8 h-8 rounded-full bg-secondary/20 flex items-center justify-center text-secondary shrink-0">
                <InfoIcon class="w-4 h-4" />
              </div>
              <p class="text-[10px] text-gray-500 dark:text-gray-400 leading-relaxed font-medium">
                Saran: Mulai menabung dari sekarang. Dengan rutin <strong class="text-gray-800 dark:text-gray-200">{{ formatRp(monthlyInstallment) }}</strong> per bulan, dana Qurban untuk <strong>{{ calc.targetName }}</strong> akan terkumpul tepat waktu sebelum Idul Adha.
              </p>
            </div>
            
            <button 
              @click="applyCalcToForm"
              class="w-full mt-4 py-3 bg-white dark:bg-white/10 hover:bg-gray-50 dark:hover:bg-white/20 text-gray-800 dark:text-white border border-gray-200 dark:border-white/10 rounded-xl text-xs font-bold transition-all flex items-center justify-center space-x-2 shadow-sm relative z-10"
            >
              <CopyIcon class="w-4 h-4" />
              <span>Gunakan Nominal Ini</span>
            </button>
          </div>
        </div>
      </div>
    </transition>

    <div v-if="isShohibulModalOpen" class="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60] flex flex-col justify-end modal-backdrop" style="margin: 0; padding: 0;">
        <div class="flex-1 w-full h-full absolute inset-0 cursor-pointer" @click="closeShohibulModal"></div>
        
        <div class="bg-white dark:bg-dark rounded-t-[2rem] p-6 max-h-[85vh] flex flex-col relative border-t border-gray-200/50 dark:border-white/10 shadow-2xl pb-[calc(20px+env(safe-area-inset-bottom,0px))] details-modal-content w-full max-w-2xl mx-auto z-10">
          <div class="w-12 h-1.5 bg-gray-300 dark:bg-gray-600 rounded-full mx-auto -mt-2 mb-6 cursor-pointer hover:bg-gray-400 transition-colors" @click="closeShohibulModal"></div>
          
          <div class="flex justify-between items-center mb-4">
            <h3 class="text-lg font-bold text-gray-800 dark:text-white font-heading">Pilih Shohibul Qurban</h3>
            <button @click="closeShohibulModal" class="p-2 rounded-full bg-gray-100 dark:bg-white/5 hover:bg-gray-200 dark:hover:bg-white/10 transition-colors text-gray-500 dark:text-gray-400">
              <XIcon class="w-5 h-5" />
            </button>
          </div>

          <div class="relative mb-4">
            <input 
              v-model="shohibulSearchQuery" 
              type="text" 
              placeholder="Cari nama atau kode jamaah..." 
              class="w-full bg-gray-50 dark:bg-white/[0.03] text-sm border-[2px] border-gray-300 dark:border-white/10 rounded-xl pl-10 pr-4 py-3 font-semibold focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent dark:text-white transition-all shadow-sm"
            />
            <div class="absolute left-3 top-3.5 text-gray-400">
              <SearchIcon class="w-4 h-4" />
            </div>
          </div>

          <div class="overflow-y-auto custom-scrollbar flex-1 -mx-4 px-4 pb-4 space-y-3">
            <div 
              v-for="s in filteredShohibulList" 
              :key="s.id"
              @click="handleShohibulSelection(s)"
              class="p-4 rounded-[1.2rem] transition-all duration-200 flex justify-between items-center"
              :class="[
                s.is_lunas ? 'opacity-60 cursor-not-allowed bg-gray-50 dark:bg-white/5 border-[2px] border-gray-200 dark:border-white/10' : 'cursor-pointer hover:shadow-md',
                form.shohibulId === s.id ? 'border-[2px] border-primary bg-primary/10 dark:bg-primary/20 shadow-md scale-[1.01]' : (!s.is_lunas ? 'border-[2px] border-gray-300 dark:border-white/10 bg-white dark:bg-white/[0.02] hover:bg-gray-50 hover:border-primary/50 dark:hover:bg-white/[0.05] shadow-sm' : '')
              ]"
            >
              <div>
                <h4 class="text-sm font-extrabold text-gray-800 dark:text-white" :class="{'text-primary dark:text-primary-light': form.shohibulId === s.id}">{{ s.name }}</h4>
                <div class="flex items-center space-x-2 mt-1">
                  <span class="text-[10px] text-gray-500 font-semibold truncate">{{ s.address || 'Alamat tidak diketahui' }}</span>
                </div>
              </div>
              
              <div v-if="s.is_lunas" class="px-2 py-1 bg-green-100 dark:bg-green-950/40 text-green-700 dark:text-green-400 text-[9px] font-bold rounded uppercase tracking-wider">
                Lunas
              </div>
              <div v-else-if="getPendingTx(s.id)" class="px-2 py-1 bg-amber-100 dark:bg-amber-950/40 text-amber-700 dark:text-amber-400 text-[9px] font-bold rounded uppercase tracking-wider flex items-center shadow-sm">
                <ClockIcon class="w-3 h-3 mr-1" /> Pending
              </div>
              <div v-else-if="form.shohibulId === s.id" class="w-6 h-6 rounded-full bg-primary text-white flex items-center justify-center">
                <CheckIcon class="w-3.5 h-3.5" />
              </div>
            </div>
            
            <div v-if="filteredShohibulList.length === 0" class="text-center py-8 px-4 bg-gray-50 dark:bg-white/[0.02] rounded-2xl border border-dashed border-gray-200 dark:border-white/5 mx-2 mt-2">
              <p class="text-xs font-bold text-gray-500 dark:text-gray-400 mb-1">Jamaah tidak ditemukan</p>
              <p class="text-[10px] text-gray-400 mb-4">Jika Anda belum terdaftar sebagai peserta Qurban, silakan daftar sekarang.</p>
              
              <button @click="switchToRegisterMode" class="px-5 py-2.5 bg-primary text-white font-bold text-xs rounded-xl shadow-md shadow-primary/20 hover:bg-primary-light transition-colors">
                Daftar Peserta Baru
              </button>
            </div>
          </div>
        </div>
      </div>

    <div v-if="isPaymentModalOpen" class="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60] flex flex-col justify-end modal-backdrop" style="margin: 0; padding: 0;">
        <div class="flex-1 w-full h-full absolute inset-0 cursor-pointer" @click="closePaymentModal(false)"></div>
        
        <div class="bg-white dark:bg-dark rounded-t-[2rem] p-6 max-h-[90vh] flex flex-col relative border-t border-gray-200/50 dark:border-white/10 shadow-2xl pb-[calc(20px+env(safe-area-inset-bottom,0px))] payment-modal-content w-full max-w-lg mx-auto z-10 overflow-y-auto custom-scrollbar">
          <div class="w-12 h-1.5 bg-gray-300 dark:bg-gray-600 rounded-full mx-auto -mt-2 mb-6 cursor-pointer hover:bg-gray-400 transition-colors" @click="closePaymentModal(false)"></div>
          
          <div class="text-center mb-6">
            <div class="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
              <ClockIcon class="w-8 h-8 text-primary" />
            </div>
            <h3 class="text-xl font-bold text-gray-800 dark:text-white font-heading">Menunggu Pembayaran</h3>
            <p class="text-xs text-gray-500 dark:text-gray-400 mt-1">Selesaikan pembayaran sebelum {{ paymentDetails.expiredAt ? formatDateTime(paymentDetails.expiredAt) : 'besok pukul 23:59 WIB' }}</p>
          </div>

          <div class="bg-gray-50 dark:bg-white/[0.02] border border-gray-200/50 dark:border-white/10 rounded-[1.5rem] p-5 mb-6 text-center space-y-2">
            <p class="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Total Tagihan</p>
            <p class="text-3xl font-bold text-gray-800 dark:text-white">{{ formatRp(paymentDetails.amount) }}</p>
          </div>

          <div v-if="paymentDetails.paymentMethod === 'va'" class="space-y-4 mb-8">
            <div class="flex items-center space-x-3 mb-2">
              <div class="relative w-10 h-10 bg-white dark:bg-dark/50 rounded-full flex items-center justify-center shadow-sm border border-teal-500/20 dark:border-teal-400/20 shrink-0">
                <div class="absolute inset-0.5 rounded-full border border-teal-500/10 dark:border-teal-400/10 scale-105"></div>
                <!-- BRI Logo -->
                <span class="font-extrabold text-blue-800 dark:text-blue-500 text-[13px] tracking-tighter pr-0.5 leading-none" style="font-family: Arial, sans-serif; font-style: italic;">BRI</span>
              </div>
              <div class="text-left">
                <p class="font-bold text-sm text-gray-800 dark:text-white">Bank Rakyat Indonesia (BRI)</p>
                <p class="text-[10px] text-gray-500">Virtual Account</p>
              </div>
            </div>
            
            <div class="bg-white dark:bg-white/[0.05] border border-gray-200/50 dark:border-white/10 rounded-xl p-4 flex justify-between items-center group mb-3">
              <div class="text-left">
                <p class="text-[10px] font-bold text-gray-400 mb-1">Nomor VA</p>
                <p class="text-lg sm:text-xl font-bold tracking-wider text-gray-800 dark:text-white">{{ paymentDetails.vaNumber }}</p>
              </div>
              <button @click="navigator.clipboard.writeText(paymentDetails.vaNumber); toast.success('Nomor VA berhasil disalin!')" class="p-2.5 bg-gray-100 dark:bg-white/10 rounded-xl text-primary hover:bg-primary hover:text-white transition-colors group-hover:shadow-md">
                <CopyIcon class="w-5 h-5" />
              </button>
            </div>
            <p class="text-xs font-bold text-gray-600 dark:text-gray-300 text-center">Silakan salin (copy) nomor Virtual Account di atas untuk melakukan pembayaran melalui m-Banking.</p>
          </div>

          <div v-if="paymentDetails.paymentMethod === 'qris'" class="space-y-4 mb-8 text-center flex flex-col items-center">
            <div class="relative inline-block p-4 bg-white rounded-2xl shadow-sm border border-gray-200/50 mb-2">
              <QrcodeVue 
                v-if="paymentDetails.paymentNumber"
                :value="paymentDetails.paymentNumber" 
                :size="250" 
                level="H" 
              />
              <div v-if="paymentDetails.paymentNumber" class="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div class="bg-white w-[90px] h-[90px] rounded-2xl flex items-center justify-center overflow-hidden border-4 border-white shadow-sm">
                  <img src="/favicon-green-outline.png" alt="Logo" class="w-[95px] h-[95px] max-w-none" />
                </div>
              </div>
              <QrCodeIcon v-else class="w-40 h-40 text-gray-800" />
            </div>
            <p class="text-xs font-bold text-gray-600 dark:text-gray-300">Silakan ambil tangkapan layar (screenshot) kode QRIS di atas untuk dibayar menggunakan aplikasi m-Banking atau E-Wallet Anda.</p>
          </div>

          <div class="mt-auto">
            <button 
              @click="confirmPayment"
              class="w-full py-4 bg-primary hover:bg-primary-light text-white rounded-[1.5rem] font-bold transition-all shadow-lg shadow-primary/30 flex items-center justify-center space-x-2"
            >
              <CheckCircleIcon class="w-5 h-5" />
              <span>{{ paymentDetails.paymentMethod === 'va' ? 'Salin Nomor VA & Tutup' : 'Tutup & Kembali ke Beranda' }}</span>
            </button>
          </div>
        </div>
      </div>

  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useQurbanStore } from '@/stores/qurban'
import { useToast } from '@/composables/useToast'
import QrcodeVue from 'qrcode.vue'
import gsap from 'gsap'
import { 
  WalletIcon, ZapIcon, UserIcon, ChevronDownIcon, CoinsIcon, 
  Edit3Icon, CheckIcon, QrCodeIcon, LandmarkIcon, ArrowRightIcon,
  CalculatorIcon, InfoIcon, CopyIcon, XIcon, SearchIcon, AlertCircleIcon, CheckCircleIcon, ClockIcon, CreditCardIcon
} from 'lucide-vue-next'

const store = useQurbanStore()
const toast = useToast()
const route = useRoute()
const router = useRouter()
const containerRef = ref(null)
let ctx

// State
const formMode = ref('setor') // 'setor' | 'register'
const isCustomAmountSelected = ref(false)
const isShohibulModalOpen = ref(false)
const isCalculatorModalOpen = ref(false)
const isPaymentModalOpen = ref(false)
const shohibulSearchQuery = ref('')

// Watch query params to open modal
watch(() => route.query, (newQuery) => {
  if (newQuery.modal === 'kalkulator') {
    isCalculatorModalOpen.value = true
  } else {
    isCalculatorModalOpen.value = false
  }
}, { immediate: true, deep: true })

// Clear query when modal is closed
watch(isCalculatorModalOpen, (newVal) => {
  if (!newVal && route.query.modal === 'kalkulator') {
    const newQuery = { ...route.query }
    delete newQuery.modal
    delete newQuery.t
    router.replace({ path: route.path, query: newQuery })
  }
})

const paymentDetails = ref({
  amount: 0,
  paymentMethod: '',
  vaNumber: '',
  paymentNumber: '',
  expiredAt: ''
})

const form = ref({
  shohibulId: '',
  amount: null,
  paymentMethod: 'qris'
})

// Revisi: Tambah form phone
const registerForm = ref({
  name: '',
  phone: '',
  address: '',
  type: 'sapi'
})

const calc = ref({
  targetValue: store.animalPrices.sapi,
  targetName: 'Sapi Share',
  targetType: 'sapi',
  durationMonths: 10
})

const formatRp = (val) => {
  if (!val) return 'Rp. 0'
  return 'Rp. ' + new Intl.NumberFormat('id-ID').format(val)
}

const targetLunas = computed(() => {
  if (formMode.value === 'register') {
    return registerForm.value.type === 'sapi' ? store.animalPrices.sapi : store.animalPrices.kambing
  } else if (formMode.value === 'setor' && form.value.shohibulId) {
    const shohibul = store.shohibuls.find(s => s.id === form.value.shohibulId)
    if (shohibul) {
      const remaining = Number(shohibul.target_amount) - Number(shohibul.collected_amount)
      return remaining > 0 ? remaining : Number(shohibul.target_amount)
    }
  }
  return store.animalPrices.sapi
})

const formatDateTime = (dateStr) => {
  if (!dateStr) return '';
  const date = new Date(dateStr);
  return new Intl.DateTimeFormat('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  }).format(date) + ' WIB';
}

const nominalPresets = computed(() => {
  const presets = [
    { value: 100000 },
    { value: 300000 },
    { value: 500000 },
    { value: 1000000 },
    { value: 2000000 },
    { value: targetLunas.value }
  ]
  
  const uniquePresets = []
  presets.forEach(p => {
    if (!uniquePresets.find(u => u.value === p.value)) {
      uniquePresets.push(p)
    }
  })

  if (uniquePresets.length < 6 && !uniquePresets.find(u => u.value === 1500000)) {
    uniquePresets.push({ value: 1500000 })
  }
  
  return uniquePresets.sort((a, b) => a.value - b.value)
})

const getPresetIcon = (value) => {
  if (value === targetLunas.value) return CheckCircleIcon
  if (value === 100000 || value === 300000) return CoinsIcon
  if (value === 500000 || value === 1500000) return WalletIcon
  if (value === 1000000) return CreditCardIcon
  if (value === 2000000) return LandmarkIcon
  return CoinsIcon
}

// Revisi: Hapus 4 Opsi tidak relevan, sisa Kambing & Sapi Kelompok
const calcTargets = computed(() => [
  { label: 'Kambing', price: store.animalPrices.kambing, type: 'kambing', icon: '🐐' },
  { label: 'Sapi Share', price: store.animalPrices.sapi, type: 'sapi', icon: '🐄👥' }
])

const monthlyInstallment = computed(() => {
  const exactAmount = calc.value.targetValue / calc.value.durationMonths
  return Math.ceil(exactAmount / 50000) * 50000
})

const amountErrorMessage = computed(() => {
  if (!form.value.amount) return ''
  
  const isExceedingTarget = form.value.amount > targetLunas.value
  if (isExceedingTarget) {
    return `Nominal maksimal adalah ${formatRp(targetLunas.value)}`
  }

  if (isCustomAmountSelected.value) {
    const isLessThanMin = form.value.amount < 50000
    const isNotMultiple = form.value.amount % 50000 !== 0
    
    if (isLessThanMin && isNotMultiple) {
      return 'Nominal minimal Rp. 50.000 dan harus kelipatan Rp. 50.000'
    } else if (isLessThanMin) {
      return 'Minimal setoran adalah Rp. 50.000'
    } else if (isNotMultiple) {
      return 'Nominal harus kelipatan Rp. 50.000'
    }
  }
  
  return ''
})

const validationMessage = computed(() => {
  if (formMode.value === 'setor') {
    if (!form.value.shohibulId) return 'Pilih Shohibul Terlebih Dahulu'
    if (!form.value.amount) return 'Masukkan Nominal Setoran'
    if (amountErrorMessage.value) return amountErrorMessage.value
    if (!form.value.paymentMethod) return 'Pilih Metode Pembayaran'
    return ''
  } else {
    if (!registerForm.value.name.trim()) return 'Masukkan Nama Shohibul'
    if (!registerForm.value.phone.trim()) return 'Masukkan Nomor Whatsapp'
    if (!registerForm.value.address.trim()) return 'Masukkan Alamat'
    if (!form.value.amount) return 'Masukkan Nominal Setoran'
    if (amountErrorMessage.value) return amountErrorMessage.value
    if (!form.value.paymentMethod) return 'Pilih Metode Pembayaran'
    return ''
  }
})

const isFormValid = computed(() => {
  return validationMessage.value === ''
})

const selectedShohibulData = computed(() => {
  return store.shohibuls.find(s => s.id === form.value.shohibulId)
})

const filteredShohibulList = computed(() => {
  let list = store.shohibuls
  
  if (shohibulSearchQuery.value) {
    const q = shohibulSearchQuery.value.toLowerCase()
    list = list.filter(s => 
      s.name.toLowerCase().includes(q) || 
      (s.address && s.address.toLowerCase().includes(q))
    )
  }
  
  const getSortScore = (s) => {
    const isPending = store.transactions.some(tx => tx.shohibul_id === s.id && tx.status === 'pending')
    if (isPending) return 1
    if (s.is_lunas) return 3
    return 2
  }
  
  return [...list].sort((a, b) => {
    const scoreA = getSortScore(a)
    const scoreB = getSortScore(b)
    
    if (scoreA !== scoreB) {
      return scoreA - scoreB
    }
    
    return a.name.localeCompare(b.name)
  })
})

// Methods
const openShohibulModal = () => {
  isShohibulModalOpen.value = true
  document.body.style.overflow = 'hidden'
  import('vue').then(({ nextTick }) => {
    nextTick(() => {
      gsap.fromTo('.modal-backdrop', { opacity: 0 }, { opacity: 1, duration: 0.3 })
      gsap.fromTo('.details-modal-content', { y: '100%' }, { y: '0%', duration: 0.4, ease: 'power3.out' })
    })
  })
}

const closeShohibulModal = () => {
  gsap.to('.details-modal-content', { y: '100%', duration: 0.3, ease: 'power3.in' })
  gsap.to('.modal-backdrop', { opacity: 0, duration: 0.3, onComplete: () => {
    isShohibulModalOpen.value = false
    document.body.style.overflow = ''
  }})
}

const selectShohibul = (id) => {
  form.value.shohibulId = id
  closeShohibulModal()
}

const pendingTransactionsMap = computed(() => {
  const map = {}
  if (store.transactions) {
    store.transactions.forEach(tx => {
      if (tx.status === 'pending') {
        map[tx.shohibul_id || tx.shohibulId] = tx
      }
    })
  }
  if (store.recentTransactions) {
    store.recentTransactions.forEach(tx => {
      if (tx.status === 'pending') {
        map[tx.shohibul_id || tx.shohibulId] = tx
      }
    })
  }
  return map
})

const getPendingTx = (id) => {
  return pendingTransactionsMap.value[id]
}

const handleShohibulSelection = (s) => {
  if (s.is_lunas) return
  
  const pendingTx = getPendingTx(s.id)
  if (pendingTx) {
    closeShohibulModal()
    paymentDetails.value = {
      amount: pendingTx.amount,
      paymentMethod: pendingTx.payment_method,
      vaNumber: pendingTx.order_id, // Placeholder if no saved payment number
      paymentNumber: pendingTx.payment_number || '',
      expiredAt: pendingTx.expired_at || ''
    }
    openPaymentModal()
  } else {
    selectShohibul(s.id)
  }
}

const selectPreset = (amount) => {
  form.value.amount = amount
  isCustomAmountSelected.value = false
}

const activateCustomAmount = () => {
  isCustomAmountSelected.value = true
  if (nominalPresets.value.some(p => p.value === form.value.amount)) {
    form.value.amount = null
  }
}

const applyCalcToForm = () => {
  form.value.amount = monthlyInstallment.value
  isCustomAmountSelected.value = true
  isCalculatorModalOpen.value = false
  
  if (window.innerWidth < 1024) {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
}

const switchToRegisterMode = () => {
  closeShohibulModal()
  formMode.value = 'register'
}

const openPaymentModal = () => {
  isPaymentModalOpen.value = true
  document.body.style.overflow = 'hidden'
  import('vue').then(({ nextTick }) => {
    nextTick(() => {
      gsap.fromTo('.modal-backdrop', { opacity: 0 }, { opacity: 1, duration: 0.3 })
      gsap.fromTo('.payment-modal-content', { y: '100%' }, { y: '0%', duration: 0.4, ease: 'power3.out' })
    })
  })
}

const closePaymentModal = (redirectToDashboard = false) => {
  gsap.to('.payment-modal-content', { y: '100%', duration: 0.3, ease: 'power3.in' })
  gsap.to('.modal-backdrop', { opacity: 0, duration: 0.3, onComplete: () => {
    isPaymentModalOpen.value = false
    document.body.style.overflow = ''
    if (redirectToDashboard) {
      router.push({ name: 'dashboard' })
    }
  }})
}

const confirmPayment = () => {
  if (paymentDetails.value.paymentMethod === 'va') {
    navigator.clipboard.writeText(paymentDetails.value.vaNumber)
      .then(() => toast.success('Nomor VA berhasil disalin!'))
      .catch(() => {})
  }
  closePaymentModal(true)
}

const submitDeposit = () => {
  if (form.value.amount > targetLunas.value) {
    toast.error(`Nominal maksimal adalah ${formatRp(targetLunas.value)}`)
    return
  }

  if (formMode.value === 'register') {
    if (!registerForm.value.name.trim() || !registerForm.value.address.trim() || !registerForm.value.phone.trim()) {
      toast.warning('Mohon lengkapi Nama, Nomor Whatsapp, dan Alamat pendaftar.')
      return
    }
    
    const isDuplicate = store.shohibuls.find(s => s.name.toLowerCase() === registerForm.value.name.trim().toLowerCase())
    if (isDuplicate) {
      toast.success('Pemberitahuan: Nama Anda sudah terdaftar. Kami akan mengalihkan Anda ke formulir Setoran.')
      formMode.value = 'setor'
      form.value.shohibulId = isDuplicate.id
      return
    }
    
    if (!form.value.amount || form.value.amount < 50000) {
      toast.warning('Pendaftaran baru mewajibkan setoran awal minimal Rp. 50.000.')
      return
    }
    if (form.value.amount % 50000 !== 0) {
      toast.warning('Nominal setoran awal harus kelipatan Rp. 50.000.')
      return
    }
  } else {
    if (!form.value.shohibulId) {
      toast.warning('Mohon pilih shohibul terlebih dahulu.')
      return
    }
    if (!form.value.amount || form.value.amount < 50000) {
      toast.warning('Minimal setoran adalah Rp. 50.000.')
      return
    }
    if (form.value.amount % 50000 !== 0) {
      toast.warning('Nominal setoran harus kelipatan Rp. 50.000.')
      return
    }
  }

  const btn = event.currentTarget
  gsap.to(btn, { scale: 0.95, duration: 0.1, yoyo: true, repeat: 1 })

  setTimeout(async () => {
    store.loading.deposit = true
    try {
      let result;
      if (formMode.value === 'register') {
        const mappedPaymentMethod = form.value.paymentMethod === 'va' ? 'bri_va' : form.value.paymentMethod;
        const payload = {
          name: registerForm.value.name.trim(),
          phone: registerForm.value.phone.trim(), 
          address: registerForm.value.address.trim(),
          target_type: registerForm.value.type,
          initial_amount: form.value.amount,
          payment_method: mappedPaymentMethod
        }
        result = await store.registerShohibul(payload)
      } else {
        const mappedPaymentMethod = form.value.paymentMethod === 'va' ? 'bri_va' : form.value.paymentMethod;
        const payload = {
          shohibul_id: form.value.shohibulId,
          amount: form.value.amount,
          payment_method: mappedPaymentMethod
        }
        result = await store.createDeposit(payload)
      }

      const paymentData = result?.payment || {};

      paymentDetails.value = {
        amount: paymentData.total_payment || form.value.amount,
        paymentMethod: form.value.paymentMethod,
        vaNumber: paymentData.payment_number || ('900' + Math.floor(1000000000 + Math.random() * 9000000000).toString()),
        paymentNumber: paymentData.payment_number || '',
        expiredAt: paymentData.expired_at || ''
      }
      
      openPaymentModal()
      
      form.value.amount = null
      form.value.shohibulId = ''
      registerForm.value.name = ''
      registerForm.value.phone = ''
      registerForm.value.address = ''
      isCustomAmountSelected.value = false
      formMode.value = 'setor'
      
    } catch (err) {
      toast.error('Gagal memproses pembayaran: ' + err.message)
    } finally {
      store.loading.deposit = false
    }
  }, 400)
}

watch(() => route.query.mode, (newMode) => {
  if (newMode === 'register') {
    formMode.value = 'register'
  } else if (newMode === 'kalkulator') {
    isCalculatorModalOpen.value = true
  }
}, { immediate: true })

watch(() => route.query.shohibulId, async (newId) => {
  if (newId) {
    if (store.shohibuls.length === 0) {
      await store.fetchShohibuls()
    }
    if (store.shohibuls.some(s => s.id === Number(newId))) {
      form.value.shohibulId = Number(newId)
      formMode.value = 'setor'
    }
  }
}, { immediate: true })

onMounted(async () => {
  if (store.shohibuls.length === 0) {
    await store.fetchShohibuls()
  }

  const queryShohibulId = route.query.shohibulId

  if (queryShohibulId) {
    const s = store.shohibuls.find(x => x.id === Number(queryShohibulId))
    if (s) {
      formMode.value = 'setor'
      handleShohibulSelection(s)
      const q = { ...route.query }
      delete q.shohibulId
      router.replace({ path: route.path, query: q })
    }
  }

  // Ensure dashboard stats are loaded to get recentTransactions
  if (!store.dashboardStats) {
    store.fetchDashboard()
  }

  // Fetch transactions in background if not loaded
  if (store.transactions.length === 0) {
    store.fetchTransactions().then(() => {
      // Re-trigger pending check if it wasn't found in recentTransactions
      if (queryShohibulId) {
        const s = store.shohibuls.find(x => x.id === Number(queryShohibulId))
        if (s && getPendingTx(s.id) && !paymentDetails.value.amount) {
          handleShohibulSelection(s)
        }
      }
    })
  }

  ctx = gsap.context(() => {
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })
    
    tl.from('.hero-card', { opacity: 0, y: -20, duration: 0.5 })
      .from('.tab-toggle', { opacity: 0, scale: 0.95, duration: 0.4 }, '-=0.3')
      .from('.form-panels > div', { opacity: 0, y: 20, stagger: 0.1, duration: 0.5 }, '-=0.2')
  }, containerRef.value)
})

onUnmounted(() => {
  if (ctx) ctx.revert()
})
</script>

<style scoped>
input[type=number]::-webkit-inner-spin-button, 
input[type=number]::-webkit-outer-spin-button { 
  -webkit-appearance: none; 
  margin: 0; 
}
input[type=number] {
  -moz-appearance: textfield;
}

input[type=range] {
  -webkit-appearance: none;
}
input[type=range]::-webkit-slider-thumb {
  -webkit-appearance: none;
  height: 24px;
  width: 24px;
  border-radius: 50%;
  background: var(--color-primary, #0d9488);
  cursor: pointer;
  box-shadow: 0 0 10px rgba(13, 148, 136, 0.5);
  border: 4px solid white;
}
.dark input[type=range]::-webkit-slider-thumb {
  border-color: #1f2937;
}
</style>
