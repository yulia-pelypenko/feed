export const adRequestSchema = {
	tags: ["Ad"],
	summary: "Request an ad",
	body: {
		type: "object",
		properties: {
			size: {
				type: "object",
				properties: {
					width: { type: "number" },
					height: { type: "number" },
				},
				required: ["width", "height"],
			},
			cpm: { type: "number" },
			geo: { type: "string" },
			adType: {
				type: "string",
				enum: ["banner", "video"],
			},
		},
		required: ["size", "cpm", "geo", "adType"],
	},
	response: {
		200: {
			description: "Successfully matched a line item",
			type: "object",
			properties: {
				id: { type: "string" },
				size: {
					type: "object",
					properties: {
						width: { type: "number" },
						height: { type: "number" },
					},
				},
				cpm: { type: "number" },
				geo: { type: "string" },
				adType: {
					type: "string",
					enum: ["banner", "video"],
				},
				creative: { type: "string" },
			},
		},
		204: {
			description: "No matching line item found",
			type: "null",
		},
	},
} as const;
