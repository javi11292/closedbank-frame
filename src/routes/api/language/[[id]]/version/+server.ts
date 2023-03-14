import es from "$lib/assets/translations/es.json";
import type { RequestHandler } from "./$types";

const translations: Record<string, Record<string, string>> = { es };

export const GET = (({ params }) => {
	const { id = "es" } = params;

	return new Response(translations[id]?.version);
}) satisfies RequestHandler;
