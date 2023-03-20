import type P5 from "p5";

import type { Loading } from "./types";

export const imageLoader = (path: string) => {
	const loader = {
		image: null as unknown as P5.Image,
		load: (p: P5, loading: Loading) => {
			if (!loader.image) {
				loading.value = true;
				loading.items.add(path);
				loader.image = p.loadImage(path, (loadedImage) => {
					loader.image = loadedImage;

					loading.items.delete(path);

					if (!loading.items.size) {
						loading.value = false;
					}
				});
			}
		},
	};

	return loader;
};
