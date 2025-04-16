import path from "path"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"
import { TanStackRouterVite } from '@tanstack/router-plugin/vite'

export default defineConfig(({ mode }) => ({
  plugins: [
    TanStackRouterVite(),
    react()
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  define: {
    __API_BASE__: JSON.stringify(
      mode === "production"
        ? "https://bourse.cu-aflou.edu.dz/api"
        : "http://localhost:3000/api"
    ),
  },
  
}))