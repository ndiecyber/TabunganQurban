<template>
  <nav class="fixed bottom-0 left-0 right-0 bg-white/95 dark:bg-gray-900/95 border-t border-gray-200/50 dark:border-gray-800/50 px-6 py-2.5 flex justify-between items-center z-40 backdrop-blur-lg shadow-[0_-8px_30px_rgba(0,0,0,0.03)] pb-[calc(10px+env(safe-area-inset-bottom,0px))]">
    
    <!-- Navigation Item: Dashboard -->
    <router-link 
      to="/" 
      class="flex flex-col items-center justify-center space-y-1 flex-1 relative py-1 text-xs font-semibold transition-all duration-300"
      :class="isRouteActive('/') ? 'text-primary dark:text-primary-light scale-105' : 'text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300'"
    >
      <LayoutDashboard class="w-5.5 h-5.5 transition-transform duration-300" />
      <span>Dashboard</span>
      <!-- Active indicator dot -->
      <span v-if="isRouteActive('/')" class="absolute bottom-[-4px] w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse"></span>
    </router-link>

    <!-- Navigation Item: Shohibul -->
    <router-link 
      to="/shohibul" 
      class="flex flex-col items-center justify-center space-y-1 flex-1 relative py-1 text-xs font-semibold transition-all duration-300"
      :class="isRouteActive('/shohibul') ? 'text-primary dark:text-primary-light scale-105' : 'text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300'"
    >
      <Users class="w-5.5 h-5.5 transition-transform duration-300" />
      <span>Shohibul</span>
      <span v-if="isRouteActive('/shohibul')" class="absolute bottom-[-4px] w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse"></span>
    </router-link>

    <!-- Navigation Item: Menabung -->
    <router-link 
      to="/menabung" 
      class="flex flex-col items-center justify-center space-y-1 flex-1 relative py-1 text-xs font-semibold transition-all duration-300"
      :class="isRouteActive('/menabung') ? 'text-primary dark:text-primary-light scale-105' : 'text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300'"
    >
      <Wallet class="w-5.5 h-5.5 transition-transform duration-300" />
      <span>Menabung</span>
      <span v-if="isRouteActive('/menabung')" class="absolute bottom-[-4px] w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse"></span>
    </router-link>

    <!-- Navigation Item: Rekap -->
    <router-link 
      to="/rekap" 
      class="flex flex-col items-center justify-center space-y-1 flex-1 relative py-1 text-xs font-semibold transition-all duration-300"
      :class="isRouteActive('/rekap') ? 'text-primary dark:text-primary-light scale-105' : 'text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300'"
    >
      <BarChart3 class="w-5.5 h-5.5 transition-transform duration-300" />
      <span>Rekap</span>
      <span v-if="isRouteActive('/rekap')" class="absolute bottom-[-4px] w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse"></span>
    </router-link>

  </nav>
</template>

<script setup>
import { useRoute } from 'vue-router'
import { 
  LayoutDashboard, 
  Users, 
  Wallet, 
  BarChart3 
} from 'lucide-vue-next'

const route = useRoute()

const isRouteActive = (path) => {
  if (path === '/') {
    return route.path === '/'
  }
  return route.path.startsWith(path)
}
</script>
