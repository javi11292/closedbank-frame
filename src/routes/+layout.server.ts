import es from "$lib/assets/translations/es.json";
import type { LayoutServerLoad } from "./$types";

const translations: Record<string, Record<string, string>> = {
	es,
};

export const prerender = "auto";

export const load = (({ params }) => {
	const { language = "es" } = params;

	return translations[language];
}) satisfies LayoutServerLoad;
