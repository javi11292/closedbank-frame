import { browser } from "$app/environment";

import type { LayoutLoad } from "./$types";

export const load = (async (...args) => {
	const module = await (browser
		? import("./loadClient")
		: import("./loadServer"));

	return module.load(...args);
}) satisfies LayoutLoad;
