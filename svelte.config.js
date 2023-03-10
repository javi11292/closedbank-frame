import adapter from "@sveltejs/adapter-vercel";
import { vitePreprocess } from "@sveltejs/kit/vite";

/** @type {import('@sveltejs/kit').Config} */
export default {
	kit: {
		adapter: adapter(),
		alias: {
			$onboarding: "src/routes/onboarding",
			"$onboarding/*": "src/routes/onboarding/*",
		},
	},
	preprocess: vitePreprocess(),
};
