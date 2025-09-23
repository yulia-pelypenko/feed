import bcrypt from "bcrypt";
import type { PrismaClient, User } from "../../../generated/prisma/client";
import type { LoginBody } from "../../auth/schemas/login.schema";
import type { RegisterBody } from "../../auth/schemas/register.schema";

export function userService(prisma: PrismaClient) {
	async function createUser(userData: RegisterBody): Promise<User> {
		const { email, password, name } = userData;
		const hashedPassword = await bcrypt.hash(password, 10);

		return prisma.user.create({
			data: {
				email,
				name,
				password: hashedPassword,
			},
		});
	}

	async function findByEmail(email: string): Promise<User | null> {
		return prisma.user.findUnique({
			where: { email },
		});
	}

	async function findById(id: string): Promise<User | null> {
		return prisma.user.findUnique({
			where: { id },
		});
	}

	async function validateUser(userData: LoginBody): Promise<boolean> {
		const { email, password } = userData;
		const user = await findByEmail(email);
		if (!user) return false;

		return bcrypt.compare(password, user.password);
	}

	return {
		createUser,
		findByEmail,
		findById,
		validateUser,
	};
}
