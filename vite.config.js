import { defineConfig } from 'vite'
import { resolve } from 'path'

export default defineConfig({
    base: '/Webbee/',
    build: {
        outDir: 'dist',
        rollupOptions: {
            input: {
                main: resolve(__dirname, 'index.html'),
                activity: resolve(__dirname, 'activity/index.html'),
                map: resolve(__dirname, 'map/index.html'),
                time: resolve(__dirname, 'time/index.html')
            }
        }
    },
})
