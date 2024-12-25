import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: [{ find: "@", replacement: "/src" }],
  },
  build: {
    // Minification: Using esbuild for fast minification
    minify: 'esbuild', // Alternatively, you can use 'terser' for a smaller but slower build

    // Enable tree-shaking (default behavior)
    // Vite uses ES Modules (ESM) by default, enabling tree-shaking automatically
    treeshake: true, 

    // Code Splitting: Split the vendor libraries into a separate chunk
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            // Splitting vendor libraries from application code
            return 'vendor'; // All node_modules will go into 'vendor.js'
          }
        },
      },
    },

    // Enable source maps only for development
   // sourcemap: process.env.NODE_ENV === 'production' ? false : true,
  },
  
  server: {
    hmr: true,
    host: true, // This makes the server accessible externally
    port: 3000, // Default Vite port
  },
});
