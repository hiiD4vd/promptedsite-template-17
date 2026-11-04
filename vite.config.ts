import { mediaPlugin } from './scripts/media-plugin.ts';
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [mediaPlugin(),
    react(),
    tailwindcss(),
  ],
  server: {
    port: 5191,
    host: true
  }
})
