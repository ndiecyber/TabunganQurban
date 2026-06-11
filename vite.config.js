import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import tailwindcss from '@tailwindcss/vite'
import { fileURLToPath, URL } from 'node:url'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue(), tailwindcss()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('vue')) return 'vendor-vue'
            if (id.includes('gsap')) return 'vendor-gsap'
            if (id.includes('lucide')) return 'vendor-lucide'
            if (id.includes('apexcharts')) return 'vendor-apexcharts'
            return 'vendor-core'
          }
        }
      }
    },
    chunkSizeWarningLimit: 1000
  }
})
