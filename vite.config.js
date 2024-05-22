import { defineConfig } from 'vite'

export default defineConfig({
    base: '/Webbee/',
    build: {
        outDir: 'dist',
        rollupOptions: {
            input: {
                main: 'index.html',
                activity: 'src/pages/activityPage.html',
                map: 'src/pages/mapPage.html',
                time: 'src/pages/timePage.html'
            }
        }
    }
})