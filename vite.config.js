import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    // Transpile output syntax for slightly older browsers than Vite's default
    target: ['es2019', 'chrome80', 'safari13.1', 'firefox78'],
  },
})

