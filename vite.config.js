import { defineConfig } from "vite";
import cssInjectedByJsPlugin from "vite-plugin-css-injected-by-js";
import htmlMinifier from "vite-plugin-html-minifier";

export default defineConfig({
  plugins: [
    cssInjectedByJsPlugin(),
    htmlMinifier({
      collapseWhitespace: true,
      removeComments: true,
      minifyCSS: true,
    }),
  ],
  build: {
    outDir: "dist",
    assetsDir: "assets",
    emptyOutDir: true,
    target: "es2015",
    sourcemap: false,
    cssCodeSplit: false,
    rollupOptions: {
      output: {
        entryFileNames: "main.js",
        assetFileNames: "assets/[name][extname]",
        manualChunks: undefined,
      },
    },
  },
  server: {
    port: 3000,
  },
});
