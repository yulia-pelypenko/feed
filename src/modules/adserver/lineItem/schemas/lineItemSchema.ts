export const lineItemSchema = {
	tags: ["line-item"],
	summary: "Create a new line item with creative",
	consumes: ["multipart/form-data"],
	body: {
		type: "object",
		required: [
			"width",
			"height",
			"minCpm",
			"maxCpm",
			"geo",
			"adType",
			"frequency",
			"creative",
		],
		properties: {
			width: { type: "integer" },
			height: { type: "integer" },
			minCpm: { type: "number" },
			maxCpm: { type: "number" },
			geo: { type: "string", minLength: 1 },
			adType: {
				type: "string",
				enum: ["banner", "video"],
			},
			frequency: { type: "integer" },
			creative: { type: "string" },
		},
	},
} as const;
