import type { FromSchema } from "json-schema-to-ts";

export const loginSchema = {
	tags: ["auth"],
	summary: "Login user",
	body: {
		type: "object",
		properties: {
			email: { type: "string", format: "email" },
			password: { type: "string" },
		},
		required: ["email", "password"],
	},
	response: {
		200: {
			type: "object",
			properties: {
				id: { type: "string" },
				email: { type: "string" },
				name: { type: "string" },
			},
			required: ["id", "email", "name"],
		},
	},
} as const;

export type LoginBody = FromSchema<typeof loginSchema.body>;
