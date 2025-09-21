import type { TypeBoxTypeProvider } from "@fastify/type-provider-typebox";
import type { FastifyInstance } from "fastify";
import { feedSchema } from "../schemas/feedData.schema";
import { FeedDbService } from "../services/feedDb.service";
import { feedParserService } from "../services/feedParser.service";

const DEFAULT_FEED_URL = "https://rss.unian.net/site/news_ukr.rss";

export async function getFeedDataRoutes(fastify: FastifyInstance) {
	const feedService = feedParserService(fastify.prisma);
	const feedDb = FeedDbService(fastify.prisma);
	const route = fastify.withTypeProvider<TypeBoxTypeProvider>();

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
