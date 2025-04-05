import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import tsxTypes from 'vite-plugin-tsx-resolve-types'
import path from 'node:path';

// https://vite.dev/config/
export default defineConfig({
    plugins: [
        vue(),
        vueJsx(),
        tsxTypes(),
    ],
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src'),
        },
        extensions: ['.js', '.ts', '.tsx', '.vue', '.json']
    },
    build: {
        rollupOptions: {
            external: ['vue', 'lodash-es', 'classnames'],
            output: {
                exports: 'named',
                globals: {
                    vue: 'vue',
                },
            },
        },
        lib: {
            entry: 'src/index.ts',
            formats: ['umd'],
            fileName: () => 'index.js',
            name: 'index',
        },
    },
})
