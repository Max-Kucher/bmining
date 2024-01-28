import {defineConfig} from 'vite';
import laravel from 'laravel-vite-plugin';
import react from '@vitejs/plugin-react';

export default defineConfig({
    server: {
        host: '77.246.104.8',
        port: 5173,
        hmr: {
            host: '77.246.104.8',
            port: 5173,
        },
    },

    plugins: [
        laravel({
            input: {
                main: 'resources/js/app.jsx',
                dashboard: 'resources/js/dashboard.jsx',
            },
            ssr: 'resources/js/ssr.jsx',
            refresh: true,
        }),
        react(),
    ],

    build: {
        optimizeDeps: {
            include: ['lodash'],
        },
    },
});
