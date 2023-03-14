export type Translations = Record<string, string | undefined>;

let translations: Translations = {};

const translate = ({
	key,
	props = {},
}: {
	key: string;
	props?: Record<string, string>;
}) => {
	const text = translations[key];

	if (!text) return key;

	return Object.entries(props).reduce((acc, [key, value]) => {
		const regex = new RegExp(`{${key}}`, "g");

		return acc.replace(regex, value);
	}, text);
};

export const setup = (value: Translations) => {
	translations = value;
};

export const t = (key: string, props?: Record<string, string>) =>
	translate({
		key,
		props,
	});
