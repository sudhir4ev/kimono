import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import medusaManifest from '@evooq/vite-plugin-medusa-manifest';

export default defineConfig((configEnv) => {
  const isDevelopment = configEnv.mode === 'development'

  return {
    plugins: [
      react(),
      medusaManifest()
    ],
    build: {
      rollupOptions: {
        external: ['@evooq/medusa-core'],
        input: {
          microfrontend: 'main-microfrontend.ts',
          standalone: 'index.html',
        },
        output: {
          entryFileNames: 'freyja-[name].[hash].js',
          format: 'system',
          dir: './dist',
        },
        preserveEntrySignatures: 'exports-only',
      },
      minify: false,
      manifest: true,
    }
  }
})
