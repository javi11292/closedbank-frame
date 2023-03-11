import { readFileSync } from "node:fs";
import sharp from "sharp";

const size = process.argv[3] || 200;
const [, name] = process.argv[2].match(/(.*)\.[^.]+$/);

sharp(readFileSync(process.argv[2]))
	.resize(size, size, { fit: "cover" })
	.jpeg()
	.toFile(`resized-${name}.jpg`);
