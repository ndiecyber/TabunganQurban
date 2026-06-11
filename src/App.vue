<template>
  <div 
    :class="[
      { 'dark': store.isDarkMode }
    ]" 
    class="min-h-screen transition-colors duration-300"
  >
    <div class="min-h-screen bg-light-warm dark:bg-dark text-gray-900 dark:text-gray-100 font-sans flex flex-col relative islamic-pattern-bg transition-all duration-300">
      
      <!-- 1. DESKTOP HEADER (Visible only on desktop/tablet) -->
      <header class="hidden md:block sticky top-0 z-40 bg-white/95 dark:bg-gray-900/95 border-b border-gray-200/50 dark:border-gray-800/50 backdrop-blur-lg shadow-sm">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <!-- Logo & Title -->
          <router-link to="/" class="flex items-center space-x-3">
            <img :src="store.isDarkMode ? '/logo-kassiti-dark.png' : '/logo-kassiti-light.png'" alt="DKM Jami Kassiti" class="h-10 w-auto" />
            <div class="border-l border-gray-200 dark:border-gray-800 pl-3">
              <span class="sr-only">DKM Jami Kassiti</span>
              <h1 class="text-base font-extrabold text-[#10513c] dark:text-[#a7f3d0] leading-tight font-heading">Tabungan Qurban</h1>
            </div>
          </router-link>

          <!-- Desktop Navigation Links -->
          <nav class="flex items-center space-x-1">
            <router-link 
              v-for="item in navItems" 
              :key="item.path" 
              :to="item.path"
              class="px-4 py-2 text-sm font-semibold rounded-xl transition duration-150 relative"
              :class="isRouteActive(item.path) ? 'text-primary dark:text-primary-light bg-primary/5 dark:bg-primary/10' : 'text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-white'"
            >
              {{ item.name }}
              <span v-if="isRouteActive(item.path)" class="absolute bottom-0 left-4 right-4 h-0.5 bg-primary dark:bg-primary-light rounded-full"></span>
            </router-link>
          </nav>

          <!-- Action Buttons / Theme Toggle -->
          <div class="flex items-center space-x-3">
            <span class="hidden lg:inline-block px-3 py-1 bg-amber-100 dark:bg-amber-900/30 border border-amber-200 dark:border-amber-700/50 rounded-xl text-xs font-bold text-amber-700 dark:text-amber-400 font-arabic">
              {{ currentHijriDate }}
            </span>
            <button 
              @click="store.toggleTheme()" 
              class="p-2 rounded-xl bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition cursor-pointer" 
              aria-label="Toggle Dark Mode"
            >
              <svg v-if="store.isDarkMode" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-amber-400" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.46 5.05l-.707-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 100 2h1z" clip-rule="evenodd" />
              </svg>
              <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-emerald-700" viewBox="0 0 20 20" fill="currentColor">
                <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
              </svg>
            </button>
            
            <a 
              href="https://masjidkassiti.id" 
              target="_blank" 
              class="inline-flex items-center space-x-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-primary hover:bg-primary-light text-white transition shadow-sm glow-primary"
            >
              <span>Kembali Ke Masjid</span>
              <svg xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
          </div>
        </div>
      </header>

      <!-- 2. MOBILE PERSISTENT GREEN HEADER (Visible only on mobile/tablet, md:hidden) -->
      <div class="md:hidden dashboard-header sticky top-0 z-30 bg-gradient-to-b from-[#10513c] to-[#0a3829] text-white pt-5 pb-4 px-5 rounded-b-[2rem] shadow-lg overflow-hidden">
        <!-- Background decorative elements to replicate screenshot's circles -->
        <div class="absolute right-[-40px] top-[-30px] w-40 h-40 rounded-full bg-white/5 border border-white/5 pointer-events-none"></div>
        <div class="absolute left-[-20px] bottom-[-20px] w-28 h-28 rounded-full bg-white/5 pointer-events-none"></div>

        <!-- Top Row: Logo, Title, and Year Tag -->
        <div class="flex justify-between items-center relative z-10">
          <div class="flex items-center space-x-2.5">
            <img src="/logo-kassiti-dark.png" alt="DKM Logo" class="h-8.5 w-auto" />
            <div class="border-l border-white/20 pl-2">
              <h2 class="text-xs font-bold tracking-wide font-heading">Tabungan Qurban</h2>
              <span class="sr-only">DKM Masjid Jami Kassiti</span>
            </div>
          </div>
          <div class="flex items-center space-x-2">
            <!-- Mobile Dark Mode Toggle Button -->
            <button 
              @click="store.toggleTheme()" 
              class="p-1.5 rounded-lg bg-emerald-950/40 hover:bg-emerald-900/50 border border-emerald-700/30 text-emerald-200 transition cursor-pointer"
              aria-label="Toggle Dark Mode"
            >
              <svg v-if="store.isDarkMode" xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5 text-amber-400" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.46 5.05l-.707-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 100 2h1z" clip-rule="evenodd" />
              </svg>
              <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5 text-emerald-200" viewBox="0 0 20 20" fill="currentColor">
                <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
              </svg>
            </button>
            <span class="px-2 py-0.5 bg-emerald-950/40 border border-emerald-700/50 rounded text-[9px] font-black uppercase tracking-wider text-emerald-300">
              IDUL ADHA 2025
            </span>
          </div>
        </div>

        <!-- Middle Row: Welcome Budi Santoso -->
        <div class="mt-4 relative z-10 flex justify-between items-start">
          <div>
            <span class="text-[10px] text-emerald-200/80">Selamat datang,</span>
            <h3 class="text-base font-bold mt-0.5">Budi Santoso</h3>
            <p class="text-[9px] text-emerald-100/60 flex items-center mt-1">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3 mr-1 text-amber-400 shrink-0" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clip-rule="evenodd" />
              </svg>
              Rumah A01 - Perumahan Arjamukti
            </p>
          </div>
          <div class="text-right shrink-0 ml-2">
            <span class="px-2 py-1 bg-amber-900/40 border border-amber-700/50 rounded-lg text-[10px] font-bold uppercase tracking-wider text-amber-300 font-arabic shadow-sm block">
              {{ currentHijriDate }}
            </span>
          </div>
        </div>

        <!-- Bottom Row of Header: Last Month Payment status (Iuran Juni 2025 Rp 25.000 Lunas) -->
        <div class="mt-3 bg-white/10 rounded-2xl p-2.5 flex justify-between items-center text-xs backdrop-blur-sm relative z-10">
          <span class="text-[10px] text-emerald-100">Iuran Juni 2025</span>
          <span class="font-extrabold text-white">Rp 25.000</span>
          <span class="px-2.5 py-0.5 bg-white text-emerald-900 rounded-full text-[9px] font-black uppercase">Lunas</span>
        </div>

        <!-- Embedded Navigation Tabs (Exactly matching the screenshot green bar) -->
        <div class="mt-4 pt-3 border-t border-white/10 flex justify-between items-center text-center relative z-10">
          <router-link 
            v-for="item in navItems" 
            :key="item.path" 
            :to="item.path"
            class="flex flex-col items-center justify-center space-y-1.5 flex-1 py-1 text-[10px] font-bold transition duration-200"
            :class="isRouteActive(item.path) ? 'text-white scale-105 font-extrabold relative' : 'text-emerald-200/60 hover:text-white'"
          >
            <component :is="item.icon" class="w-4 h-4" />
            <span>{{ item.name }}</span>
            <span v-if="isRouteActive(item.path)" class="absolute bottom-[-8px] left-1/4 right-1/4 h-[3px] bg-white rounded-full"></span>
          </router-link>
        </div>
      </div>

      <!-- Main Layout Body -->
      <main class="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-5 pb-24 md:pb-8">
        <!-- Main Router view with transitions -->
        <router-view v-slot="{ Component }">
          <transition name="fade-slide" mode="out-in">
            <component :is="Component" :key="route.path" />
          </transition>
        </router-view>
      </main>

      <!-- Bottom Nav (Visible only on mobile/tablet) -->
      <BottomNav class="md:hidden" />

    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useQurbanStore } from '@/stores/qurban'
import BottomNav from '@/components/layout/BottomNav.vue'
import { 
  LayoutDashboard, 
  Users, 
  Wallet, 
  BarChart3 
} from 'lucide-vue-next'

const route = useRoute()
const store = useQurbanStore()


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
