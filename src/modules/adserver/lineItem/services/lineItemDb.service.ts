import type { FastifyInstance } from "fastify";
import type { LineItem, Prisma } from "../../../../generated/prisma/client";

export const LineItemDbService = ({ prisma }: FastifyInstance) => ({
	async createLineItem(data: Prisma.LineItemCreateInput): Promise<LineItem> {
		return prisma.lineItem.create({ data });
	},

	async getAllLineItems(): Promise<LineItem[]> {
		return prisma.lineItem.findMany({
			orderBy: { createdAt: "desc" },
		});
	},

	async getLineItemById(id: string): Promise<LineItem | null> {
		return prisma.lineItem.findUnique({ where: { id } });
	},

	async deleteLineItem(id: string): Promise<LineItem> {
		return prisma.lineItem.delete({ where: { id } });
	},
});
