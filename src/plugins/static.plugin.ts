import path from "node:path";
import fastifyStatic from "@fastify/static";
import fp from "fastify-plugin";

const pluginName = "static-plugin";

export default fp(
	async (fastify) => {
		fastify.register(fastifyStatic, {
			root: path.join(process.cwd(), "public", "uploads"),
			prefix: "/uploads/",
		});

		fastify.pluginLoaded(pluginName);
	},
	{ name: pluginName },
);
