import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig((configEnv) => {
  const isDevelopment = configEnv.mode === 'development'

  return {
    plugins: [
      react()
    ],
    build: {
      minify: false
    }
  }
})
