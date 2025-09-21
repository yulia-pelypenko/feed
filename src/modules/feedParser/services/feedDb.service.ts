import type { Feed, Prisma, PrismaClient } from "@prisma/client";

export const FeedDbService = (prisma: PrismaClient) => ({
	async getFeedByUrl(url: string): Promise<Feed | null> {
		return prisma.feed.findFirst({ where: { url } });
	},

	async saveFeed(data: Prisma.FeedCreateInput): Promise<Feed> {
		return prisma.feed.upsert({
			where: { url: data.url },
			update: data,
			create: data,
		});
	},
});
