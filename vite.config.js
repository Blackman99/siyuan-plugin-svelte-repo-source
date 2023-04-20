import path from 'path';
import { sveltekit } from '@sveltejs/kit/vite';

/** @type {import('vite').UserConfig} */
const config = {
	plugins: [sveltekit()],
	worker: {
		plugins: [
			{
				name: 'remove-manifest',
				configResolved(c) {
					const manifestPlugin = c.worker.plugins.findIndex((p) => p.name === 'vite:manifest');
					c.worker.plugins.splice(manifestPlugin, 1);
					const ssrManifestPlugin = c.worker.plugins.findIndex(
						(p) => p.name === 'vite:ssr-manifest'
					);
					c.plugins.splice(ssrManifestPlugin, 1);
				}
			}
		]
	}
};

export default config;
