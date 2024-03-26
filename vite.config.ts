import path from "path"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
    
  },
  optimizeDeps: {
    exclude: ["@ffmpeg/ffmpeg", "@ffmpeg/util"],
  },
  server: {
    headers: {
      "Cross-Origin-Opener-Policy": "same-site",
      "Cross-Origin-Embedder-Policy": "cross-origin",
      "Access-Control-Allow-Origin": "*", 
      "Content-Security-Policy": "frame-ancestors 'self' meet.jit.si",
    },
  },
})
