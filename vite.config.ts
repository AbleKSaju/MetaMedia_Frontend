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
    host: true, 
    strictPort: true,
    port: 5173, 
  },
  
})
// import path from "path"
// import react from "@vitejs/plugin-react"
// import { defineConfig } from "vite"
// import svgr from 'vite-plugin-svgr';
// import cssInjectedByJsPlugin from 'vite-plugin-css-injected-by-js';
// export default defineConfig({
//   plugins: [
//     react(),
//     svgr(),
//     cssInjectedByJsPlugin(),
//   ],
//   resolve: {
//     alias: {
//       "@": path.resolve(__dirname, "./src"),
//     },
    
//   },
//   optimizeDeps: {
//     exclude: ["@ffmpeg/ffmpeg", "@ffmpeg/util"],
//   },
//   server: {
//     headers: {
//       "Cross-Origin-Opener-Policy": "same-origin",
//       "Cross-Origin-Embedder-Policy": "credentialless",
//       "Access-Control-Allow-Origin": "*", 
//     },
//   },
// })