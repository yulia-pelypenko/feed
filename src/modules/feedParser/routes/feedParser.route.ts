import type { FastifyInstance } from "fastify";
import type { FromSchema } from "json-schema-to-ts";
import { getFeedSchema } from "../schemas/getFeedData.schema";
import { FeedDbService } from "../services/feedDb.service";
import { feedParserService } from "../services/feedParser.service";

type GetFeedQuery = FromSchema<typeof getFeedSchema.querystring>;

export async function getFeedDataRoutes(fastify: FastifyInstance) {
	const feedService = feedParserService(fastify.prisma);
	const feedDb = FeedDbService(fastify.prisma);

	fastify.get<{ Querystring: GetFeedQuery }>(
		"/feed",
		{ schema: getFeedSchema },
		async (req, reply) => {
			const { url, force } = req.query;
			const feedUrl = url;

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
		},
	);
}
