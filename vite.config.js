import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"

export default defineConfig({
  root: "src/client",
  plugins: [react()],
  server: {
    port: 8080,
    proxy: {
      "/api/vega": "http://localhost:5001",
      "/api/health": "http://localhost:5001",
      "/api/groq": "http://localhost:5001"
    }
  }
})