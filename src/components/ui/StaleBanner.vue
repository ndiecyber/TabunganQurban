<template>
  <div
    v-if="visible"
    class="flex items-center justify-between gap-2 px-4 py-2.5 mb-3 bg-amber-50 dark:bg-amber-900/10 border border-amber-200 dark:border-amber-800/30 rounded-xl text-amber-800 dark:text-amber-300"
  >
    <div class="flex items-center gap-2 text-xs font-medium">
      <svg class="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
      <span>Menampilkan data tersimpan</span>
    </div>
    <button
      @click="$emit('refresh')"
      class="shrink-0 px-3 py-1 bg-amber-200/50 dark:bg-amber-800/30 hover:bg-amber-200 dark:hover:bg-amber-800/50 rounded-lg text-xs font-bold transition-colors cursor-pointer"
    >
      Refresh ↻
    </button>
  </div>
</template>

<script setup>
defineProps({
  visible: {
    type: Boolean,
    default: false
  }
})
defineEmits(['refresh'])
</script>
