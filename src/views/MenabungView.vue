<template>
  <div class="space-y-6 sm:space-y-8 pb-8" ref="containerRef">
    
    <!-- HERO CARD -->
    <div class="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-primary-dark via-primary to-emerald-800 text-white p-6 sm:p-8 shadow-2xl hero-card flex flex-col min-h-[180px]">
      <!-- Background Elements -->
      <div class="absolute right-[-10%] top-[-20%] w-64 h-64 rounded-full bg-white/5 border border-white/10 pointer-events-none"></div>
      <div class="absolute left-[-10%] bottom-[-30%] w-48 h-48 rounded-full bg-secondary/20 blur-3xl pointer-events-none"></div>
      
      <div class="relative z-10 flex flex-col h-full justify-between space-y-6">
        <div class="flex justify-between items-start">
          <div class="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/10 backdrop-blur-md shadow-sm">
            <span class="text-white/90 text-[10px] font-extrabold tracking-[0.2em] uppercase">Pembayaran</span>
          </div>
          <div class="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center backdrop-blur-md border border-white/10 shadow-inner">
            <WalletIcon class="w-5 h-5 text-secondary" />
          </div>
        </div>
        
        <div>
          <h2 class="text-3xl sm:text-4xl font-black text-white font-heading drop-shadow-lg tracking-tight">
            Menabung Qurban
          </h2>
          <div class="flex items-center space-x-2 mt-2">
            <span class="text-[10px] sm:text-xs bg-secondary/20 text-secondary-light px-2.5 py-1 rounded-full font-bold border border-secondary/20 backdrop-blur-sm shadow-sm flex items-center">
              <ZapIcon class="w-3 h-3 mr-1" />
              Instan & Mudah
            </span>
          </div>
        </div>
      </div>
    </div>

    <!-- Main Form Mode Toggles (Centered) -->
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
      <!-- Animated Indicator -->
      <div 
        class="absolute top-1.5 bottom-1.5 w-[calc(50%-0.375rem)] bg-white dark:bg-gray-800 rounded-xl shadow-sm transition-transform duration-300 ease-out"
        :class="formMode === 'setor' ? 'translate-x-0' : 'translate-x-[calc(100%+0.375rem)]'"
      ></div>
    </div>

    <!-- Form Container (Centered on Desktop) -->
    <div class="w-full form-panels space-y-5">
      
      <!-- MAIN FORM -->
      <div class="space-y-5">
        <!-- Card 1: Select Shohibul OR Register -->
        <div class="bg-white dark:bg-white/[0.02] border border-gray-200/50 dark:border-white/10 rounded-[2rem] p-6 shadow-sm space-y-4 relative overflow-hidden">
          
          <div class="flex items-center space-x-2 text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest mb-1">
            <UserIcon class="w-4 h-4 text-primary dark:text-primary-light" />
            <span>Data Shohibul</span>
          </div>
          
          <!-- SETOR MODE -->
          <transition mode="out-in" enter-active-class="transition duration-300 ease-out" enter-from-class="opacity-0 translate-x-4" enter-to-class="opacity-100 translate-x-0" leave-active-class="transition duration-200 ease-in" leave-from-class="opacity-100 translate-x-0" leave-to-class="opacity-0 -translate-x-4">
            <div v-if="formMode === 'setor'" class="space-y-4">
              <!-- Custom Shohibul Selector Button -->
              <div 
                @click="openShohibulModal"
                class="w-full bg-gray-50 dark:bg-white/[0.03] text-sm border border-gray-200/50 dark:border-white/10 rounded-[1.5rem] px-5 py-4 font-bold text-gray-800 dark:text-white transition-all hover:border-gray-300 dark:hover:border-white/20 cursor-pointer flex justify-between items-center group"
              >
                <div class="flex items-center space-x-3 truncate">
                  <div v-if="selectedShohibulData" class="flex flex-col">
                    <span class="truncate">{{ selectedShohibulData.name }}</span>
                    <span class="text-[10px] text-gray-400 font-semibold mt-0.5 uppercase tracking-wider">{{ selectedShohibulData.type === 'sapi' ? 'Sapi' : 'Kambing' }} • {{ selectedShohibulData.code }}</span>
                  </div>
                  <span v-else class="text-gray-400">— Pilih shohibul yang terdaftar —</span>
                </div>
                <div class="text-gray-400 pointer-events-none group-hover:text-primary transition-colors">
                  <ChevronDownIcon class="w-5 h-5" />
                </div>
              </div>
            </div>
            
            <!-- REGISTER MODE -->
            <div v-else class="space-y-3">
              <input 
                v-model="registerForm.name" 
                type="text" 
                placeholder="Nama Lengkap" 
                class="w-full bg-gray-50 dark:bg-white/[0.03] text-sm border border-gray-200/50 dark:border-white/10 rounded-[1.2rem] px-5 py-3.5 font-bold focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent dark:text-white transition-all"
              />
              <input 
                v-model="registerForm.address" 
                type="text" 
                placeholder="Alamat / Blok Perumahan" 
                class="w-full bg-gray-50 dark:bg-white/[0.03] text-sm border border-gray-200/50 dark:border-white/10 rounded-[1.2rem] px-5 py-3.5 font-bold focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent dark:text-white transition-all"
              />
              
              <div class="grid grid-cols-2 gap-3 pt-1">
                <div 
                  @click="registerForm.type = 'sapi'" 
                  class="border rounded-xl p-3 text-center cursor-pointer transition-all duration-300 font-bold text-sm select-none"
                  :class="registerForm.type === 'sapi' ? 'border-primary bg-primary/10 text-primary dark:text-primary-light shadow-inner' : 'border-gray-200/50 dark:border-white/10 text-gray-500 hover:bg-gray-50 dark:hover:bg-white/5'"
                >
                  <span class="text-lg mr-1 block sm:inline">🐄</span> Sapi
                </div>
                <div 
                  @click="registerForm.type = 'kambing'" 
                  class="border rounded-xl p-3 text-center cursor-pointer transition-all duration-300 font-bold text-sm select-none"
                  :class="registerForm.type === 'kambing' ? 'border-primary bg-primary/10 text-primary dark:text-primary-light shadow-inner' : 'border-gray-200/50 dark:border-white/10 text-gray-500 hover:bg-gray-50 dark:hover:bg-white/5'"
                >
                  <span class="text-lg mr-1 block sm:inline">🐐</span> Kambing
                </div>
              </div>
              
              <div class="flex items-start space-x-2 bg-amber-50 dark:bg-amber-900/20 p-3 rounded-xl border border-amber-200/50 dark:border-amber-800/30 mt-2">
                <InfoIcon class="w-4 h-4 text-amber-600 dark:text-amber-500 shrink-0 mt-0.5" />
                <p class="text-[10px] leading-relaxed text-amber-700 dark:text-amber-400 font-semibold">
                  Pendaftaran baru mewajibkan setoran awal minimal <strong class="font-black">Rp 50.000</strong> untuk mengamankan (booking) slot hewan qurban Anda.
                </p>
              </div>
            </div>
          </transition>
        </div>

        <div class="bg-white dark:bg-white/[0.02] border border-gray-200/50 dark:border-white/10 rounded-[2rem] p-6 shadow-sm space-y-6">
          <div class="flex items-center justify-between">
            <div class="flex items-center space-x-2 text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest">
              <CoinsIcon class="w-4 h-4 text-secondary" />
              <span>Pilih Nominal Tabungan</span>
            </div>
            
            <button type="button" @click.prevent="isCalculatorModalOpen = true" class="text-[10px] sm:text-xs font-bold text-primary dark:text-primary-light flex items-center bg-primary/10 px-2.5 py-1.5 rounded-lg hover:bg-primary/20 transition-colors shadow-sm">
              <CalculatorIcon class="w-3.5 h-3.5 mr-1.5" />
              Simulasi Kalkulator
            </button>
          </div>

          <!-- 3x2 Grid for Predefined Nominal Options -->
          <div class="grid grid-cols-2 sm:grid-cols-3 gap-3">
            <button 
              v-for="preset in nominalPresets" 
              :key="preset.value"
              type="button"
              @click="selectPreset(preset.value)"
              class="border rounded-[1.2rem] p-4 text-center cursor-pointer transition-all duration-300 select-none flex flex-col items-center justify-center space-y-1.5"
              :class="form.amount === preset.value && !isCustomAmountSelected
                ? 'border-primary bg-primary/10 dark:bg-primary/20 text-primary dark:text-primary-light font-black shadow-inner' 
                : 'border-gray-200/50 dark:border-white/10 bg-white dark:bg-white/[0.02] text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-white/[0.05] hover:border-gray-300 dark:hover:border-white/20 font-bold'"
            >
              <span class="text-xs sm:text-sm font-extrabold">{{ preset.label }}</span>
              <span class="text-[9px] sm:text-[10px] text-gray-400 dark:text-gray-500">Rp{{ preset.value.toLocaleString('id-ID') }}</span>
            </button>
          </div>

          <!-- Custom Option Toggle -->
          <div 
            @click="activateCustomAmount"
            class="border rounded-[1.2rem] p-4 cursor-pointer transition-all duration-300 select-none flex items-center justify-between"
            :class="isCustomAmountSelected 
              ? 'border-primary bg-primary/10 dark:bg-primary/20 shadow-inner' 
              : 'border-gray-200/50 dark:border-white/10 bg-white dark:bg-white/[0.02] hover:bg-gray-50 dark:hover:bg-white/[0.05]'"
          >
            <div class="flex items-center space-x-4 text-left">
              <div class="w-10 h-10 rounded-full bg-gray-100 dark:bg-white/5 flex items-center justify-center text-gray-500 dark:text-gray-400">
                <Edit3Icon class="w-5 h-5" />
              </div>
              <div>
                <span class="text-xs sm:text-sm font-extrabold text-gray-800 dark:text-white block">Nominal Lain</span>
                <span class="text-[9px] sm:text-[10px] text-gray-400 dark:text-gray-500 font-semibold">Kelipatan Rp 50.000</span>
              </div>
            </div>
            <div 
              class="w-6 h-6 rounded-full flex items-center justify-center text-white text-xs transition-colors"
              :class="isCustomAmountSelected ? 'bg-primary' : 'bg-gray-200 dark:bg-gray-700'"
            >
              <CheckIcon v-if="isCustomAmountSelected" class="w-3.5 h-3.5" />
            </div>
          </div>

          <!-- Custom Amount Input Field -->
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
                <span class="absolute left-5 top-1/2 -translate-y-1/2 text-sm font-bold transition-colors" :class="amountErrorMessage ? 'text-red-400' : 'text-gray-400'">Rp</span>
                <input 
                  v-model.number="form.amount" 
                  type="number" 
                  placeholder="Masukkan nominal..." 
                  class="w-full bg-gray-50 dark:bg-white/[0.03] text-base border rounded-[1.5rem] pl-12 pr-5 py-4 font-black focus:outline-none focus:ring-2 transition-all shadow-inner dark:text-white"
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

          <!-- Payment Method -->
          <div class="space-y-3 pt-4 border-t border-gray-200/50 dark:border-white/5">
            <label class="text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest block">Metode Pembayaran</label>
            <div class="grid grid-cols-2 gap-4">
              <!-- QRIS Option -->
              <div 
                @click="form.paymentMethod = 'qris'"
                class="border rounded-[1.2rem] p-4 text-center cursor-pointer transition-all duration-300 select-none flex flex-col items-center space-y-2 relative overflow-hidden group"
                :class="form.paymentMethod === 'qris' 
                  ? 'border-primary bg-primary/10 dark:bg-primary/20 shadow-inner' 
                  : 'border-gray-200/50 dark:border-white/10 bg-white dark:bg-white/[0.02] hover:bg-gray-50 dark:hover:bg-white/[0.05]'"
              >
                <div v-if="form.paymentMethod === 'qris'" class="absolute -right-4 -top-4 w-12 h-12 bg-primary/20 rounded-full blur-xl pointer-events-none"></div>
                <QrCodeIcon class="w-8 h-8 text-primary dark:text-primary-light" />
                <div>
                  <span class="text-xs font-black text-gray-800 dark:text-white block">QRIS Masjid</span>
                  <span class="text-[9px] text-gray-400 font-semibold">Verifikasi Instan</span>
                </div>
              </div>

              <!-- VA Option -->
              <div 
                @click="form.paymentMethod = 'va'"
                class="border rounded-[1.2rem] p-4 text-center cursor-pointer transition-all duration-300 select-none flex flex-col items-center space-y-2 relative overflow-hidden group"
                :class="form.paymentMethod === 'va' 
                  ? 'border-primary bg-primary/10 dark:bg-primary/20 shadow-inner' 
                  : 'border-gray-200/50 dark:border-white/10 bg-white dark:bg-white/[0.02] hover:bg-gray-50 dark:hover:bg-white/[0.05]'"
              >
                <div v-if="form.paymentMethod === 'va'" class="absolute -right-4 -top-4 w-12 h-12 bg-primary/20 rounded-full blur-xl pointer-events-none"></div>
                <LandmarkIcon class="w-8 h-8 text-primary dark:text-primary-light" />
                <div>
                  <span class="text-xs font-black text-gray-800 dark:text-white block">Transfer Bank</span>
                  <span class="text-[9px] text-gray-400 font-semibold">Virtual Account</span>
                </div>
              </div>
            </div>
          </div>

          <!-- Submit Button -->
          <div class="pt-4">
            <button 
              v-if="!isFormValid"
              disabled
              class="w-full py-4.5 text-sm font-black bg-gray-100 dark:bg-white/5 text-gray-400 dark:text-gray-600 rounded-[1.5rem] cursor-not-allowed flex items-center justify-center space-x-2 transition-all border border-transparent"
            >
              <span>{{ validationMessage }}</span>
            </button>
            <button 
              v-else
              @click="submitDeposit"
              class="w-full py-4.5 text-sm font-black bg-primary hover:bg-primary-light text-white rounded-[1.5rem] transition-all shadow-lg shadow-primary/30 flex items-center justify-center space-x-2 font-heading tracking-wide"
            >
              <span>{{ formMode === 'register' ? 'Daftar & Lanjutkan Pembayaran' : 'Lanjutkan Pembayaran' }}</span>
              <ArrowRightIcon class="w-4 h-4 ml-1" />
            </button>
          </div>

        </div>
      </div>
    </div>

    <!-- CALCULATOR MODAL -->
    <transition
      enter-active-class="transition duration-300 ease-out"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition duration-200 ease-in"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div v-if="isCalculatorModalOpen" class="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
        <!-- Backdrop -->
        <div class="absolute inset-0 bg-gray-900/40 dark:bg-black/60 backdrop-blur-sm" @click="isCalculatorModalOpen = false"></div>
        
        <!-- Modal Content -->
        <div class="bg-white dark:bg-gray-900 border border-gray-200/50 dark:border-white/10 rounded-[2rem] p-6 shadow-2xl relative w-full max-w-md max-h-[90vh] overflow-y-auto z-10 transform transition-all space-y-6">
          <div class="flex items-center justify-between pb-3 border-b border-gray-100 dark:border-white/5">
            <div class="flex items-center space-x-2">
              <CalculatorIcon class="w-5 h-5 text-secondary" />
              <h3 class="text-base font-black text-gray-800 dark:text-white font-heading">Simulasi Rencana Qurban</h3>
            </div>
            <button @click="isCalculatorModalOpen = false" class="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 bg-gray-100 dark:bg-white/5 p-1.5 rounded-full transition-colors">
              <XIcon class="w-5 h-5" />
            </button>
          </div>
          
          <!-- Target Type -->
          <div class="space-y-3">
            <label class="text-[10px] font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest block">Target Qurban</label>
            <div class="grid grid-cols-3 gap-3">
              <button 
                v-for="target in calcTargets" 
                :key="target.label"
                @click="calc.targetValue = target.price; calc.targetName = target.label; calc.targetType = target.type"
                class="p-3 rounded-[1.2rem] border transition-all duration-300 flex flex-col justify-between items-center text-center space-y-1.5"
                :class="calc.targetName === target.label 
                  ? 'bg-primary/10 border-primary text-primary dark:bg-primary/20 dark:text-primary-light shadow-inner' 
                  : 'bg-white dark:bg-white/[0.03] border-gray-200/50 dark:border-white/10 text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-white/[0.05] hover:border-gray-300 dark:hover:border-white/20'"
              >
                <span class="text-2xl">{{ target.icon }}</span>
                <span class="text-[10px] font-bold leading-tight text-gray-800 dark:text-gray-200">{{ target.label }}</span>
                <span class="text-[9px] font-black" :class="calc.targetName === target.label ? 'text-secondary' : 'text-gray-400'">{{ store.formatRupiah(target.price) }}</span>
              </button>
            </div>
          </div>

          <!-- Months Duration Slider -->
          <div class="space-y-4 pt-4 border-t border-gray-100 dark:border-white/5">
            <div class="flex justify-between items-center text-xs">
              <label class="text-[10px] font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest block">Lama Menabung</label>
              <span class="font-black text-lg text-primary dark:text-primary-light bg-primary/10 px-3 py-0.5 rounded-lg">{{ calc.durationMonths }} Bulan</span>
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

          <!-- Monthly Result Banner -->
          <div class="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-white/[0.05] dark:to-white/[0.02] border border-gray-200/50 dark:border-white/10 p-5 rounded-[1.5rem] mt-2 relative overflow-hidden group">
            <div class="absolute -right-6 -bottom-6 w-24 h-24 bg-secondary/10 rounded-full blur-xl pointer-events-none group-hover:scale-150 transition-transform duration-700"></div>
            
            <p class="text-[10px] font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest mb-1 relative z-10">Rekomendasi Setoran</p>
            <div class="flex items-end space-x-2 relative z-10">
              <span class="text-3xl font-black text-gray-800 dark:text-white font-heading tracking-tight">{{ store.formatRupiahFull(monthlyInstallment) }}</span>
              <span class="text-xs text-gray-500 dark:text-gray-400 font-bold mb-1.5">/ bulan</span>
            </div>
            
            <div class="mt-4 pt-4 border-t border-gray-200/80 dark:border-white/10 flex items-start space-x-3 relative z-10">
              <div class="w-8 h-8 rounded-full bg-secondary/20 flex items-center justify-center text-secondary shrink-0">
                <InfoIcon class="w-4 h-4" />
              </div>
              <p class="text-[10px] text-gray-500 dark:text-gray-400 leading-relaxed font-medium">
                Saran: Mulai menabung dari sekarang. Dengan rutin <strong class="text-gray-800 dark:text-gray-200">{{ store.formatRupiahFull(monthlyInstallment) }}</strong> per bulan, dana Qurban untuk <strong>{{ calc.targetName }}</strong> akan terkumpul tepat waktu sebelum Idul Adha.
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

    <!-- Shohibul Selection Modal -->
      <div v-if="isShohibulModalOpen" class="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex flex-col justify-end modal-backdrop" style="margin: 0; padding: 0;">
        <div class="flex-1 w-full h-full absolute inset-0 cursor-pointer" @click="closeShohibulModal"></div>
        
        <div class="bg-white dark:bg-dark rounded-t-[2rem] p-6 max-h-[85vh] flex flex-col relative border-t border-gray-200/50 dark:border-white/10 shadow-2xl pb-[calc(20px+env(safe-area-inset-bottom,0px))] details-modal-content w-full max-w-2xl mx-auto z-10">
          <div class="w-12 h-1.5 bg-gray-300 dark:bg-gray-600 rounded-full mx-auto -mt-2 mb-6 cursor-pointer hover:bg-gray-400 transition-colors" @click="closeShohibulModal"></div>
          
          <div class="flex justify-between items-center mb-4">
            <h3 class="text-lg font-black text-gray-800 dark:text-white font-heading">Pilih Shohibul Qurban</h3>
            <button @click="closeShohibulModal" class="p-2 rounded-full bg-gray-100 dark:bg-white/5 hover:bg-gray-200 dark:hover:bg-white/10 transition-colors text-gray-500 dark:text-gray-400">
              <XIcon class="w-5 h-5" />
            </button>
          </div>

          <div class="relative mb-4">
            <input 
              v-model="shohibulSearchQuery" 
              type="text" 
              placeholder="Cari nama atau kode jamaah..." 
              class="w-full bg-gray-50 dark:bg-white/[0.03] text-sm border border-gray-200/50 dark:border-white/10 rounded-xl pl-10 pr-4 py-3 font-semibold focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent dark:text-white transition-all"
            />
            <div class="absolute left-3 top-3.5 text-gray-400">
              <SearchIcon class="w-4 h-4" />
            </div>
          </div>

          <div class="overflow-y-auto custom-scrollbar flex-1 -mx-2 px-2 pb-4 space-y-2">
            <div 
              v-for="s in filteredShohibulList" 
              :key="s.id"
              @click="selectShohibul(s.id)"
              class="p-4 rounded-[1.2rem] border transition-all duration-200 cursor-pointer flex justify-between items-center"
              :class="form.shohibulId === s.id ? 'border-primary bg-primary/5 dark:bg-primary/10' : 'border-gray-100 dark:border-white/5 hover:bg-gray-50 dark:hover:bg-white/[0.02]'"
            >
              <div>
                <h4 class="text-sm font-bold text-gray-800 dark:text-white" :class="{'text-primary dark:text-primary-light': form.shohibulId === s.id}">{{ s.name }}</h4>
                <div class="flex items-center space-x-2 mt-1">
                  <span class="text-[9px] font-semibold text-gray-500 bg-gray-100 dark:bg-gray-800 px-2 py-0.5 rounded uppercase">{{ s.type === 'sapi' ? '🐄 Sapi' : '🐐 Kambing' }}</span>
                  <span class="text-[9px] font-bold text-gray-400">{{ s.code }}</span>
                </div>
              </div>
              <div v-if="form.shohibulId === s.id" class="w-6 h-6 rounded-full bg-primary text-white flex items-center justify-center">
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

    <!-- Payment Modal -->
      <div v-if="isPaymentModalOpen" class="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex flex-col justify-end modal-backdrop" style="margin: 0; padding: 0;">
        <div class="flex-1 w-full h-full absolute inset-0 cursor-pointer" @click="closePaymentModal(false)"></div>
        
        <div class="bg-white dark:bg-dark rounded-t-[2rem] p-6 max-h-[90vh] flex flex-col relative border-t border-gray-200/50 dark:border-white/10 shadow-2xl pb-[calc(20px+env(safe-area-inset-bottom,0px))] payment-modal-content w-full max-w-lg mx-auto z-10 overflow-y-auto custom-scrollbar">
          <div class="w-12 h-1.5 bg-gray-300 dark:bg-gray-600 rounded-full mx-auto -mt-2 mb-6 cursor-pointer hover:bg-gray-400 transition-colors" @click="closePaymentModal(false)"></div>
          
          <div class="text-center mb-6">
            <div class="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
              <ClockIcon class="w-8 h-8 text-primary" />
            </div>
            <h3 class="text-xl font-black text-gray-800 dark:text-white font-heading">Menunggu Pembayaran</h3>
            <p class="text-xs text-gray-500 dark:text-gray-400 mt-1">Selesaikan pembayaran sebelum besok pukul 23:59 WIB</p>
          </div>

          <div class="bg-gray-50 dark:bg-white/[0.02] border border-gray-200/50 dark:border-white/10 rounded-[1.5rem] p-5 mb-6 text-center space-y-2">
            <p class="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Total Tagihan</p>
            <p class="text-3xl font-black text-gray-800 dark:text-white">{{ store.formatRupiahFull(paymentDetails.amount) }}</p>
          </div>

          <!-- VA Instructions -->
          <div v-if="paymentDetails.paymentMethod === 'va'" class="space-y-4 mb-8">
            <div class="flex items-center space-x-3 mb-2">
              <div class="w-10 h-10 bg-orange-100 dark:bg-orange-900/30 rounded-full flex items-center justify-center">
                <span class="font-black text-orange-600 dark:text-orange-400 text-[10px]">BSI</span>
              </div>
              <div class="text-left">
                <p class="font-bold text-sm text-gray-800 dark:text-white">Bank Syariah Indonesia (BSI)</p>
                <p class="text-[10px] text-gray-500">Virtual Account</p>
              </div>
            </div>
            
            <div class="bg-white dark:bg-white/[0.05] border border-gray-200/50 dark:border-white/10 rounded-xl p-4 flex justify-between items-center group">
              <div class="text-left">
                <p class="text-[10px] font-bold text-gray-400 mb-1">Nomor VA</p>
                <p class="text-lg sm:text-xl font-black tracking-wider text-gray-800 dark:text-white">{{ paymentDetails.vaNumber }}</p>
              </div>
              <button class="p-2.5 bg-gray-100 dark:bg-white/10 rounded-xl text-primary hover:bg-primary hover:text-white transition-colors group-hover:shadow-md">
                <CopyIcon class="w-5 h-5" />
              </button>
            </div>
          </div>

          <!-- QRIS Instructions -->
          <div v-if="paymentDetails.paymentMethod === 'qris'" class="space-y-4 mb-8 text-center flex flex-col items-center">
            <div class="inline-block p-4 bg-white rounded-2xl shadow-sm border border-gray-200/50 mb-2">
              <!-- Using standard SVG for QR Code dummy -->
              <QrCodeIcon class="w-40 h-40 text-gray-800" />
            </div>
            <p class="text-xs font-bold text-gray-600 dark:text-gray-300">Scan QRIS ini menggunakan aplikasi M-Banking atau E-Wallet Anda (GoPay, OVO, Dana, LinkAja).</p>
          </div>

          <div class="space-y-3 mt-auto">
            <button 
              @click="confirmPayment"
              class="w-full py-4 bg-primary hover:bg-primary-light text-white rounded-[1.5rem] font-black transition-all shadow-lg shadow-primary/30 flex items-center justify-center space-x-2"
            >
              <CheckCircleIcon class="w-5 h-5" />
              <span>Simpan Instruksi Pembayaran</span>
            </button>
            <button 
              @click="closePaymentModal(true)"
              class="w-full py-4 bg-gray-100 dark:bg-white/5 hover:bg-gray-200 dark:hover:bg-white/10 text-gray-600 dark:text-gray-300 rounded-[1.5rem] font-bold transition-colors text-sm"
            >
              Bayar Nanti
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
import gsap from 'gsap'
import { 
  WalletIcon, ZapIcon, UserIcon, ChevronDownIcon, CoinsIcon, 
  Edit3Icon, CheckIcon, QrCodeIcon, LandmarkIcon, ArrowRightIcon,
  CalculatorIcon, InfoIcon, CopyIcon, XIcon, SearchIcon, AlertCircleIcon, CheckCircleIcon, ClockIcon
} from 'lucide-vue-next'

