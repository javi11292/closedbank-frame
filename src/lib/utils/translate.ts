import { derived, writable } from "svelte/store";

type Translations = Record<string, string | undefined>;

export const translations = writable<Translations>({});

const translate = ({
	key,
	translations,
	props = {},
}: {
	key: string;
	translations: Translations;
	props?: Record<string, string>;
}) => {
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
		translate({
			translations: $translations,
			key,
			props,
		})
);
