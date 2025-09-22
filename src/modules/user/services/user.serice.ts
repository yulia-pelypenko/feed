import bcrypt from "bcrypt";
import type { PrismaClient, User } from "../../../generated/prisma/client";

export function userService(prisma: PrismaClient) {
	async function createUser(email: string, password: string): Promise<User> {
		const hashedPassword = await bcrypt.hash(password, 10);

		return prisma.user.create({
			data: {
				email,
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

	async function validateUser(
		email: string,
		password: string,
	): Promise<boolean> {
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
