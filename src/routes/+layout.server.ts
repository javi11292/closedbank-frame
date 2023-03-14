import type { Writable } from "svelte/store";

import { translations as $translations } from "$lib/utils/translate";
import type { LayoutServerLoad } from "./$types";

export const prerender = "auto";

type WritableTranslations = typeof $translations;
type Translations = WritableTranslations extends Writable<infer T> ? T : never;

const translations: Record<string, Translations> = {};

export const load = (async ({ params, fetch }) => {
	const { language = "es" } = params;

	if (!translations[language]) {
		const response = await fetch(`/api/language/${language}`)
			.then((response) => response.json())
			.catch(() => ({}));

		translations[language] = response;
	}

	$translations.set(translations[language]);
}) satisfies LayoutServerLoad;
