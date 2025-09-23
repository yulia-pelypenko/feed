import type { JsonSchemaToTsProvider } from "@fastify/type-provider-json-schema-to-ts";
import type { FastifyInstance } from "fastify";
import { articleSchema } from "../schemas/article.schema";
import { parseArticle } from "../services/article.service";

export async function articleRoutes(fastify: FastifyInstance) {
	const route = fastify.withTypeProvider<JsonSchemaToTsProvider>();

	route.get("/article", { schema: articleSchema }, async (req, reply) => {
		const { url } = req.query;
		const article = await parseArticle(url);
		return reply.send(article);
	});
}
