
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: "/React-Crud-App/",   // 👈 yahan apne repo ka naam likhna hai
})
