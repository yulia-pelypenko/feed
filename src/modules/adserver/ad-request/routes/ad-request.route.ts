import type { JsonSchemaToTsProvider } from "@fastify/type-provider-json-schema-to-ts";
import type { FastifyInstance } from "fastify";
import { makePublicUrl } from "../../../../utils/makePublicUrl";
import { adRequestSchema } from "../schemas/adRequestSchema";
import { AdService } from "../services/ad-request.services";

export async function adServerRoutes(fastify: FastifyInstance) {
	const adService = AdService(fastify);
	const route = fastify.withTypeProvider<JsonSchemaToTsProvider>();

	route.post(
		"/ad-request",
		{ schema: adRequestSchema, preHandler: [fastify.authenticate] },
		async (req, reply) => {
			const selectedAd = await adService.getMatchingLineAd(req.body);

			if (!selectedAd) {
				return reply.status(204).send();
			}

			return reply.send({
				...selectedAd,
				creative: makePublicUrl(req, selectedAd.creative),
			});
		},
	);
}
