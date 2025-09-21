import Parser from "rss-parser";
import type { Prisma, PrismaClient } from "../../../generated/prisma/client";
import { FeedDbService } from "../services/feedDb.service";

const parser = new Parser();

export const feedParserService = (prisma: PrismaClient) => {
	const feedDb = FeedDbService(prisma);

	return {
		async parseAndSave(url: string): Promise<Prisma.FeedGetPayload<{}>> {
			const parsedFeed = await parser.parseURL(url);

			return feedDb.saveFeed({
				url,
				title: parsedFeed.title ?? null,
				items: parsedFeed.items.map((item) => ({
					title: item.title ?? item.contentSnippet ?? "News",
					summary: item.contentSnippet ?? null,
					link: item.link ?? "",
					image: item.enclosure?.url ?? null,
				})),
			});
		},
	};
};
