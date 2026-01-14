export default {
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
      },
    },
  },
  server: {
    port: 3000,
  },
};
