import type { FromSchema } from "json-schema-to-ts";

export const registerSchema = {
	tags: ["auth"],
	summary: "Register new user",
	body: {
		type: "object",
		properties: {
			email: { type: "string", format: "email" },
			password: { type: "string", minLength: 6 },
		},
		required: ["email", "password"],
	},
	response: {
		201: {
			type: "object",
			properties: {
				id: { type: "string" },
				email: { type: "string" },
			},
			required: ["id", "email"],
		},
	},
} as const;

export type RegisterBody = FromSchema<typeof registerSchema.body>;
