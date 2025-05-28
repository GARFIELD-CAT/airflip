import react from "@vitejs/plugin-react"
import { resolve } from "path"
import { defineConfig } from "vite"
import svgr from "vite-plugin-svgr"

const root = resolve(__dirname, "src")

export default defineConfig({
  plugins: [
    react(),
    svgr({ exportAsDefault: true, include: "**/*.svg" }),
  ],
  resolve: {
    alias: {
      "@assets": `${root}/assets`,
      "@modules": `${root}/modules`,
      "@components": `${root}/components`,
      "@layouts": `${root}/layouts`,
      "@pages": `${root}/pages`,
      "@routes": `${root}/routes`,
      "@api": `${root}/lib/api`,
      "@constants": `${root}/lib/constants`,
      "@enums": `${root}/lib/enums`,
      "@configs": `${root}/lib/configs`,
      "@hooks": `${root}/lib/hooks`,
      "@store": `${root}/lib/store`,
      "@utils": `${root}/lib/utils`,
      "@abi": `${root}/abi`,
      "@codegen": `${root}/__generated__/`,
    },
  },
  build: {
    chunkSizeWarningLimit: 2000,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            return 'vendor';
          }
        }
      }
    }
  },
})
