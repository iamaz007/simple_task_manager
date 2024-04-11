import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';

export default defineConfig({
    plugins: [
        laravel({
            input: [
                // css
                'resources/css/app.css',
                // js
                'resources/js/app.js',
                // // project index
                'resources/js/project/index.js',
                // // task index
                'resources/js/task/index.js',
                'resources/js/task/reorder.js',
            ],
            refresh: true,
            publicPath: "/public/",
        }),
    ],
    esbuild: {
        loader: 'jsx',
        drop: ['console', 'debugger'],
    },
    optimizeDeps: {
        esbuildOptions: {
            loader: {
                '.js': 'jsx',
            },
        },
    },
    build: {
        minify: true,
        rollupOptions: {
            output: {
                manualChunks(id) {
                    if (id.includes('node_modules')) {
                        return id.toString().split('node_modules/')[1].split('/')[0].toString();
                    }
                }
            }
        },
    },
});
