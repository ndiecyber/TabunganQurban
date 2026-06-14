<template>
  <div 
    :class="{ 'dark': store.isDarkMode }" 
    class="min-h-screen transition-colors duration-300"
  >
    <div class="min-h-screen bg-light-warm dark:bg-dark text-gray-900 dark:text-gray-100 font-sans flex flex-col relative islamic-pattern-bg transition-all duration-500">
      
      <!-- ========== DESKTOP HEADER (Hidden on mobile) ========== -->
      <header class="hidden md:block sticky top-0 z-40 bg-white/98 dark:bg-dark/98 border-b border-gray-200 dark:border-white/5 backdrop-blur-lg shadow-sm transition-all duration-500">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <!-- Logo & Title -->
          <a href="https://masjidkassiti.id" class="flex items-center space-x-3 group">
            <div>
              <h1 class="text-base font-bold text-primary dark:text-primary-light leading-tight">Tabungan Qurban</h1>
              <span class="block text-[11px] text-gray-400 dark:text-gray-500 font-medium mt-0.5">DKM Masjid Jami Kassiti</span>
              <span class="block text-[10px] text-gray-400 dark:text-gray-500 font-medium mt-0.5">Qurban Bersama Untuk Sesama</span>
            </div>
          </a>

          <!-- Desktop Navigation Links -->
          <nav class="flex items-center space-x-1">
            <router-link 
              v-for="item in navItems" 
              :key="item.path" 
              :to="item.path"
              class="px-4 py-2 text-sm font-semibold rounded-xl transition duration-300 relative group"
              :class="isRouteActive(item.path) 
                ? 'text-primary dark:text-secondary bg-primary/5 dark:bg-primary/10' 
                : 'text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-white'"
            >
              {{ item.name }}
              <!-- Animated underline matching WebDKM -->
              <span 
                class="absolute bottom-1 left-4 right-4 h-[2px] rounded-full transition-transform duration-300 origin-center"
                :class="[
                  isRouteActive(item.path) ? 'bg-primary dark:bg-secondary scale-x-100' : 'bg-primary dark:bg-secondary scale-x-0 group-hover:scale-x-50'
                ]"
              ></span>
            </router-link>
          </nav>

          <!-- Action Buttons / Theme Toggle -->
          <div class="flex items-center space-x-3">
            <!-- Dark Mode Toggle -->
            <button 
              @click="store.toggleTheme()" 
              class="p-2.5 rounded-xl transition cursor-pointer flex items-center justify-center"
              :class="store.isDarkMode 
                ? 'bg-white/5 border border-white/10 text-white hover:bg-white/10' 
                : 'bg-gray-100 border border-gray-200 text-gray-600 hover:bg-gray-200'"
              aria-label="Toggle Dark Mode"
            >
              <svg v-if="store.isDarkMode" xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-amber-400" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.46 5.05l-.707-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 100 2h1z" clip-rule="evenodd" />
              </svg>
              <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
              </svg>
            </button>
            
            <a 
              href="https://masjidkassiti.id" 
              target="_blank" 
              class="inline-flex items-center space-x-1.5 px-5 py-2.5 rounded-full text-xs font-bold bg-secondary hover:bg-white hover:text-dark text-white transition-all duration-300 shadow-lg shadow-secondary/20"
            >
              <span>Masjid Kassiti</span>
              <svg xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
          </div>
        </div>
      </header>

      <!-- ========== MOBILE HEADER (Visible on mobile only) ========== -->
      <div class="md:hidden sticky top-0 z-40">
        <!-- Top Bar: Logo + Actions -->
        <div class="bg-white/95 dark:bg-dark/95 backdrop-blur-xl border-b border-gray-200/50 dark:border-white/5 px-4 pt-3 pb-2 shadow-sm transition-all duration-500">
          <div class="flex justify-between items-center">
            <a href="https://masjidkassiti.id" class="flex items-center space-x-3">
              <div>
                <h2 class="text-sm font-bold text-primary dark:text-primary-light leading-tight">Tabungan Qurban</h2>
                <span class="block text-[10px] text-gray-400 dark:text-gray-500 font-medium mt-0.5">DKM Masjid Jami Kassiti</span>
                <span class="block text-[9px] text-gray-400 dark:text-gray-500 font-bold tracking-wide mt-0.5">Qurban Bersama Untuk Sesama</span>
              </div>
            </a>
            <div class="flex items-center space-x-2">
              <!-- Mobile Dark Mode Toggle -->
              <button 
                @click="store.toggleTheme()" 
                class="p-2 rounded-xl transition cursor-pointer"
                :class="store.isDarkMode 
                  ? 'bg-white/5 border border-white/10 text-white hover:bg-white/10' 
                  : 'bg-gray-100 border border-gray-200 text-gray-600 hover:bg-gray-200'"
                aria-label="Toggle Dark Mode"
              >
                <svg v-if="store.isDarkMode" xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-amber-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.46 5.05l-.707-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 100 2h1z" clip-rule="evenodd" />
                </svg>
                <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        <!-- Navigation Tab Bar -->
        <div class="bg-white/90 dark:bg-dark/90 backdrop-blur-xl border-b border-gray-200/30 dark:border-white/5 px-2 shadow-sm">
          <div class="flex items-center justify-around">
            <router-link 
              v-for="item in navItems" 
              :key="item.path" 
              :to="item.path"
              class="flex flex-col items-center justify-center py-2 px-3 text-[10px] font-semibold transition duration-200 relative"
              :class="isRouteActive(item.path) 
                ? 'text-primary dark:text-secondary font-bold' 
                : 'text-gray-400 dark:text-gray-500 hover:text-gray-600'"
            >
              <component :is="item.icon" class="w-4.5 h-4.5 mb-0.5" />
              <span>{{ item.name }}</span>
              <span 
                v-if="isRouteActive(item.path)" 
                class="absolute bottom-0 left-2 right-2 h-[2px] bg-primary dark:bg-secondary rounded-full"
              ></span>
            </router-link>
          </div>
        </div>
      </div>

      <!-- Main Layout Body -->
      <main class="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-5 pb-8">
        <!-- Main Router view with transitions -->
        <router-view v-slot="{ Component }">
          <transition name="fade-slide" mode="out-in">
            <component :is="Component" :key="route.path" />
          </transition>
        </router-view>
      </main>

      <!-- Footer -->
      <footer class="border-t border-gray-200/50 dark:border-white/5 py-6 text-center">
        <div class="max-w-7xl mx-auto px-4">
          <p class="text-xs text-gray-400 dark:text-gray-600">
            © 2025 DKM Masjid Jami Kassiti — Tabungan Qurban
          </p>
        </div>
      </footer>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useQurbanStore } from '@/stores/qurban'

