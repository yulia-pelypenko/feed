import type { LineItem, Size } from "../../../../generated/prisma/client";
import type { AdRequest } from "../../ad-request/interfaces/IAdRequest";

export function createLineItemFilter(items: LineItem[]) {
	return {
		byType(adType: AdRequest["adType"]) {
			return createLineItemFilter(
				items.filter((item) => item.adType === adType),
			);
		},

		bySize(size: Size) {
			return createLineItemFilter(
				items.filter(
					(item) =>
						item.size.width === size.width && item.size.height === size.height,
				),
			);
		},

		byGeo(geo: AdRequest["geo"]) {
			return createLineItemFilter(items.filter((item) => item.geo === geo));
		},

		byCpm(cpm: AdRequest["cpm"]) {
			return createLineItemFilter(
				items.filter((item) => item.minCpm <= cpm && item.maxCpm >= cpm),
			);
		},

		get() {
			return items;
		},
	};
}
