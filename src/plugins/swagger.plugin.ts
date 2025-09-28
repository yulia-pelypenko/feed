import swagger from "@fastify/swagger";
import swaggerUi from "@fastify/swagger-ui";
import type { FastifyInstance } from "fastify";
import fp from "fastify-plugin";

const pluginName = "swagger-plugin";

export default fp(
	async (fastify: FastifyInstance) => {
		await fastify.register(swagger, {
			openapi: {
				openapi: "3.0.0",
				info: {
					title: "Feed API",
					description: "API documentation for Feed project",
					version: "1.0.0",
				},
				servers: [],
			},
		});

		await fastify.register(swaggerUi, {
			routePrefix: "/docs",
			uiConfig: {
				docExpansion: "list",
				deepLinking: false,
			},
		});

		fastify.pluginLoaded(pluginName);
	},
	{ name: pluginName },
);
