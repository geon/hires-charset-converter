import type { Tuple } from "../tuple.js";

export type Bit = 0 | 1;

export type HiresPixelByte = Tuple<Bit, 8>;

export function parseHiresPixelByte(byte: number): HiresPixelByte {
	return [
		((byte >> 7) & 0b1) as Bit,
		((byte >> 6) & 0b1) as Bit,
		((byte >> 5) & 0b1) as Bit,
		((byte >> 4) & 0b1) as Bit,
		((byte >> 3) & 0b1) as Bit,
		((byte >> 2) & 0b1) as Bit,
		((byte >> 1) & 0b1) as Bit,
		((byte >> 0) & 0b1) as Bit,
	];
}

export function serializeHiresPixelByte(hiresIndices: HiresPixelByte): number {
	return (
		(hiresIndices[0] << 7) +
		(hiresIndices[1] << 6) +
		(hiresIndices[2] << 5) +
		(hiresIndices[3] << 4) +
		(hiresIndices[4] << 3) +
		(hiresIndices[5] << 2) +
		(hiresIndices[6] << 1) +
		(hiresIndices[7] << 0)
	);
}
