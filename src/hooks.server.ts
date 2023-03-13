import { building } from "$app/environment";
import type { Handle } from "@sveltejs/kit";
import { minify } from "html-minifier";

const minification_options = {
	collapseBooleanAttributes: true,
	collapseWhitespace: true,
	conservativeCollapse: true,
	decodeEntities: true,
	minifyJS: true,
	removeAttributeQuotes: true,
	removeOptionalTags: true,
	removeRedundantAttributes: true,
	removeScriptTypeAttributes: true,
	removeStyleLinkTypeAttributes: true,
};

export const handle = (async ({ event, resolve }) => {
	let page = "";

	return resolve(event, {
		transformPageChunk: ({ html, done }) => {
			page += html;
			if (done) {
				return building ? minify(page, minification_options) : page;
			}
		},
	});
}) satisfies Handle;
