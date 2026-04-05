import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  // If your GitHub repo URL is https://github.com/username/My-Drive-App
  // This MUST be '/My-Drive-App/'
  base: '/Google-Drive-Analyzer-/', 
})
