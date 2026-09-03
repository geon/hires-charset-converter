import type { Image } from "../image.js";
import type { HiresChar } from "./hires-char.js";

/**
 * Must have a size of 16x16.
 */
export type HiresBitmap = Image<HiresChar>;
