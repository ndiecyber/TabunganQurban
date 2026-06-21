<template>
  <Teleport to="body">
    <div class="fixed top-4 left-1/2 -translate-x-1/2 sm:left-auto sm:translate-x-0 sm:right-4 z-[100] flex flex-col gap-2 w-[90vw] sm:w-80 pointer-events-none">
      <TransitionGroup name="toast">
        <div
          v-for="toast in toasts"
          :key="toast.id"
          class="pointer-events-auto rounded-xl px-4 py-3 shadow-lg border backdrop-blur-xl flex items-start gap-3 cursor-pointer transition-all duration-300"
          :class="toastClasses(toast.type)"
          @click="remove(toast.id)"
        >
          <div class="shrink-0 mt-0.5">
            <svg v-if="toast.type === 'success'" class="w-5 h-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <svg v-else-if="toast.type === 'error'" class="w-5 h-5 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <svg v-else class="w-5 h-5 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>
          <p class="text-sm font-medium leading-tight flex-1">{{ toast.message }}</p>
        </div>
      </TransitionGroup>
    </div>
  </Teleport>
</template>

<script setup>
import { useToast } from '@/composables/useToast'

const { toasts, remove } = useToast()

const toastClasses = (type) => ({
  'bg-white/95 dark:bg-gray-800/95 border-green-200 dark:border-green-800/40 text-green-800 dark:text-green-200': type === 'success',
  'bg-white/95 dark:bg-gray-800/95 border-red-200 dark:border-red-800/40 text-red-800 dark:text-red-200': type === 'error',
  'bg-white/95 dark:bg-gray-800/95 border-amber-200 dark:border-amber-800/40 text-amber-800 dark:text-amber-200': type === 'warning',
})
</script>

<style scoped>
.toast-enter-active {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}
.toast-leave-active {
  transition: all 0.3s cubic-bezier(0.4, 0, 1, 1);
}
.toast-enter-from {
  opacity: 0;
  transform: translateY(-12px) scale(0.95);
}
.toast-leave-to {
  opacity: 0;
  transform: translateY(-8px) scale(0.95);
}
.toast-move {
  transition: transform 0.3s ease;
}
</style>
