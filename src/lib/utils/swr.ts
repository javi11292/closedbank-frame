import { browser } from "$app/environment";
import type { Writable } from "svelte/store";
import { writable } from "svelte/store";

type Store<T = unknown, E = unknown> = {
	loading: boolean;
	data?: T;
	error?: E;
};

const cache: Record<string, unknown> = {};

const parseResponse = async (response: Response) => {
	const text = await response.text();
	try {
		return JSON.parse(text);
	} catch {
		return text;
	}
};

export const swr = <T = unknown, E = unknown>(url: string, data?: T) => {
	if (!browser) {
		return writable<Store<T, E>>({ loading: true, data });
	}

	if (!cache[url]) {
		const store = writable<Store>({ loading: true, data });
		cache[url] = store;

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

	return cache[url] as Writable<Store<T, E>>;
};
