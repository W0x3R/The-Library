import { defineConfig } from "vite";
import cssInjectedByJsPlugin from "vite-plugin-css-injected-by-js";

export default defineConfig({
  base: "/The-Library/",
  plugins: [cssInjectedByJsPlugin()],
  build: {
    outDir: "dist",
    assetsDir: "assets",
    emptyOutDir: true,
    target: "es2015",
    sourcemap: false,
    rollupOptions: {
      output: {
        entryFileNames: "main.js",
        assetFileNames: "assets/[name][extname]",
      },
    },
  },
  server: {
    port: 3000,
    host: "0.0.0.0",
  },
});
