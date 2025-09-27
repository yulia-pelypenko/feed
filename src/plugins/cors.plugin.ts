import cors from "@fastify/cors";
import fp from "fastify-plugin";

const pluginName = "cors-plugin";

export default fp(
  async (fastify) => {
    await fastify.register(cors, {
      origin: process.env.CORS_ORIGIN || "*",
      credentials: process.env.CORS_CREDENTIALS === "true",
      methods: (process.env.CORS_METHODS || "GET,POST,PUT,DELETE,OPTIONS").split(","),
      allowedHeaders: (process.env.CORS_ALLOWED_HEADERS || "Content-Type").split(","),
    });

    fastify.pluginLoaded(pluginName);
  },
  { name: pluginName }
);
