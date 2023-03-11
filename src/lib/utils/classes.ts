export const classes = (...names: (string | false | null | undefined)[]) => {
	return names.reduce<string>((acc, name) => {
		if (name && !acc) return name;
		if (name) return `${acc} ${name}`;
		return acc;
	}, "");
};
