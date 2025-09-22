import type { JsonSchemaToTsProvider } from "@fastify/type-provider-json-schema-to-ts";
import type { FastifyInstance } from "fastify";
import { loginSchema } from "../schemas/login.schema";
import { registerSchema } from "../schemas/register.schema";
import { authService } from "../services/auth.service";

export async function authRoutes(fastify: FastifyInstance) {
	const route = fastify.withTypeProvider<JsonSchemaToTsProvider>();
	const auth = authService(fastify);

	route.post("/register", { schema: registerSchema }, async (req, reply) => {
		const user = await auth.register(req.body);
		return reply.code(201).send(user);
	});

	route.post("/login", { schema: loginSchema }, async (req, reply) => {
		const result = await auth.login(req.body);

		if (!result) {
			return reply.unauthorized("Invalid credentials");
		}

		reply
			.setCookie("token", result.token)
			.send({ id: result.id, email: result.email });
	});
}
