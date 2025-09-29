import type { FastifyInstance } from "fastify";
import type { LineItem } from "../../../../generated/prisma/client";
import type { ILineItem } from "../interfaces/ILineItem";
import { LineItemDbService } from "./lineItemDb.service";

export function LineItemService(fastify: FastifyInstance) {
	const lineItemDb = LineItemDbService(fastify);

	return {
		async createLineItem(data: ILineItem): Promise<LineItem | null> {
			try {
				const newLineItem = await lineItemDb.createLineItem(data);
				return newLineItem;
			} catch (error) {
				fastify.log.error("❌ Error creating LineItem:", error);
				return null;
			}
		},
	};
}
