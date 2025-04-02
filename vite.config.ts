import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import tsxTypes from 'vite-plugin-tsx-resolve-types'
import dts from 'vite-plugin-dts'
import path from "node:path";

// https://vite.dev/config/
export default defineConfig({
    plugins: [
        vue(),
        vueJsx(),
        tsxTypes(),
        dts({
            entryRoot: 'src',
            outDir: ['es', 'lib'],
            exclude: ['**/tests/**'],
        }),
    ],
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src'),
        },
    },
    build: {
        rollupOptions: {
            external: [
                'vue',
                'lodash-es',
                'classnames',
            ],
            output: [
                {
                    preserveModules: true,
                    preserveModulesRoot: 'src',
                    entryFileNames: '[name].js',
                    format: 'esm',
                    dir: 'es',
                },
                {
                    preserveModules: true,
                    preserveModulesRoot: 'src',
                    entryFileNames: '[name].js',
                    exports: 'named',
                    format: 'cjs',
                    dir: 'lib',
                },
            ],
        },
        lib: {
            entry: 'src/index.ts',
        },
    },
})