const store = useQurbanStore()
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

const paymentDetails = ref({
  amount: 0,
  paymentMethod: '',
  vaNumber: ''
})

const form = ref({
  shohibulId: '',
  amount: null,
  paymentMethod: 'qris'
})

const registerForm = ref({
  name: '',
  address: '',
  type: 'sapi'
})

const calc = ref({
  targetValue: 3000000,
  targetName: 'Sapi Kelompok',
  targetType: 'sapi',
  durationMonths: 10
})

// Data
const nominalPresets = [
  { label: 'Paket Hemat', value: 50000 },
  { label: 'Paket Ringan', value: 100000 },
  { label: 'Paket Ideal', value: 250000 },
  { label: 'Paket Berkah', value: 500000 },
  { label: 'Paket Ekstra', value: 1000000 },
  { label: 'Lunas 1 Slot', value: 3000000 }
]

const calcTargets = [
  { label: 'Kambing Reguler', price: 2500000, type: 'kambing', icon: '🐐' },
  { label: 'Kambing Super', price: 3000000, type: 'kambing', icon: '🐐✨' },
  { label: 'Sapi Kelompok', price: 3000000, type: 'sapi', icon: '🐄👥' },
  { label: 'Sapi Utuh Reg', price: 21000000, type: 'sapi', icon: '🐄' },
  { label: 'Sapi Utuh Super', price: 25000000, type: 'sapi', icon: '🐄✨' },
  { label: 'Sapi Jumbo', price: 35000000, type: 'sapi', icon: '🐃' }
]

