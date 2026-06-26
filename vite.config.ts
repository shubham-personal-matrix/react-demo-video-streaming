import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      // lets us write:  import '../../core/index'
      // inside the react app without leaving src/
      '@core': resolve(__dirname, '../../src'),
    },
  },
  server: {
    port: 5174,
  },
})
