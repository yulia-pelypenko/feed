import type { FastifyInstance } from "fastify";
import { userService } from "../../user/services/user.serice";
import type { LoginBody } from "../schemas/login.schema";
import type { RegisterBody } from "../schemas/register.schema";

export function authService(fastify: FastifyInstance) {
	const { prisma, jwt } = fastify;
	const users = userService(prisma);

	async function register(data: RegisterBody) {
		const user = await users.findByEmail(data.email);
		if (user) {
			throw fastify.httpErrors.conflict("User already exists");
		}

		const newUser = await users.createUser(data.email, data.password);
		return { id: newUser.id, email: newUser.email };
	}

	async function login(data: LoginBody) {
		const user = await users.findByEmail(data.email);
		if (!user) {
			return null;
		}

		const isValid = await users.validateUser(data.email, data.password);
		if (!isValid) {
			return null;
		}

		const token = jwt.sign(data);

		return {
			token,
			id: user.id,
			email: user.email,
		};
	}

	return {
		register,
		login,
	};
}
