import type { LineItem, Size } from "../../../../generated/prisma/client";
import type { AdRequest } from "../../ad-request/interfaces/IAdRequest";

export class LineItemFilter {
	constructor(private items: LineItem[]) {}

	byType(adType: AdRequest["adType"]) {
		this.items = this.items.filter((item) => item.adType === adType);
		return this;
	}

	bySize(size: Size) {
		this.items = this.items.filter(
			(item) =>
				item.size.width === size.width && item.size.height === size.height,
		);
		return this;
	}

	byGeo(geo: AdRequest["geo"]) {
		this.items = this.items.filter((item) => item.geo === geo);
		return this;
	}

	byCpm(cpm: AdRequest["cpm"]) {
		this.items = this.items.filter(
			(item) => item.minCpm <= cpm && item.maxCpm >= cpm,
		);
		return this;
	}

	get() {
		return this.items;
	}
}
