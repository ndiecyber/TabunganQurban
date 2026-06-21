<template>
  <div class="animate-pulse">
    <!-- Hero variant: main dashboard hero card -->
    <template v-if="variant === 'hero'">
      <div class="bg-gray-200 dark:bg-white/[0.06] rounded-[2rem] h-64 mb-3"></div>
    </template>

    <!-- Stats variant: quick stats row -->
    <template v-else-if="variant === 'stats'">
      <div class="bg-gray-200 dark:bg-white/[0.06] rounded-[1.5rem] h-24 mb-3"></div>
    </template>

    <!-- Card variant: dashboard stat cards -->
    <template v-else-if="variant === 'card'">
      <div v-for="i in count" :key="i" class="bg-gray-200 dark:bg-white/[0.06] rounded-[1.5rem] h-32 mb-3"></div>
    </template>

    <!-- Row variant: list items -->
    <template v-else-if="variant === 'row'">
      <div v-for="i in count" :key="i" class="flex items-center gap-3 py-3 px-3">
        <div class="w-10 h-10 rounded-[1rem] bg-gray-200 dark:bg-white/[0.06] shrink-0"></div>
        <div class="flex-1 space-y-2">
          <div class="h-3 bg-gray-200 dark:bg-white/[0.06] rounded-full w-3/4"></div>
          <div class="h-2.5 bg-gray-200 dark:bg-white/[0.06] rounded-full w-1/2"></div>
        </div>
        <div class="h-4 bg-gray-200 dark:bg-white/[0.06] rounded-full w-16"></div>
      </div>
    </template>

    <!-- Chart variant: chart area -->
    <template v-else-if="variant === 'chart'">
      <div class="bg-gray-200 dark:bg-white/[0.06] rounded-[1.5rem] h-48 mb-3"></div>
    </template>
  </div>
</template>

<script setup>
defineProps({
  variant: {
    type: String,
    default: 'card',
    validator: (v) => ['card', 'row', 'chart', 'hero', 'stats'].includes(v)
  },
  count: {
    type: Number,
    default: 1
  }
})
</script>
