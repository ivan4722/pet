import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: "build"
  },
  server: {
    host: "localhost", // Change host to localhost
    port: 3000,
    strictPort: true,
    hmr: {
      // Remove the clientPort line if you're not using SSL
    }
  }
});
