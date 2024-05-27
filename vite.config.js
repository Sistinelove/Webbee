import { defineConfig } from 'vite'
import { resolve } from 'path'

export default defineConfig({
    base: '/Webbee/',
    build: {
        outDir: 'dist',
        rollupOptions: {
            input: {
                main: resolve(__dirname, 'index.html'),
                activity: resolve(__dirname, 'activityIndex.html'),
                map: resolve(__dirname, 'mapIndex.html'),
                time: resolve(__dirname, 'timeIndex.html')
            }
        }
    },
})
