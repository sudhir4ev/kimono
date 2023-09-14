/// <reference types="vitest" />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { nxViteTsPaths } from '@nx/vite/plugins/nx-tsconfig-paths.plugin';

export default defineConfig({
  cacheDir: '../../node_modules/.vite/nx-react-vite-single-spa',

  server: {
    port: 4200,
    host: 'localhost',
  },

  build: {
    manifest: true,
    rollupOptions: {
      input: {
        index: `${__dirname}/index.html`,
        microfrontend: `${__dirname}/src/main-microfrontend.tsx`,
      },
      output: {
        format: 'system'
      },
      preserveEntrySignatures: 'exports-only',
    },
    minify: false
  },

  preview: {
    port: 4300,
    host: 'localhost',
  },

  plugins: [react(), nxViteTsPaths()],

  // Uncomment this if you are using workers.
  // worker: {
  //  plugins: [ nxViteTsPaths() ],
  // },

  // test: {
  //   globals: true,
  //   cache: {
  //     dir: '../../node_modules/.vitest',
  //   },
  //   environment: 'jsdom',
  //   include: ['src/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
  // },
});
