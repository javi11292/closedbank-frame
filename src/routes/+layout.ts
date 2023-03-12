import { browser } from "$app/environment";
import { get, set } from "idb-keyval";

import type { LayoutLoad } from "./$types";

export const load = (async ({ params, fetch }) => {
	if (!browser) return;

	const { language = "es" } = params;
	const key = `translations-${language}`;

	let translations = await get(key);

	if (!translations) {
		translations = await fetch(`/api/language/${language}`)
			.then((response) => response.json())
			.catch(() => ({}));

		set(key, translations);
	}

	return { translations };
}) satisfies LayoutLoad;
