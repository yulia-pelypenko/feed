import fastifyJwt from "@fastify/jwt";
import type { FastifyReply, FastifyRequest } from "fastify";
import fp from "fastify-plugin";

const pluginName = "jwt-plugin";

export default fp(
	async (fastify) => {
		fastify.register(fastifyJwt, {
			secret: fastify.config.JWT_SECRET,
		});

		fastify.decorate(
			"authenticate",
			async (request: FastifyRequest, reply: FastifyReply) => {
				try {
					await request.jwtVerify();
				} catch {
					reply.code(401).send({ error: "Unauthorized" });
				}
			},
		);

		fastify.pluginLoaded(pluginName);
	},
	{ name: pluginName },
);
