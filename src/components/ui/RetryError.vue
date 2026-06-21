<template>
  <div class="flex flex-col items-center justify-center py-12 px-4 text-center">
    <div class="w-14 h-14 rounded-full bg-amber-100 dark:bg-amber-900/20 flex items-center justify-center mb-4">
      <svg class="w-7 h-7 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
      </svg>
    </div>
    <p class="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">{{ message }}</p>
    <p class="text-xs text-gray-500 dark:text-gray-500 mb-4">Periksa koneksi internet Anda dan coba lagi.</p>
    <button
      @click="$emit('retry')"
      class="px-5 py-2.5 bg-primary hover:bg-primary/90 text-white rounded-xl text-sm font-bold transition-colors shadow-md cursor-pointer"
    >
      Coba Lagi
    </button>
  </div>
</template>

<script setup>
defineProps({
  message: {
    type: String,
    default: 'Gagal memuat data'
  }
})
defineEmits(['retry'])
</script>
