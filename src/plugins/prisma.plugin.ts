import type { FastifyInstance } from "fastify";
import fp from "fastify-plugin";
import { PrismaClient } from "../generated/prisma/client";

async function initDatabaseConnection(
	fastify: FastifyInstance,
): Promise<PrismaClient> {
	const db = new PrismaClient();

	try {
		await db.$connect();
		fastify.log.info("✅ Successfully connected to the database");
		return db;
	} catch (error) {
		fastify.log.error("❌ Failed to connect to the database", error);
		throw error;
	}
}

const prismaPlugin = fp(
	async (fastify) => {
		const prisma = await initDatabaseConnection(fastify);

		fastify.decorate("prisma", prisma);

		fastify.addHook("onClose", async () => {
			await fastify.prisma.$disconnect();
		});
	},
	{ name: "prisma" },
);

export default prismaPlugin;
