import { json } from "@sveltejs/kit";

import { translations } from "$lib/assets/translations";
import type { RequestHandler } from "./$types";

export const GET = (({ params }) => {
	const { id = "es" } = params;

	return json(translations[id] || translations.es);
}) satisfies RequestHandler;
