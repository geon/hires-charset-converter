import type { Tuple } from "../tuple.js";
import {
	serializeHiresPixelByte,
	type HiresPixelByte,
} from "./hires-pixel-byte.js";

export type HiresChar = Tuple<HiresPixelByte, 8>;

export function serializeHiresChar(char: HiresChar) {
	return char.map(serializeHiresPixelByte);
}
