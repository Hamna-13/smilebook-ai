import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8081,
    hmr: {
      overlay: false,
    },
    proxy: {
      // Local dev CORS-safe proxy to an n8n webhook
      "/api/chat": {
        target: "http://localhost:5678",
        changeOrigin: true,
        secure: false,
        rewrite: () =>
          "/webhook/53c136fe-3e77-4709-a143-fe82746dd8b6/chat",
      },
    },
  },
  plugins: [react(), mode === "development" && componentTagger()].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
