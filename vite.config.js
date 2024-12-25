import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: [{ find: "@", replacement: "/src" }],
  },
  
  server: {
    hmr: true,
    host: true, // This makes the server accessible externally
    port: 3000, // Default Vite port
  },
});
