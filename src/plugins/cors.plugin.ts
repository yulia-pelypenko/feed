import cors from "@fastify/cors";
import fp from "fastify-plugin";

const pluginName = "cors-plugin";

export default fp(
	async (fastify) => {
		await fastify.register(cors, {
			origin: "http://localhost:5174",
			credentials: true,
			methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
			allowedHeaders: ["Content-Type"],
		});

		fastify.pluginLoaded(pluginName);
	},
	{ name: pluginName },
);
