import { sveltekit } from "@sveltejs/kit/vite";
import { execSync } from "node:child_process";
import { defineConfig } from "vite";
import { generateSW } from "workbox-build";

export default defineConfig({
	plugins: [
		sveltekit(),
		{
			name: "workbox",
			writeBundle: async () => {
				const options = {
					cacheName: execSync("git rev-parse HEAD").toString(),
				};

				await generateSW({
					swDest: ".svelte-kit/output/client/service-worker.js",
					sourcemap: false,
					skipWaiting: true,
					runtimeCaching: [
						{
							urlPattern: ({ url }) => url.pathname.match(/^\/_app\/immutable/),
							handler: "CacheFirst",
							options,
						},
						{
							urlPattern: /.*/,
							handler: "CacheFirst",
							options: { ...options, expiration: { maxAgeSeconds: 600 } },
						},
					],
				});
			},
		},
	],
	server: { port: 3000 },
	preview: { port: 3000 },
});
