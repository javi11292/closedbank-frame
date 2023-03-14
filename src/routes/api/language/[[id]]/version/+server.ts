import { translations } from "$lib/assets/translations";
import type { RequestHandler } from "./$types";

export const GET = (({ params }) => {
	const { id = "es" } = params;

	return new Response((translations[id] || translations.es).version);
}) satisfies RequestHandler;
