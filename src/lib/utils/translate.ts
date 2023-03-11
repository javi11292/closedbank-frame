import { derived, writable } from "svelte/store";

export const translations = writable<Record<string, string>>({});

const translate = ({
	key,
	translations,
	props = {},
}: {
	translations: Record<string, string>;
	key: string;
	props?: Record<string, string>;
}) => {
	if (!key) {
		return "Missing key";
	}

	const text = translations[key];

	if (!text) return key;

	return Object.entries(props).reduce((acc, [key, value]) => {
		const regex = new RegExp(`{${key}}`, "g");

		return acc.replace(regex, value);
	}, text);
};

export const t = derived(
	translations,
	($translations) => (key: string, props?: Record<string, string>) =>
		translate({ translations: $translations, key, props })
);
