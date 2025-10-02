export interface Size {
	width: number;
	height: number;
}

export interface AdRequest {
	size: { width: number; height: number };
	cpm: number;
	geo: string;
	adType: "banner" | "video";
}
