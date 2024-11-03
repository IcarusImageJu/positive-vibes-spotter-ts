import NodeWebcam from "npm:node-webcam";
import type NodeWebcamTypes from "npm:@types/node-webcam";
import "jsr:@std/dotenv/load";

const IMAGE_PATH = "photo.jpg";

const options: NodeWebcamTypes.WebcamOptions = {
	width: 800,
	height: 480,
	quality: 100,
	delay: 2,
	saveShots: true,
	output: "jpeg",
	callbackReturn: "base64",
};

const webcam = (NodeWebcam as NodeWebcamTypes.Factory).create(options);

export const capture = (): Promise<string> => {
	return new Promise((resolve, reject) => {
		console.log("Initialisation de la caméra pour prendre une photo.");

		webcam.capture(IMAGE_PATH, (err, data) => {
			if (err) {
				console.error("Erreur lors de la prise de la photo:", err);
				reject(`Erreur critique: ${err}`);
			} else {
				console.log(`Photo prise avec succès: ${IMAGE_PATH}`);
				resolve(data);
			}
		});
	});
};

if (import.meta.main) {
	console.log("Capture d'une photo avec la caméra.");
	capture().then((data) => {
		console.log("Photo prise:", data);
	});
}
