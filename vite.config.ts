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
				await generateSW({
					swDest: ".svelte-kit/output/client/service-worker.js",
					sourcemap: false,
					skipWaiting: true,
					runtimeCaching: [
						{
							urlPattern: /.*/,
							handler: "NetworkFirst",
							options: {
								cacheName: execSync("git rev-parse HEAD").toString(),
							},
						},
					],
				});
			},
		},
	],
	server: { port: 3000 },
	preview: { port: 3000 },
});
