import type P5 from "p5";

import imagePath from "$lib/assets/images/pipe.png";
import type { Loading } from "./types";
import { imageLoader } from "./utils";

const GAP = 125;
const SPEED = 0.2;

const loader = imageLoader(imagePath);

export class Pipe {
	private p;
	private position;
	private center;
	private difficulty = 1;

	constructor(p: P5, loading: Loading) {
		loader.load(p, loading);

		this.p = p;
		this.position = p.width;
		this.center = this.p.height / 2;
	}

	checkCollisions = (
		objects: {
			checkCollision: (
				left: number,
				right: number,
				top: number,
				bottom: number,
				difficulty: number
			) => void;
		}[]
	) => {
		objects.forEach((object) =>
			object.checkCollision(
				this.position,
				this.position + loader.image.width,
				this.center - GAP / 2,
				this.center + GAP / 2,
				this.difficulty
			)
		);
	};

	update = () => {
		const imageHeight = loader.image.height;

		if (this.position + loader.image.width < 0) {
			this.position = this.p.width;
			this.center = this.p.random(
				imageHeight / 4,
				this.p.height - imageHeight / 4
			);
			this.difficulty += this.p.deltaTime * 0.01;
		} else {
			this.position -= this.p.deltaTime * SPEED * this.difficulty;
		}
	};

	draw = () => {
		this.p.push();
		this.p.scale(1, -1);
		this.p.image(loader.image, this.position, -this.center + GAP / 2);
		this.p.pop();

		this.p.image(loader.image, this.position, this.center + GAP / 2);
	};
}
