<template>
  <div :class="{ 'dark': isDarkMode }" class="min-h-screen transition-colors duration-300">
    <!-- Desktop Background Wrapper -->
    <div class="min-h-screen bg-gradient-to-br from-emerald-950 via-teal-900 to-emerald-950 text-white font-sans flex items-center justify-center p-4 lg:p-8 relative overflow-hidden islamic-pattern-bg">
      
      <!-- Background Ambient Glows -->
      <div class="absolute top-[-20%] left-[-10%] w-[600px] height-[600px] rounded-full bg-emerald-500/10 blur-[120px] pointer-events-none"></div>
      <div class="absolute bottom-[-20%] right-[-10%] w-[600px] height-[600px] rounded-full bg-amber-500/10 blur-[120px] pointer-events-none"></div>

      <!-- Main Layout Container -->
      <div class="w-full max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-center z-10">
        
        <!-- Left Side: Desktop Branding & Info (Hidden on mobile) -->
        <div class="hidden lg:flex lg:col-span-6 flex-col justify-center text-left space-y-6 animate-fade-in pr-6">
          <div class="flex items-center space-x-4">
            <img src="/logo-dkm.jpeg" alt="Logo DKM" class="w-16 h-16 rounded-full border-2 border-amber-500 shadow-lg glow-gold" />
            <div>
              <span class="text-xs uppercase tracking-widest text-amber-400 font-semibold">Program Ramah Jamaah</span>
              <h1 class="text-3xl font-bold font-heading">DKM Masjid Jami Kassiti</h1>
            </div>
          </div>
          
          <div class="space-y-4">
            <h2 class="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-amber-200 to-amber-400 font-heading">
              Tabungan Qurban
            </h2>
            <p class="text-gray-300 leading-relaxed text-sm">
              Sistem manajemen tabungan qurban mandiri untuk memudahkan jamaah mempersiapkan ibadah qurban secara terencana dan berkala. Terintegrasi dengan sistem administrasi Masjid Jami Kassiti.
            </p>
          </div>

          <!-- Quick Stats Desktop Display -->
          <div class="grid grid-cols-3 gap-4 bg-white/5 border border-white/10 rounded-2xl p-4 backdrop-blur-md">
            <div>
              <p class="text-2xl font-bold text-amber-400">{{ store.shohibuls.length }}</p>
              <p class="text-xs text-gray-400 uppercase tracking-wider">Shohibul</p>
            </div>
            <div>
              <p class="text-2xl font-bold text-emerald-400">{{ store.totalLunas }}</p>
              <p class="text-xs text-gray-400 uppercase tracking-wider">Lunas</p>
            </div>
            <div>
              <p class="text-2xl font-bold text-teal-300">{{ store.formatRupiah(store.totalCollected) }}</p>
              <p class="text-xs text-gray-400 uppercase tracking-wider">Terkumpul</p>
            </div>
          </div>

          <div class="flex items-center space-x-3 text-xs text-gray-400">
            <span class="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
            <span>Terhubung dengan masjidkassiti.id</span>
            <span class="text-gray-600">|</span>
            <span>Periode Idul Adha 2025</span>
          </div>
        </div>

        <!-- Right Side: Mobile Screen Container Mockup -->
        <div class="col-span-1 lg:col-span-6 flex justify-center">
          <div class="w-full max-w-[430px] h-screen lg:h-[880px] bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-100 lg:rounded-[40px] shadow-2xl relative overflow-hidden flex flex-col border-4 border-gray-200/20 lg:border-gray-800 dark:lg:border-gray-800 lg:glow-primary">
            
            <!-- Mobile Notch / Camera Bar (Hidden on actual mobile screens) -->
            <div class="hidden lg:block absolute top-0 left-1/2 transform -translate-x-1/2 w-40 h-6 bg-black rounded-b-2xl z-50"></div>
            
            <!-- Mobile App Scrollable Content Area -->
            <div class="flex-1 overflow-y-auto pb-safe-bottom bg-gray-50 dark:bg-gray-950 relative scroll-smooth">
              
              <!-- Quick Dark Mode and Dev Controls (Floating inside app mockup) -->
              <div class="sticky top-0 z-40 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md px-4 py-3 border-b border-gray-200/50 dark:border-gray-800/50 flex justify-between items-center">
                <div class="flex items-center space-x-2">
                  <img src="/logo-dkm.jpeg" alt="Logo" class="w-7 h-7 rounded-full border border-amber-500" />
                  <span class="text-xs font-semibold tracking-wide text-gray-500 dark:text-gray-400">QURBAN KASSITI</span>
                </div>
                
                <div class="flex items-center space-x-2">
                  <!-- Dark Mode Button -->
                  <button @click="toggleDarkMode" class="p-1.5 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition" aria-label="Toggle Dark Mode">
                    <svg v-if="isDarkMode" xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-amber-400" viewBox="0 0 20 20" fill="currentColor">
                      <path fill-rule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.46 5.05l-.707-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 100 2h1z" clip-rule="evenodd" />
                    </svg>
                    <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-emerald-700" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                    </svg>
                  </button>
                </div>
              </div>

              <!-- Main Router view with transitions -->
              <router-view v-slot="{ Component }">
                <transition name="fade-slide" mode="out-in">
                  <component :is="Component" :key="route.path" />
                </transition>
              </router-view>
            </div>

            <!-- Fixed Bottom Navbar -->
            <BottomNav />
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useQurbanStore } from '@/stores/qurban'
import BottomNav from '@/components/layout/BottomNav.vue'

const isDarkMode = ref(false)
const route = useRoute()
const store = useQurbanStore()

const toggleDarkMode = () => {
  isDarkMode.value = !isDarkMode.value
  if (isDarkMode.value) {
    document.documentElement.classList.add('dark')
    localStorage.setItem('theme', 'dark')
  } else {
    document.documentElement.classList.remove('dark')
    localStorage.setItem('theme', 'light')
  }
}

onMounted(() => {
  // Load mock data on initialization
  store.initializeStore()

  // Theme checking
  const savedTheme = localStorage.getItem('theme')
  if (savedTheme === 'dark' || (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    isDarkMode.value = true
    document.documentElement.classList.add('dark')
  }
})
</script>

<style>
/* Page transition animations */
.fade-slide-enter-active,
.fade-slide-leave-active {
  transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
}

.fade-slide-enter-from {
  opacity: 0;
  transform: translateY(10px);
}

.fade-slide-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}

/* Custom CSS animations */
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(15px); }
  to { opacity: 1; transform: translateY(0); }
}

.animate-fade-in {
  animation: fadeIn 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}
</style>
