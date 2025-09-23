import cookie, { type FastifyCookieOptions } from "@fastify/cookie";
import fp from "fastify-plugin";

const pluginName = "cookie-plugin";

export default fp(
	async (fastify) => {
		fastify.register(cookie, {
			secret: fastify.config.COOKIE_SECRET,
			parseOptions: {
				sameSite: "strict",
				httpOnly: true,
			},
		} as FastifyCookieOptions);

		fastify.pluginLoaded(pluginName);
	},
	{ name: pluginName },
);
