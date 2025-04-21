import tailwindcss from "@tailwindcss/vite";
import react from '@vitejs/plugin-react';
import path, { resolve } from "path";
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    watch:{
      include:["src/**/*","popup.html"]
    },
    rollupOptions: {
      input: {
        popup: resolve(__dirname, 'popup.html'),
        content: resolve(__dirname, 'src/content-scripts/index.tsx'),
        background: resolve(__dirname, 'src/background.ts'),
      },
      output: [
        {
          // Output untuk popup
          entryFileNames: 'content.js', // popup.js di folder 
          format: 'iife', // gunakan IIFE untuk popup
          dir: 'dist' // output ke folder dist
        },
        {
          // Output untuk content script
          entryFileNames: 'popup.js', // content.js di folder 
          format: 'esm', // gunakan IIFE untuk content script
          dir: 'dist' // output ke folder dist
        }
      ]
    },
    outDir: 'dist',
    emptyOutDir: true,
  }
});
