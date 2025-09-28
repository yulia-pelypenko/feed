import type { FromSchema } from "json-schema-to-ts";

export const EnvSchema = {
	type: "object",
	properties: {
		PORT: { type: "number" },
		HOST: { type: "string" },
		MONGO_URI: { type: "string", format: "uri" },
		JWT_SECRET: { type: "string" },
		COOKIE_SECRET: { type: "string" },
		CORS_ORIGIN: { type: "string" },
		CORS_CREDENTIALS: { type: "boolean" },
		CORS_METHODS: { type: "string" },
		CORS_ALLOWED_HEADERS: { type: "string" },
	},
	required: [
		"PORT",
		"HOST",
		"MONGO_URI",
		"JWT_SECRET",
		"COOKIE_SECRET",
		"CORS_ORIGIN",
		"CORS_CREDENTIALS",
		"CORS_METHODS",
		"CORS_ALLOWED_HEADERS",
	],
	additionalProperties: false,
} as const;

export type Config = FromSchema<typeof EnvSchema>;
