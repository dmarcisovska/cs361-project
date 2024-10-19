import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import svgr from 'vite-plugin-svgr';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), svgr()], // Corrected plugins array

  // server: {
  //   proxy: {
  //     '/api': {
  //       target: 'https://api.currentsapi.services',
  //       changeOrigin: true, // Needed for virtual hosted sites
  //       rewrite: (path) => path.replace(/^\/api/, '') // Remove '/api' prefix
  //     }
  //   }
  // }
});

