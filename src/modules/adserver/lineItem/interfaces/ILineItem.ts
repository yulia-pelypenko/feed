export interface ILineItem {
	size: {
		width: number;
		height: number;
	};
	minCpm: number;
	maxCpm: number;
	geo: string;
	adType: "banner" | "video";
	frequency: number;
	creative: string;
}
