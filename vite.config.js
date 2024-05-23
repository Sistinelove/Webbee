import { defineConfig } from 'vite'
import { resolve } from 'path'

export default defineConfig({
    base: '/Webbee/',
    build: {
        outDir: 'dist',
        rollupOptions: {
            input: {
                main: resolve(__dirname, 'index.html'),
                activity: resolve(__dirname, 'src/activity/index.html'),
                map: resolve(__dirname, 'src/map/index.html'),
                time: resolve(__dirname, 'src/time/index.html')
            }
        }
    },
})
