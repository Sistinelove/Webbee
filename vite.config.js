import { defineConfig } from 'vite'
import { resolve } from 'path'

export default defineConfig({
    base: '/',
    build: {
        outDir: 'dist',
        rollupOptions: {
            input: {
                main: resolve(__dirname, '/Webbee/index.html'),
                activity: resolve(__dirname, '/Webbee/activity.html'),
                map: resolve(__dirname, '/Webbee/map.html'),
                time: resolve(__dirname, '/Webbee/time.html')
            }
        }
    },
})
