export const loader = async <T>(
	modules: Record<string, () => Promise<T>>,
	id: string,
	fallback = "es"
) => {
	const module = modules[id] || modules[fallback];

	return await module();
};
