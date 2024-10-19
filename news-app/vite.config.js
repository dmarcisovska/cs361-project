import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // server: {
  //   proxy: {
  //     '/api': {
  //       target: 'https://api.currentsapi.services',
  //       changeOrigin: true, // Needed for virtual hosted sites
  //       rewrite: (path) => path.replace(/^\/api/, '') // Remove '/api' prefix
  //     }
  //   }
  // }
})
