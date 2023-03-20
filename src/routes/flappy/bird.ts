import type P5 from "p5";

import imagePath from "$lib/assets/images/bird.png";
import { Brain } from "./brain";
import type { Population } from "./population";
import type { Loading } from "./types";
import { imageLoader } from "./utils";

const GRAVITY = 0.0015;
const JUMP = -0.5;
const X = 20;
const HELP = 5;

const loader = imageLoader(imagePath);

export class Bird {
	private p;
	private yPosition;
	private xPosition;
	private brain;
	private speed = 0;
	private dead = false;
	score = 0;
	population;

	constructor({
		p,
		loading,
		population,
		brain,
	}: {
		p: P5;
		loading?: Loading;
		population?: Population;
		brain?: Brain;
	}) {
		if (loading) {
			loader.load(p, loading);
		}

		this.p = p;
		this.yPosition = this.p.height / 2;
		this.xPosition = !population ? X : 4 * X;
		this.population = population;
		this.brain = population ? brain || new Brain() : null;
	}

	jump = () => {
		this.speed = JUMP;
	};

	copy = (mutate = false) => {
		return new Bird({
			p: this.p,
			population: this.population,
			brain: this.brain?.copy(mutate),
		});
	};

	update = () => {
		if (this.dead) {
			this.population?.dead(this);
			return;
		}

		this.score += this.p.deltaTime;
		this.speed += this.p.deltaTime * GRAVITY;
		this.yPosition += this.p.deltaTime * this.speed;

		if (this.yPosition > this.p.height || this.yPosition < 0) {
			this.dead = true;
		}
	};

	draw = () => {
		this.p.image(loader.image, this.xPosition, this.yPosition);
	};

	checkCollision = (
		left: number,
		right: number,
		top: number,
		bottom: number,
		difficulty: number
	) => {
		const width = loader.image.width;
		const height = loader.image.height;

		if (this.brain) {
			this.brain
				.predict([this.yPosition, this.speed, left, top, difficulty])
				.then(([value]) => {
					if (value > 0.5) this.jump();
				});
		}

		if (this.xPosition + width - HELP > left && this.xPosition + HELP < right) {
			if (
				this.yPosition + height - HELP > bottom ||
				this.yPosition + HELP < top
			) {
				this.dead = true;
			}
		}
	};
}
