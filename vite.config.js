import {defineConfig, loadEnv} from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'

export default defineConfig(({mode}) => {
    const env = loadEnv(mode, process.cwd(), '')
    const contactApiProxyTarget = String(env.VITE_CONTACT_API_PROXY_TARGET || '').trim()

    return {
        plugins: [vue()],
        logLevel: 'error',
        server: {
            host: 'localhost',
            port: 5173,
            ...(contactApiProxyTarget
                ? {
                      proxy: {
                          '/api': {
                              target: contactApiProxyTarget,
                              changeOrigin: true,
                          },
                      },
                  }
                : {}),
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