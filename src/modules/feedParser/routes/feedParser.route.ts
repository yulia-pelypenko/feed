import type { TypeBoxTypeProvider } from "@fastify/type-provider-typebox";
import type { FastifyInstance } from "fastify";
import { getFeedSchema } from "../schemas/getFeedData.schema";
import { FeedDbService } from "../services/feedDb.service";
import { feedParserService } from "../services/feedParser.service";

const DEFAULT_FEED_URL = "https://rss.unian.net/site/news_ukr.rss";

export async function getFeedDataRoutes(fastify: FastifyInstance) {
	const feedService = feedParserService(fastify.prisma);
	const feedDb = FeedDbService(fastify.prisma);
	const route = fastify.withTypeProvider<TypeBoxTypeProvider>();

	route.get("/feed", { schema: getFeedSchema }, async (req, reply) => {
		const { url, force } = req.query;
		const feedUrl = url ?? DEFAULT_FEED_URL;

		try {
			if (force === "1") {
				const feed = await feedService.parseAndSave(feedUrl);
				return reply.send(feed);
			}

			let feed = await feedDb.getFeedByUrl(feedUrl);

			if (!feed) {
				feed = await feedService.parseAndSave(feedUrl);
			}

			return reply.send(feed);
		} catch (err) {
			req.log.error({ err }, "Failed to get feed");
			return reply.status(500).send({ error: "Failed to fetch feed" });
		}
	});
}
