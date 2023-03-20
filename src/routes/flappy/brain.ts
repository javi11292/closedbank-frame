import "@tensorflow/tfjs-backend-cpu";
import type { Tensor } from "@tensorflow/tfjs-core";
import {
	enableProdMode,
	setBackend,
	tensor,
	tensor2d,
	tidy,
} from "@tensorflow/tfjs-core";
import { layers, sequential } from "@tensorflow/tfjs-layers";

const MUTATION_RATE = 0.2;
const LEARN_RATE = 0.2;

enableProdMode();
setBackend("cpu");

const createModel = () => {
	const model = sequential();

	model.add(layers.dense({ inputShape: [5], units: 10, activation: "elu" }));
	model.add(layers.dense({ units: 1, activation: "sigmoid" }));

	return model;
};

export class Brain {
	private model;

	constructor(model = createModel()) {
		this.model = model;
	}

	predict = (values: number[]) => {
		return new Promise<Float32Array | Int32Array | Uint8Array>((resolve) =>
			tidy(() => {
				const result = this.model.predict(tensor2d([values])) as Tensor;

				result.data().then(resolve);
			})
		);
	};

	copy = (mutate = false) => {
		let brain;

		tidy(() => {
			const model = createModel();
			const weights = this.model.getWeights();

			if (!mutate) {
				model.setWeights(weights.map((weight) => weight.clone()));
			} else {
				const mutated: Tensor[] = [];

				weights.forEach((weight, index) => {
					const values = weight.dataSync();

					mutated[index] = tensor(
						values.map((value) => {
							if (Math.random() < MUTATION_RATE) {
								return value + (Math.random() * 2 - 1) * LEARN_RATE;
							} else {
								return value;
							}
						}),
						weight.shape
					);
				});

				model.setWeights(mutated);
			}

			brain = new Brain(model);
		});

		return brain;
	};
}
