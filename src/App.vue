<template>
  <div 
    :class="[
      { 'dark': store.isDarkMode },
      'theme-' + store.designSystem.theme,
      'style-' + store.designSystem.style,
      'spacing-' + store.designSystem.spacing,
      'font-' + store.designSystem.font
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
        <div class="mt-4 relative z-10">
          <span class="text-[10px] text-emerald-200/80">Selamat datang,</span>
          <h3 class="text-base font-bold mt-0.5">Budi Santoso</h3>
          <p class="text-[9px] text-emerald-100/60 flex items-center mt-1">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3 mr-1 text-amber-400" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clip-rule="evenodd" />
            </svg>
            Rumah A01 - Perumahan Arjamukti Desa Arjasari
          </p>
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

      <!-- Floating Design Customizer Toggle Button -->
      <button 
        @click="isCustomizerOpen = true" 
        class="fixed bottom-24 right-5 md:bottom-6 md:right-6 z-40 w-11 h-11 rounded-full bg-primary hover:bg-primary-light text-white flex items-center justify-center shadow-lg hover:scale-105 transition cursor-pointer pulse-glow"
        aria-label="Open Customizer"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
          <path stroke-linecap="round" stroke-linejoin="round" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
        </svg>
      </button>

      <!-- Customizer Drawer Panel (Slide-out from Right) -->
      <transition name="slide-right">
        <div v-if="isCustomizerOpen" class="fixed inset-0 z-50 overflow-hidden flex justify-end">
          <!-- Backdrop overlay -->
          <div @click="isCustomizerOpen = false" class="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity"></div>

          <!-- Drawer panel content -->
          <div class="relative w-full max-w-xs bg-white dark:bg-gray-950 shadow-2xl h-full flex flex-col z-10 border-l border-gray-150 dark:border-gray-800">
            <!-- Header -->
            <div class="px-5 py-4 border-b border-gray-150 dark:border-gray-800 flex justify-between items-center bg-gray-50/50 dark:bg-gray-900/40">
              <div>
                <h3 class="text-sm font-extrabold text-gray-800 dark:text-white">Pengaturan Visual</h3>
                <p class="text-[10px] text-gray-400">Kustomisasi layout & visual</p>
              </div>
              <button @click="isCustomizerOpen = false" class="p-1 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-500 dark:text-gray-400 transition cursor-pointer">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4.5 w-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <!-- Options Content -->
            <div class="flex-1 overflow-y-auto p-5 space-y-5">
              <!-- 1. Color Themes -->
              <div class="space-y-2.5">
                <span class="text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider block">Tema Warna</span>
                <div class="grid grid-cols-3 gap-2">
                  <button 
                    v-for="t in themes" 
                    :key="t.value"
                    @click="store.updateDesign('theme', t.value)"
                    class="border rounded-xl p-2.5 text-center cursor-pointer transition flex flex-col items-center justify-center space-y-1.5"
                    :class="store.designSystem.theme === t.value 
                      ? 'border-primary bg-primary/5 dark:bg-primary/10 text-primary dark:text-primary-light font-bold' 
                      : 'border-gray-150 dark:border-gray-800 bg-white dark:bg-gray-900 text-gray-600 dark:text-gray-400'"
                  >
                    <span class="w-5.5 h-5.5 rounded-full border border-black/5" :style="{ backgroundColor: t.color }"></span>
                    <span class="text-[9px] leading-tight">{{ t.label }}</span>
                  </button>
                </div>
              </div>

              <!-- 2. Card Styles -->
              <div class="space-y-2.5">
                <span class="text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider block">Aesthetics Card</span>
                <div class="grid grid-cols-3 gap-2">
                  <button 
                    v-for="s in styles" 
                    :key="s.value"
                    @click="store.updateDesign('style', s.value)"
                    class="border rounded-xl p-2.5 text-[9px] font-bold text-center cursor-pointer transition flex flex-col justify-between items-center min-h-[56px]"
                    :class="store.designSystem.style === s.value 
                      ? 'border-primary bg-primary/5 dark:bg-primary/10 text-primary dark:text-primary-light font-bold' 
                      : 'border-gray-150 dark:border-gray-800 bg-white dark:bg-gray-900 text-gray-500 dark:text-gray-400'"
                  >
                    <span class="text-base">{{ s.icon }}</span>
                    <span>{{ s.label }}</span>
                  </button>
                </div>
              </div>

              <!-- 3. Font Style -->
              <div class="space-y-2.5">
                <span class="text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider block">Gaya Huruf</span>
                <div class="grid grid-cols-3 gap-2">
                  <button 
                    v-for="f in fonts" 
                    :key="f.value"
                    @click="store.updateDesign('font', f.value)"
                    class="border rounded-xl p-2.5 text-center cursor-pointer transition flex flex-col items-center justify-center space-y-1"
                    :class="store.designSystem.font === f.value 
                      ? 'border-primary bg-primary/5 dark:bg-primary/10 text-primary dark:text-primary-light font-bold' 
                      : 'border-gray-150 dark:border-gray-800 bg-white dark:bg-gray-900 text-gray-655 dark:text-gray-400'"
                  >
                    <span class="text-xs font-black" :style="{ fontFamily: f.family }">Aa</span>
                    <span class="text-[9px] leading-tight">{{ f.label }}</span>
                  </button>
                </div>
              </div>

              <!-- 4. Layout Density -->
              <div class="space-y-2.5">
                <span class="text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider block">Kepadatan Layout</span>
                <div class="grid grid-cols-2 gap-2">
                  <button 
                    v-for="sp in spacingOptions" 
                    :key="sp.value"
                    @click="store.updateDesign('spacing', sp.value)"
                    class="border rounded-xl p-2.5 text-[9px] font-bold text-center cursor-pointer transition flex items-center justify-center space-x-1.5"
                    :class="store.designSystem.spacing === sp.value 
                      ? 'border-primary bg-primary/5 dark:bg-primary/10 text-primary dark:text-primary-light font-bold' 
                      : 'border-gray-150 dark:border-gray-800 bg-white dark:bg-gray-900 text-gray-500 dark:text-gray-400'"
                  >
                    <span class="text-sm">{{ sp.icon }}</span>
                    <span>{{ sp.label }}</span>
                  </button>
                </div>
              </div>
            </div>

            <!-- Footer info -->
            <div class="p-4 bg-gray-50 dark:bg-gray-900/40 border-t border-gray-150 dark:border-gray-850 text-center text-[8px] text-gray-400 dark:text-gray-500">
              Visual Customizer v1.0 • Pilihan Instan & Responsif
            </div>
          </div>
        </div>
      </transition>
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

