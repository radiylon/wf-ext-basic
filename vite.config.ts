import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import wfHotReload from "@xatom/wf-app-hot-reload";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(), 
    tailwindcss(),
    wfHotReload()
  ],
  server: {
    port: 1337
  }
})
