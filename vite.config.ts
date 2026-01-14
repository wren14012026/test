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
        // Plugin to generate index.html and 404.html dynamically using the manifest
        {
            name: 'generate-html-files',
            apply: 'build',
            enforce: 'post',
            writeBundle() {
                const outDir = process.env.GHPAGES === 'true' ? 'docs' : 'dist';
                const basePath = process.env.GHPAGES === 'true' ? '/test' : '';
                const manifestPath = path.resolve(__dirname, outDir, 'manifest.json');

                try {
                    if (fs.existsSync(manifestPath)) {
                        const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf-8'));
                        
                        // Find the entry point
                        const entryPoint = manifest['resources/js/app.tsx'];
                        if (entryPoint) {
                            const jsFile = `${basePath}/${entryPoint.file}`;
                            const cssFiles = entryPoint.css
                                ?.map(css => `    <link rel="stylesheet" href="${basePath}/${css}" />`)
                                .join('\n') || '';
                            
                            const htmlTemplate = `<!doctype html>
<html>
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width,initial-scale=1" />
  <title>test (GitHub Pages)</title>
${cssFiles}
</head>
<body>
  <div id="app"></div>
  <script type="module" src="${jsFile}"></script>
</body>
</html>`;

                            const indexPath = path.resolve(__dirname, outDir, 'index.html');
                            const notFoundPath = path.resolve(__dirname, outDir, '404.html');
                            
                            fs.writeFileSync(indexPath, htmlTemplate);
                            
                            const notFoundTemplate = htmlTemplate.replace(
                                '<title>test (GitHub Pages)</title>',
                                '<title>test (GitHub Pages) - 404</title>'
                            ).replace(
                                '<div id="app"></div>',
                                '<div id="app"></div>\n  <!-- GitHub Pages serves this file on unknown routes; loading the SPA here lets the client router handle navigation -->'
                            );
                            
                            fs.writeFileSync(notFoundPath, notFoundTemplate);
                            console.log(`✓ Generated index.html and 404.html from manifest`);
                        }
                    }
                } catch (err) {
                    console.error('Failed to generate HTML files:', err.message);
                }
            },
        },
    ],
    esbuild: {
        jsx: 'automatic',
    },
});