const isCustomizerOpen = ref(false)
const themes = [
  { label: 'Emerald', value: 'emerald', color: '#0b3e2e' },
  { label: 'Indigo', value: 'indigo', color: '#1e1b4b' },
  { label: 'Slate', value: 'slate', color: '#0f172a' }
]
const styles = [
  { label: 'Flat', value: 'flat', icon: '⬜' },
  { label: 'Glass', value: 'glass', icon: '✨' },
  { label: 'Frosted', value: 'frosted', icon: '❄️' }
]
const fonts = [
  { label: 'Jakarta', value: 'jakarta', family: "'Plus Jakarta Sans', sans-serif" },
  { label: 'Inter', value: 'inter', family: "Inter, sans-serif" },
  { label: 'Outfit', value: 'outfit', family: "Outfit, sans-serif" }
]
const spacingOptions = [
  { label: 'Cozy (Spacious)', value: 'cozy', icon: '📱' },
  { label: 'Compact (Optimized)', value: 'compact', icon: '⚡' }
]

const navItems = [
  { name: 'Dashboard', path: '/', icon: LayoutDashboard },
  { name: 'Shohibul', path: '/shohibul', icon: Users },
  { name: 'Menabung', path: '/menabung', icon: Wallet },
  { name: 'Rekap', path: '/rekap', icon: BarChart3 }
]

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

/* Slide-Right transition for design customizer drawer */
.slide-right-enter-active,
.slide-right-leave-active {
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}

.slide-right-enter-from,
.slide-right-leave-to {
  opacity: 0;
}

.slide-right-enter-from > div:last-child {
  transform: translateX(100%);
}

.slide-right-leave-to > div:last-child {
  transform: translateX(100%);
}

.slide-right-enter-to > div:last-child {
  transform: translateX(0);
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
