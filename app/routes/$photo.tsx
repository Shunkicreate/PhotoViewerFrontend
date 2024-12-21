import { useLoaderData } from "@remix-run/react";
import { json } from "@remix-run/node";

interface ImageFile {
    path: string;
    name: string;
    size: number;
    width: number;
    height: number;
    data: string;  // バイトデータはbase64エンコードされた文字列として受け取ります
}

const COUNT = 16;
const WIDTH = Math.floor(1920 / 4);
const HEIGHT = Math.floor(1080 / 4);

// Loader function to fetch image data from NAS
export const loader = async ({ params }: { params: { photoName: string } }) => {
	const { photoName } = params;
	try {
		const response = await fetch(`http://192.168.11.65:8082/photo?path=${photoName}`);
		if (!response.ok) {
			throw new Error(`API request failed: ${response.status}`);
		}

		const arrayBuffer = await response.arrayBuffer();
		const base64Image = Buffer.from(arrayBuffer).toString('base64');
		return json(
			{
				imageData: base64Image,
				photoName
			},
			{ headers: { "Cache-Control": "public, max-age=600" } }
		);
		
	} catch (error) {
		console.error('Error fetching images:', error);
		return json({ error: 'Failed to fetch images' }, { status: 500 });
	}
};

interface LoaderData {
	imageData: string;
	photoName: string;
}

// Client-side component to render the image
export default function Photo() {
	const { imageData, photoName } = useLoaderData<LoaderData>();

	return (
		<div
			style={{
				position: "absolute",
				top: 0,
				left: 0,
				right: 0,
				bottom: 0,
				display: "flex",
				justifyContent: "center",
				alignItems: "center",
				overflow: "hidden",
				zIndex: 50,
			}}
			className='bg-bg-color'
		>
			<img
				src={`data:image/jpeg;base64,${imageData}`}
				alt={photoName}
				style={{ maxHeight: "100%", maxWidth: "100%" }}
			/>
		</div>
	);
}
