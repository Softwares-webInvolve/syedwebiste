import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    host: true,
  },
  build: {
    chunkSizeWarningLimit: 900,
    rollupOptions: {
      output: {
        // Split heavy libs into their own cacheable chunks. Combined with the
        // lazy import of the hero shader, `three` stays out of the critical path.
        manualChunks(id) {
          if (id.includes("node_modules")) {
            if (id.includes("three")) return "three";
            if (id.includes("gsap")) return "gsap";
            if (id.includes("react-router") || id.includes("react-dom") || id.includes("/react/"))
              return "react";
          }
        },
      },
    },
  },
});
