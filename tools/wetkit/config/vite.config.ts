import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import medusa from "@evooq/vite-plugin-medusa";

export default defineConfig((configEnv) => {
  const isDevelopment = configEnv.mode === "development";
  const isMedusaReady = configEnv.mode === "medusa";

  return {
    plugins: [
      react(),
      isMedusaReady && medusa()
    ],
    build: {
      rollupOptions: {
        external: ["@evooq/medusa-core"],
        input: {
          microfrontend: "main-microfrontend.ts",
          standalone: "index.html"
        },
        output: {
          entryFileNames: "app-[name].[hash].js",
          format: "system",
          dir: "./dist"
        },
        preserveEntrySignatures: "exports-only"
      },
      minify: false,
      manifest: true
    },
    server: {
      port: 3001
    },
    preview: {
      port: 3001
    }
  };
});
