import { wayfinder } from '@laravel/vite-plugin-wayfinder';
import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import laravel from 'laravel-vite-plugin';
import { defineConfig } from 'vite';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
    // When building for GitHub Pages set GHPAGES=true so Vite outputs files to `docs/`
    // and uses the correct base path for the repository (repo: test).
    base: process.env.GHPAGES === 'true' ? '/test/' : '/',
    build: {
        outDir: process.env.GHPAGES === 'true' ? 'docs' : 'dist',
    },
    plugins: [
        laravel({
            input: ['resources/css/app.css', 'resources/js/app.tsx'],
            ssr: 'resources/js/ssr.tsx',
            refresh: true,
        }),
        react({
            babel: {
                plugins: ['babel-plugin-react-compiler'],
            },
        }),
        tailwindcss(),
        wayfinder({
            formVariants: true,
        }),
        // Plugin to copy index.html and 404.html to output directory for GitHub Pages
        {
            name: 'copy-html-files',
            apply: 'build',
            enforce: 'post',
            writeBundle() {
                const outDir = process.env.GHPAGES === 'true' ? 'docs' : 'dist';
                const srcIndex = path.resolve(__dirname, 'index.html');
                const src404 = path.resolve(__dirname, '404.html');
                const destIndex = path.resolve(__dirname, outDir, 'index.html');
                const dest404 = path.resolve(__dirname, outDir, '404.html');

                try {
                    if (fs.existsSync(srcIndex)) {
                        fs.copyFileSync(srcIndex, destIndex);
                        console.log(`✓ Copied index.html to ${outDir}/`);
                    }
                    if (fs.existsSync(src404)) {
                        fs.copyFileSync(src404, dest404);
                        console.log(`✓ Copied 404.html to ${outDir}/`);
                    }
                } catch (err) {
                    console.error('Failed to copy HTML files:', err.message);
                }
            },
        },
    ],
    esbuild: {
        jsx: 'automatic',
    },
});
