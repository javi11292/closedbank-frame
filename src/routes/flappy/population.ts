import type P5 from "p5";

import { Bird } from "./bird";
import { state } from "./store";
import type { Loading } from "./types";

const SIZE = 300;

const select = (birds: Bird[], fitness: number) => {
	let random = Math.random();
	let index = SIZE;

	while (random > 0) {
		index--;
		random -= birds[index].score / fitness;
	}

	return birds[index].copy(true);
};

export class Population {
	private p;
	private birds;
	private deaths: Bird[] = [];
	private fitness = 0;
	private reset;

	constructor({
		p,
		loading,
		reset,
		birds = new Set(),
	}: {
		p: P5;
		loading: Loading;
		reset: (birds: Set<Bird>) => void;
		birds?: Set<Bird>;
	}) {
		this.p = p;
		this.reset = reset;
		this.birds = birds;

		state.update((value) => ({
			generation: value.generation + 1,
			population: SIZE,
			record: value.record,
		}));

		if (!birds.size) {
			for (let i = 0; i < SIZE; i++) {
				this.birds.add(new Bird({ p, loading, population: this }));
			}
		} else {
			birds.forEach((bird) => (bird.population = this));
		}
	}

	dead = (bird: Bird) => {
		this.deaths.push(bird);
		this.birds.delete(bird);

		this.fitness += bird.score;

		state.update((value) => ({
			generation: value.generation,
			population: value.population - 1,
			record: bird.score > value.record ? bird.score : value.record,
		}));

		if (!this.birds.size) {
			const newBirds = new Set<Bird>();
			for (let i = 0; i < SIZE; i++) {
				if (i < SIZE * 0.05) {
					newBirds.add(this.deaths[this.deaths.length - 1 - i].copy());
				} else if (i < SIZE * 0.9) {
					newBirds.add(select(this.deaths, this.fitness));
				} else {
					newBirds.add(new Bird({ p: this.p, population: this }));
				}
			}

			this.reset(newBirds);
		}
	};

	update = () => {
		this.birds.forEach((bird) => bird.update());
	};

	draw = () => {
		this.birds.forEach((bird) => bird.draw());
	};

	checkCollision = (
		...args: [
			left: number,
			right: number,
			top: number,
			bottom: number,
			difficulty: number
		]
	) => {
		this.birds.forEach((bird) => bird.checkCollision(...args));
	};
}
