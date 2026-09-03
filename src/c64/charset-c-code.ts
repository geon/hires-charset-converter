import { coord2Equal } from "../coord2";
import type { HiresBitmap } from "./hires-bitmap";
import { serializeHiresChar } from "./hires-char";

export function charsetCCodeSerialize(bitmap: HiresBitmap): string | undefined {
	if (!coord2Equal(bitmap.size, { x: 16, y: 16 })) {
		return undefined;
	}

	return bitmap.pixels
		.map((tile) => serializeHiresChar(tile).join(", "))
		.join(",\n");
}
