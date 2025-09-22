import { Config } from "../config/schema";
import { PrismaClient } from "../generated/prisma/client";

declare module "fastify" {
	interface FastifyInstance {
		config: Config;
		pluginLoaded: (pluginName: string) => void;
		prisma: PrismaClient;
		authenticate: (
			request: FastifyRequest,
			reply: FastifyReply,
		) => Promise<void>;
	}
}