// Computed
const monthlyInstallment = computed(() => {
  const exactAmount = calc.value.targetValue / calc.value.durationMonths
  return Math.ceil(exactAmount / 50000) * 50000
})

const amountErrorMessage = computed(() => {
  if (!isCustomAmountSelected.value || !form.value.amount) return ''
  
  const isLessThanMin = form.value.amount < 50000
  const isNotMultiple = form.value.amount % 50000 !== 0
  
  if (isLessThanMin && isNotMultiple) {
    return 'Nominal minimal Rp 50.000 dan harus kelipatan Rp 50.000'
  } else if (isLessThanMin) {
    return 'Minimal setoran adalah Rp 50.000'
  } else if (isNotMultiple) {
    return 'Nominal harus kelipatan Rp 50.000'
  }
  
  return ''
})

const validationMessage = computed(() => {
  if (formMode.value === 'setor') {
    if (!form.value.shohibulId) return 'Pilih Shohibul Terlebih Dahulu'
    if (!form.value.amount) return 'Masukkan Nominal Setoran'
    if (amountErrorMessage.value) return 'Perbaiki Nominal Setoran'
    if (!form.value.paymentMethod) return 'Pilih Metode Pembayaran'
    return ''
  } else {
    if (!registerForm.value.name.trim()) return 'Masukkan Nama Shohibul'
    if (!registerForm.value.address.trim()) return 'Masukkan Alamat'
    if (!form.value.amount) return 'Masukkan Nominal Setoran'
    if (amountErrorMessage.value) return 'Perbaiki Nominal Setoran'
    if (!form.value.paymentMethod) return 'Pilih Metode Pembayaran'
    return ''
  }
})

