import { useState } from "react";
import { ImageDataCanvas } from "./ImageDataCanvas.js";
import { FileInput } from "./FileInput.js";
import {
	imageDataFromImageElement,
	imageElementFromFile,
} from "../image-data.js";
import { Flex } from "./Flex.jsx";
import { stylize } from "./stylize.js";
import cssModule from "./App.module.css";
import { useBWQuantization, type PalettizationResults } from "../palettize.js";
import { c64RgbPalettes } from "../palette.js";
import type { Setter } from "./setter.js";
import { BlobDownloadButton } from "./BlobDownloadButton.js";
import { charsetCCodeSerialize } from "../c64/charset-c-code.js";
import { charsetBinSerialize } from "../c64/charset-bin.js";

const style = stylize(cssModule, "base");

export type PaletteId = keyof typeof c64RgbPalettes;

type Setters = {
	readonly setImageData: Setter<ImageData | undefined>;
};

export function App() {
	const [imageData, setImageData] = useState<ImageData | undefined>(undefined);

	const setters = {
		setImageData,
	};

	return imageData ? (
		<ImageUi imageData={imageData} setters={setters} />
	) : (
		<NoImageUi setters={setters} />
	);
}

function NoImageUi(props: { readonly setters: Setters }) {
	return (
		<div className={style()}>
			<Flex col>
				<SettingsUi setters={props.setters} />
			</Flex>
		</div>
	);
}

function ImageUi(props: {
	readonly imageData: ImageData;
	readonly setters: Setters;
}) {
	const results = useBWQuantization(props.imageData);

	return (
		<div className={style()}>
			<Flex col>
				<SettingsUi setters={props.setters} results={results} />
				<ImageDataCanvas imageData={results.imageData} />
			</Flex>
		</div>
	);
}

function SettingsUi(props: {
	readonly setters: Setters;
	readonly results?: PalettizationResults;
}) {
	return (
		<Flex row>
			<FileInput
				accept={["image/*"]}
				onChange={async (file) =>
					props.setters.setImageData(
						imageDataFromImageElement(await imageElementFromFile(file)),
					)
				}
			>
				Open image...
			</FileInput>

			{props.results?.getC64HiresBitmap && (
				<Flex row style={{ marginLeft: "auto" }}>
					<BlobDownloadButton
						getBlob={async () => {
							const hiresBitmap = props.results!.getC64HiresBitmap!();
							const cCode = hiresBitmap && charsetCCodeSerialize(hiresBitmap);
							return cCode === undefined
								? undefined
								: {
										blob: new Blob([cCode], {
											type: "application/octet-stream",
										}),
										fileName: "charset.inc",
									};
						}}
					>
						Export C Code
					</BlobDownloadButton>
					<BlobDownloadButton
						getBlob={async () => {
							const hiresBitmap = props.results!.getC64HiresBitmap!();
							const bin = hiresBitmap && charsetBinSerialize(hiresBitmap);
							return bin === undefined
								? undefined
								: {
										blob: new Blob([bin.buffer as ArrayBuffer], {
											type: "application/octet-stream",
										}),
										fileName: "charset.bin",
									};
						}}
					>
						Export Bin
					</BlobDownloadButton>
				</Flex>
			)}
		</Flex>
	);
}
