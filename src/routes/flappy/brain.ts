import * as tf from "@tensorflow/tfjs";

const MUTATION_RATE = 0.2;
const LEARN_RATE = 0.2;

tf.enableProdMode();
tf.setBackend("cpu");

const createModel = () => {
	const model = tf.sequential();

	model.add(tf.layers.dense({ inputShape: [5], units: 10, activation: "elu" }));
	model.add(tf.layers.dense({ units: 1, activation: "sigmoid" }));

	return model;
};

export class Brain {
	private model;

	constructor(model = createModel()) {
		this.model = model;
	}

	predict = (values: number[]) => {
		return new Promise<Float32Array | Int32Array | Uint8Array>((resolve) =>
			tf.tidy(() => {
				const result = this.model.predict(tf.tensor2d([values])) as tf.Tensor;

				result.data().then(resolve);
			})
		);
	};

	copy = (mutate = false) => {
		let brain;

		tf.tidy(() => {
			const model = createModel();
			const weights = this.model.getWeights();

			if (!mutate) {
				model.setWeights(weights.map((weight) => weight.clone()));
			} else {
				const mutated: tf.Tensor[] = [];

				weights.forEach((weight, index) => {
					const values = weight.dataSync();

					mutated[index] = tf.tensor(
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
