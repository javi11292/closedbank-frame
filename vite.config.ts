import { sveltekit } from "@sveltejs/kit/vite";
import { visualizer } from "rollup-plugin-visualizer";
import { defineConfig } from "vite";
import { generateSW } from "workbox-build";

export default defineConfig({
	plugins: [
		sveltekit(),
		{
			name: "workbox",
			writeBundle: async () => {
				const options = {
					cacheName: "cache",
				};

				await generateSW({
					swDest: ".svelte-kit/output/client/service-worker.js",
					sourcemap: false,
					skipWaiting: true,
					runtimeCaching: [
						{
							urlPattern: ({ url }) => /^\/api/.test(url.pathname),
							handler: "NetworkFirst",
							options,
						},
						{
							urlPattern: ({ url }) => !/^\/_app\/immutable/.test(url.pathname),
							handler: "CacheFirst",
							options: { ...options, expiration: { maxAgeSeconds: 600 } },
						},
					],
				});
			},
		},
		visualizer({ emitFile: true, template: "sunburst" }),
	],
	server: { port: 3000 },
	preview: { port: 3000 },
});
