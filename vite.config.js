import { defineConfig } from 'vite'
import { resolve } from 'path'

export default defineConfig({
    base: '/',
    build: {
        outDir: 'dist',
        rollupOptions: {
            input: {
                main: resolve(__dirname, 'index.html'),
                activity: resolve(__dirname, 'activity.html'),
                map: resolve(__dirname, 'map.html'),
                time: resolve(__dirname, 'time.html')
            }
        }
    },
})
