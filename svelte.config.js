import adapter from "@sveltejs/adapter-vercel";
import { vitePreprocess } from "@sveltejs/kit/vite";

/** @type {import('@sveltejs/kit').Config} */
export default {
	kit: {
		adapter: adapter(),
		alias: {
			$onboarding: "src/routes/[[language]]/onboarding",
			"$onboarding/*": "src/routes/[[language]]/onboarding/*",
		},
		prerender: {
			entries: ["*", "/"],
		},
	},
	preprocess: vitePreprocess(),
};
