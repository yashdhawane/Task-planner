import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  build: {
    outDir: 'dist',
    rollupOptions: {
      external: ['axios'], // Explicitly mark axios as an external dependency
    },
  },
  plugins: [react()],
})
