import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist',     // Vercel’in deploy edeceği klasör
  },
  base: './',            // Eğer Vercel'de alt route'lar varsa, bu önemli
})