import { 
  LayoutDashboard, 
  Users, 
  Wallet, 
  BarChart3 
} from 'lucide-vue-next'

const route = useRoute()
const store = useQurbanStore()
const errorMsg = ref("")
window.addEventListener("error", (e) => errorMsg.value += e.message + " | ")
window.addEventListener("unhandledrejection", (e) => errorMsg.value += e.reason + " | ")


const navItems = [
  { name: 'Dashboard', path: '/', icon: LayoutDashboard },
  { name: 'Shohibul', path: '/shohibul', icon: Users },
  { name: 'Menabung', path: '/menabung', icon: Wallet },
  { name: 'Rekap', path: '/rekap', icon: BarChart3 }
]

// Current Islamic Hijri Date Calculation
const currentHijriDate = new Intl.DateTimeFormat('id-ID', {
  calendar: 'islamic-umalqura',
  day: 'numeric',
  month: 'long',
  year: 'numeric'
}).format(new Date());

const isRouteActive = (path) => {
  if (path === '/') {
    return route.path === '/'
  }
  return route.path.startsWith(path)
}

// Load mock data on initialization
store.initializeStore()

// Initialize theme from store
store.initializeTheme()

onMounted(() => {
  // Theme and store are initialized during setup
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

/* Hide scrollbar for Chrome, Safari and Opera */
.no-scrollbar::-webkit-scrollbar {
  display: none;
}
/* Hide scrollbar for IE, Edge and Firefox */
.no-scrollbar {
  -ms-overflow-style: none;  /* IE and Edge */
  scrollbar-width: none;  /* Firefox */
}
</style>
