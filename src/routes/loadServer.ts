import { translations } from "$lib/assets/translations";
import type { LayoutLoad } from "./$types";

export const load = (async ({ params }) => {
	const { language = "es" } = params;

	return { translations: translations[language] || translations.es };
}) satisfies LayoutLoad;
