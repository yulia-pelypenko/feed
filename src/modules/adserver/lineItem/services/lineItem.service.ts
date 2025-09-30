import type { FastifyInstance } from "fastify";
import type { FromSchema } from "json-schema-to-ts";
import type { LineItem } from "../../../../generated/prisma/client";
import type { lineItemSchema } from "../schemas/lineItemSchema";
import { LineItemDbService } from "./lineItemDb.service";

export type LineItemRequestBody = FromSchema<typeof lineItemSchema.body>;

export function LineItemService(fastify: FastifyInstance) {
	const lineItemDb = LineItemDbService(fastify);

	return {
		async createLineItem(body: LineItemRequestBody): Promise<LineItem | null> {
			const { width, height, ...otherFields } = body;
			const data = {
				size: {
					width: width,
					height: height,
				},
				...otherFields,
			};

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
