import { browser } from "$app/environment";
import type { Writable } from "svelte/store";
import { writable } from "svelte/store";

type Store = { loading: boolean; data?: unknown; error?: unknown };

const cache: Record<string, Writable<Store>> = {};

const parseResponse = async (response: Response) => {
	const text = await response.text();
	try {
		return JSON.parse(text);
	} catch {
		return text;
	}
};

export const swr = (url: string) => {
	if (!cache[url]) {
		const store = writable<Store>({ loading: true });
		cache[url] = store;

		if (browser) {
			fetch(url)
				.then(async (response) => {
					const result = await parseResponse(response);

					if (response.ok) {
						store.set({ loading: false, data: result });
					} else {
						store.set({ loading: false, error: result });
					}
				})
				.catch(() => store.set({ loading: false }));
		}
	}

	return cache[url];
};
