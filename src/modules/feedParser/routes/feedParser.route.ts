import type { JsonSchemaToTsProvider } from "@fastify/type-provider-json-schema-to-ts";
import type { FastifyInstance } from "fastify";
import { DEFAULT_FEED_URL } from "../consts";
import { feedSchema } from "../schemas/feedData.schema";
import { FeedDbService } from "../services/feedDb.service";
import { feedParserService } from "../services/feedParser.service";

export async function getFeedDataRoutes(fastify: FastifyInstance) {
	const feedService = feedParserService(fastify.prisma);
	const feedDb = FeedDbService(fastify.prisma);
	const route = fastify.withTypeProvider<JsonSchemaToTsProvider>();

	route.get("/feed", { schema: feedSchema }, async (req, reply) => {
		const { url, force } = req.query;
		const feedUrl = url ?? DEFAULT_FEED_URL;

		if (force === "1") {
			return feedService.parseAndSave(feedUrl);
		}

		let feed = await feedDb.getFeedByUrl(feedUrl);

		if (!feed) {
			feed = await feedService.parseAndSave(feedUrl);
		}

		return feed;
	});
}
