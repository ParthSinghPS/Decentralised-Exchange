import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(),],
  darkMode: 'class',
  extend: {
  animation: {
    float: "float 10s linear infinite"
  },
  keyframes: {
    float: {
      "0%": { transform: "translateY(0) rotate(0deg)" },
      "100%": { transform: "translateY(-200px) rotate(360deg)" },
    },
  },
}

})



