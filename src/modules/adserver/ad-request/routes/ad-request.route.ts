import type { JsonSchemaToTsProvider } from "@fastify/type-provider-json-schema-to-ts";
import type { FastifyInstance } from "fastify";
import { LineItemFilter } from "../../lineItem/services/lineItemFilter.service";
import { adRequestSchema } from "../schemas/adRequestSchema";
import { AdService } from "../services/ad-request.services";

export async function adServerRoutes(fastify: FastifyInstance) {
	const adService = AdService(fastify);
	const route = fastify.withTypeProvider<JsonSchemaToTsProvider>();

	route.post(
		"/ad-request",
		{ schema: adRequestSchema, preHandler: [fastify.authenticate] },
		async (req, reply) => {
			const baseUrl = `${req.protocol}://${req.headers.host}`;

			const result = await adService.getMatchingLineAd(req.body);

			if (!result) {
				return reply.status(204).send();
			}

			return reply.send({
				...result,
				creative: `${baseUrl}${result.creative}`,
			});
		},
	);
}
