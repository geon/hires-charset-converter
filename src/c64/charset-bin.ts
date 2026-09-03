import { coord2Equal } from "../coord2";
import type { HiresBitmap } from "./hires-bitmap";
import { serializeHiresChar } from "./hires-char";

export function charsetBinSerialize(
	bitmap: HiresBitmap,
): Uint8Array | undefined {
	if (!coord2Equal(bitmap.size, { x: 16, y: 16 })) {
		return undefined;
	}

	return new Uint8Array(
		bitmap.pixels.flatMap((tile) => serializeHiresChar(tile)),
	);
}
