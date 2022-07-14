import vue from '@vitejs/plugin-vue'
import { defineConfig, loadEnv } from 'vite'
const path = require('path')

export default defineConfig(({ command, mode }) => {
  const env = loadEnv(mode, process.cwd(), '')

  return {
    plugins: [vue()],
    server:{
      host: true,
      port: Number(env.VITE_PORT)
    }
  }
})