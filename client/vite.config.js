// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'

// // https://vite.dev/config/
// export default defineConfig({
//   plugins: [react()],
//   server: {
//     '/api': {
//       target: "http://localhost:4000",
//       changeOrigin: true
//     }
//   }
// })

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // Add the proxy configuration here
      '/api': {
        target: 'http://localhost:4000',
        changeOrigin: true,
        
      },
    },
  },
});