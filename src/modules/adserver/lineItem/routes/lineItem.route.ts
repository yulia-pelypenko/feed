import type { JsonSchemaToTsProvider } from "@fastify/type-provider-json-schema-to-ts";
import type { FastifyInstance } from "fastify";
import { lineItemFormHtml } from "../pages/lineItemFormHtml";
import { lineItemSchema } from "../schemas/lineItemSchema";
import { LineItemService } from "../services/lineItem.service";

export async function lineItemRoutes(fastify: FastifyInstance) {
	const route = fastify.withTypeProvider<JsonSchemaToTsProvider>();
	const lineItemService = LineItemService(fastify);

	route.get(
		"/form",
		{ preHandler: [fastify.authenticate] },
		async (_request, reply) => {
			reply.type("text/html").send(lineItemFormHtml);
		},
	);

	route.post(
		"/line-item",
		{ schema: lineItemSchema, preHandler: [fastify.authenticate] },
		async (req, reply) => {
			const createdLineItem = await lineItemService.createLineItem(req.body);

			if (!createdLineItem) {
				return reply.internalServerError("❌ Failed to create Line item");
			}

			return reply.code(201).send({
				message: "Line item created successfully",
			});
		},
	);
}
