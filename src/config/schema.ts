import type { FromSchema } from "json-schema-to-ts";

export const EnvSchema = {
	type: "object",
	properties: {
		PORT: { type: "number" },
		HOST: { type: "string" },
		MONGO_URI: { type: "string", format: "uri" },
		JWT_SECRET: { type: "string" },
		COOKIE_SECRET: { type: "string" },
	},
	required: ["PORT", "HOST", "MONGO_URI", "JWT_SECRET", "COOKIE_SECRET"],
	additionalProperties: false,
} as const;

export type Config = FromSchema<typeof EnvSchema>;
