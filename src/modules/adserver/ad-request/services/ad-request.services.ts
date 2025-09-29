import type { FastifyInstance } from "fastify";
import { LineItemDbService } from "../../lineItem/services/lineItemDb.service";
import { LineItemFilter } from "../../lineItem/services/lineItemFilter.service";
import type { AdRequest } from "../interfaces/IAdRequest";

export function AdService(fastify: FastifyInstance) {
	const lineItemDbService = LineItemDbService(fastify);

	return {
		async getMatchingLineAd({ adType, size, geo, cpm }: AdRequest) {
			try {
				fastify.log.info(
					{ adType, size, geo, cpm },
					"AdService: incoming ad request",
				);

				const items = await lineItemDbService.getAllLineItems();

				const filtered = new LineItemFilter(items)
					.byType(adType)
					.bySize(size)
					.byGeo(geo)
					.byCpm(cpm)
					.get();

				if (filtered.length === 0) {
					fastify.log.warn("AdService: no matching line items found");
					return null;
				}

				const lineItem = filtered[0];
				fastify.log.info({ id: lineItem.id }, "AdService: selected line item");

				return lineItem;
			} catch (err) {
				fastify.log.error({ err }, "AdService: error while matching line item");
				throw err;
			}
		},
	};
}
