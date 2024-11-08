import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
    plugins: [vue()],
    server: {
        host: 'localhost',
        port: 3000
    },
    build: {
        outDir: 'build'
    },
    base: '/jarrodwhitleycom/'
})