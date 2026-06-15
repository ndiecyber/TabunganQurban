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

      <div class="flex justify-center relative z-10 -mt-7">
        <router-link to="/menabung" class="flex flex-col items-center group" active-class="is-active">
          <div class="relative flex items-center justify-center mb-1">
             <!-- Main Button -->
             <div class="relative w-14 h-14 rounded-full bg-gradient-to-tr from-primary to-[#2dd4bf] text-white flex items-center justify-center shadow-[0_8px_16px_rgba(13,148,136,0.4)] group-hover:shadow-[0_12px_24px_rgba(13,148,136,0.6)] group-hover:-translate-y-1 group-active:translate-y-0 group-active:scale-95 border-4 border-white dark:border-gray-900 transition-all duration-300 z-10">
               <WalletIcon class="w-6 h-6 group-hover:animate-bounce" />
             </div>
          </div>
          <span class="text-[10px] font-extrabold text-primary dark:text-primary-light transition-all group-hover:scale-105">Tabung</span>
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
