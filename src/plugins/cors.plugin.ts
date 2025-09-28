import cors from "@fastify/cors";
import fp from "fastify-plugin";

const pluginName = "cors-plugin";

export default fp(
	async (fastify) => {
		await fastify.register(cors, {
			origin: fastify.config.CORS_ORIGIN,
			credentials: fastify.config.CORS_CREDENTIALS,
			methods: fastify.config.CORS_METHODS.split(","),
			allowedHeaders: fastify.config.CORS_ALLOWED_HEADERS.split(","),
		});

		fastify.pluginLoaded(pluginName);
	},
	{ name: pluginName },
);
