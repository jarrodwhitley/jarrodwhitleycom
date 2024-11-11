import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'

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
        // base: mode === 'production' ? '/' : '/jarrodwhitleycom/'
    }
})