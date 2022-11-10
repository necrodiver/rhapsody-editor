import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import path from 'path';
// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        vue({
            refTransform: true
        })
    ],
    server: {
        host: 'localhost',
        port: 3000,
        open: true,
        strictPort: true,
        https: false,
        hmr: true
    },
    resolve: {
        alias: {
            // eslint-disable-next-line no-undef
            '@': path.resolve(__dirname, 'examples')
        }
    },
    // 强制预构建插件包
    // optimizeDeps: {
    //     include: ['axios']
    // },
    build: {
        target: 'modules',
        outDir: 'dist',
        assetsDir: 'assets',
        minify: 'terser' // 混淆器
    }
});
