import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'

export default defineConfig(({mode}) => {
    return {
        plugins: [vue()],
        logLevel: 'error',
        server: {
            host: 'localhost',
            port: 3000
        },
        build: {
            outDir: 'build'
        },
        resolve: {
            alias: {
                '@': resolve(__dirname, 'src'), // Alias '@' to '/src'
            },
        },
        // base: mode === 'production' ? '/' : '/jarrodwhitleycom/'
    }
})