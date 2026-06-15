<template>
  <nav class="fixed bottom-0 left-0 right-0 w-full bg-white dark:bg-gray-900 border-t border-gray-200/80 dark:border-white/10 z-50 px-2 pt-2 pb-[calc(0.5rem+env(safe-area-inset-bottom,0))] shadow-[0_-4px_25px_rgba(0,0,0,0.05)]">
    <div class="grid grid-cols-5 items-end max-w-md mx-auto">
      
      <router-link to="/" class="flex flex-col items-center gap-1.5 group pb-1" exact-active-class="is-active">
        <LayoutDashboardIcon class="w-6 h-6 text-gray-400 group-[.is-active]:text-teal-600 transition-colors" />
        <span class="text-[9px] font-bold text-gray-500 group-[.is-active]:text-teal-600">Dashboard</span>
      </router-link>

      <router-link to="/shohibul" class="flex flex-col items-center gap-1.5 group pb-1" active-class="is-active">
        <UsersIcon class="w-6 h-6 text-gray-400 group-[.is-active]:text-teal-600 transition-colors" />
        <span class="text-[9px] font-bold text-gray-500 group-[.is-active]:text-teal-600">Shohibul</span>
      </router-link>

      <div class="flex justify-center relative z-10 -mt-6">
        <router-link to="/menabung" class="flex flex-col items-center group" active-class="is-active">
          <div class="w-12 h-12 rounded-full bg-teal-600 text-white flex items-center justify-center shadow-lg shadow-teal-600/30 group-hover:bg-teal-700 border-4 border-white dark:border-gray-900 mb-1">
            <WalletIcon class="w-5 h-5" />
          </div>
          <span class="text-[9px] font-bold text-teal-600">Tabung</span>
        </router-link>
      </div>

      <button @click="openKalkulator" class="flex flex-col items-center gap-1.5 group pb-1 cursor-pointer">
        <CalculatorIcon class="w-6 h-6 text-gray-400 group-[.is-active]:text-teal-600 transition-colors" :class="{ 'text-teal-600': isKalkulatorActive }" />
        <span class="text-[9px] font-bold text-gray-500 group-[.is-active]:text-teal-600" :class="{ 'text-teal-600': isKalkulatorActive }">Kalkulator</span>
      </button>

      <router-link to="/rekap" class="flex flex-col items-center gap-1.5 group pb-1" active-class="is-active">
        <FileTextIcon class="w-6 h-6 text-gray-400 group-[.is-active]:text-teal-600 transition-colors" />
        <span class="text-[9px] font-bold text-gray-500 group-[.is-active]:text-teal-600">Rekap</span>
      </router-link>

    </div>
  </nav>
</template>

<script setup>
import { computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { LayoutDashboardIcon, UsersIcon, WalletIcon, FileTextIcon, CalculatorIcon } from 'lucide-vue-next'

const router = useRouter()
const route = useRoute()

const isKalkulatorActive = computed(() => route.path === '/menabung' && route.query.modal === 'kalkulator')

const openKalkulator = () => {
  router.push({ path: '/menabung', query: { modal: 'kalkulator', t: Date.now() } })
}
</script>