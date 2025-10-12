import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';
import path from "path";

export default defineConfig({
	plugins: [
		svgr(),
		react(),
	],
	css: {
		preprocessorOptions: {
			scss: {
				additionalData: `@use "${path.resolve(__dirname, "src/styles/globals.scss")}" as *;`
			}
		}
	},
	server: {
		proxy: {
			'/api': {
				target: 'https://frontendtest.pleasecheck.me/index.php',
				changeOrigin: true,
				rewrite: (path) => path.replace(/^\/api/, '/wp-json/wp/v2'),
			},
		},
	},
});