const isFormValid = computed(() => {
  return validationMessage.value === ''
})

const selectedShohibulData = computed(() => {
  if (!form.value.shohibulId) return null
  return store.shohibuls.find(s => s.id === form.value.shohibulId)
})

const filteredShohibulList = computed(() => {
  if (!shohibulSearchQuery.value) return store.shohibuls
  const q = shohibulSearchQuery.value.toLowerCase()
  return store.shohibuls.filter(s => 
    s.name.toLowerCase().includes(q) || s.code.toLowerCase().includes(q)
  )
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

const selectPreset = (amount) => {
  form.value.amount = amount
  isCustomAmountSelected.value = false
}

const activateCustomAmount = () => {
  isCustomAmountSelected.value = true
  if (nominalPresets.some(p => p.value === form.value.amount)) {
    form.value.amount = null
  }
}

const applyCalcToForm = () => {
  form.value.amount = monthlyInstallment.value
  isCustomAmountSelected.value = true
  isCalculatorModalOpen.value = false
  
  // Optional: Auto-select a shohibul if they match the target type, but for now just switch tabs
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
  alert('Instruksi/Kode bayar berhasil disimpan ke galeri perangkat Anda.')
  closePaymentModal(true)
}

const submitDeposit = () => {
  // Validation for Registration Mode
  if (formMode.value === 'register') {
    if (!registerForm.value.name.trim() || !registerForm.value.address.trim()) {
      alert('Mohon lengkapi Nama dan Alamat pendaftar.')
      return
    }
    
    // Duplicate Name Validation
    const isDuplicate = store.shohibuls.find(s => s.name.toLowerCase() === registerForm.value.name.trim().toLowerCase())
    if (isDuplicate) {
      alert('Pemberitahuan: Nama Anda sudah terdaftar di sistem kami. Kami akan mengalihkan Anda ke formulir Setoran untuk melanjutkan pembayaran.')
      formMode.value = 'setor'
      form.value.shohibulId = isDuplicate.id
      return
    }
    
    // Initial amount validation
    if (!form.value.amount || form.value.amount < 50000) {
      alert('Pendaftaran baru mewajibkan setoran awal minimal Rp 50.000.')
      return
    }
    if (form.value.amount % 50000 !== 0) {
      alert('Nominal setoran awal harus kelipatan Rp 50.000.')
      return
    }
  } else {
    // Validation for Setor Mode
    if (!form.value.shohibulId) {
      alert('Mohon pilih shohibul terlebih dahulu.')
      return
    }
    if (!form.value.amount || form.value.amount < 50000) {
      alert('Minimal setoran adalah Rp 50.000.')
      return
    }
    if (form.value.amount % 50000 !== 0) {
      alert('Nominal setoran harus kelipatan Rp 50.000.')
      return
    }
  }

  // Animation effect on button click
  const btn = event.currentTarget
  gsap.to(btn, { scale: 0.95, duration: 0.1, yoyo: true, repeat: 1 })

  // Process Registration OR Deposit
  setTimeout(() => {
    if (formMode.value === 'register') {
      store.registerNewShohibul({
        name: registerForm.value.name.trim(),
        address: registerForm.value.address.trim(),
        type: registerForm.value.type,
        target: registerForm.value.type === 'sapi' ? 3000000 : 2500000,
        initialAmount: form.value.amount,
        paymentMethod: form.value.paymentMethod
      })
    } else {
      // Simulate adding transaction to existing shohibul
      store.transactions.unshift({
        id: 'tx-' + Math.random().toString(36).substr(2, 9),
        shohibulId: form.value.shohibulId,
        name: selectedShohibulData.value.name,
        code: selectedShohibulData.value.code,
        amount: form.value.amount,
        date: new Date().toISOString(),
        paymentMethod: form.value.paymentMethod,
        status: 'pending'
      })
      
      store.saveToCache()
    }
    
    // Set payment details
    paymentDetails.value = {
      amount: form.value.amount,
      paymentMethod: form.value.paymentMethod,
      vaNumber: '900' + Math.floor(1000000000 + Math.random() * 9000000000).toString()
    }
    
    // Open payment modal
    openPaymentModal()
    
    // Clear forms
    form.value.amount = null
    form.value.shohibulId = ''
    registerForm.value.name = ''
    registerForm.value.address = ''
    isCustomAmountSelected.value = false
    formMode.value = 'setor'
    
  }, 400)
}

// Watchers and Hooks
watch(() => route.query.mode, (newMode) => {
  if (newMode === 'register') {
    formMode.value = 'register'
  } else if (newMode === 'kalkulator') {
    isCalculatorModalOpen.value = true
  }
}, { immediate: true })

watch(() => route.query.shohibulId, (newId) => {
  if (newId && store.shohibuls.some(s => s.id === newId)) {
    form.value.shohibulId = newId
    formMode.value = 'setor'
  }
}, { immediate: true })

onMounted(() => {
  ctx = gsap.context(() => {
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })
    
    tl.from('.hero-card', { opacity: 0, y: -20, duration: 0.5 })
      .from('.tab-toggle', { opacity: 0, scale: 0.95, duration: 0.4 }, '-=0.3')
      .from('.form-panels > div', { opacity: 0, y: 20, stagger: 0.1, duration: 0.5 }, '-=0.2')
  })
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

/* Custom Range Slider Styling */
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
