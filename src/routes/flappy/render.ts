import P5 from "p5";

import { Bird } from "./bird";
import { Pipe } from "./pipe";
import { Population } from "./population";

export const setup = ({
	node,
	withPlayer,
}: {
	node: HTMLElement;
	withPlayer?: boolean;
}) => {
	let destroy;

	new P5((p: P5) => {
		destroy = p.remove;
		const data = { loading: { items: new Set(), value: false } };

		let player: Bird | null;
		let population: Population;
		let pipe: Pipe;

		const reset = (birds?: Set<Bird>) => {
			player = withPlayer ? new Bird({ p, loading: data.loading }) : null;
			population = new Population({
				p,
				loading: data.loading,
				reset,
				birds,
			});
			pipe = new Pipe(p, data.loading);
		};

		p.setup = () => {
			p.createCanvas(500, 500);

			reset();
		};

		p.draw = () => {
			p.background(255);

			if (!data.loading.value) {
				player?.update();
				population.update();
				pipe.update();

				player?.draw();
				population.draw();
				pipe.draw();

				const collisions: (Population | Bird)[] = [population];

				if (player) collisions.push(player);

				pipe.checkCollisions(collisions);
			}
		};

		p.keyPressed = () => {
			player?.jump();
		};
	}, node);

	return destroy as unknown as () => void;
};
