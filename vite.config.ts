import { defineConfig } from 'vite'

export default defineConfig({
    
    build: {
        outDir: "docs",
        rollupOptions: {
           watch: {}
        }
    }
})