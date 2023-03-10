import adapter from "@sveltejs/adapter-auto";
import { vitePreprocess } from "@sveltejs/kit/vite";

/** @type {import('@sveltejs/kit').Config} */
export default {
	kit: {
		adapter: adapter(),
		alias: {
			lib: "src/lib",
			"lib/*": "src/lib/*",
		},
	},
	preprocess: vitePreprocess(),
};
