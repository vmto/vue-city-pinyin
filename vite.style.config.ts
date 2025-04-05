import {fileURLToPath} from 'node:url'
import path from 'node:path'
import fs from 'fs-extra'
import {defineConfig} from 'vite'

// https://vite.dev/config/
export default defineConfig({
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src'),
        },
        extensions: ['.js', '.ts', '.tsx', '.vue', '.json']
    },
    build: {
        emptyOutDir: false,
        rollupOptions: {
            external: [''],
            output: {
                assetFileNames: () => 'index.css',
            },
        },
        lib: {
            entry: 'src/styles.ts',
            formats: ['es'],
            fileName: () => 'index-style.js',
        },
    },
    plugins: [
        {
            name: 'remove:index-style.js',
            closeBundle() {
                // @ts-ignore
                const url = import.meta.url
                const toPePath = fileURLToPath(new URL('./dist', url))

                // 编译完成，删除冗余
                const styleFilePath = path.resolve(toPePath, 'index-style.js')
                fs.removeSync(styleFilePath)
            },
        },
    ],
})
