export const getFeedSchema = {
	tags: ["feed"],
	summary: "Get feed data",
	querystring: {
		type: "object",
		properties: {
			url: { type: "string", description: "RSS feed URL" },
			force: {
				type: "string",
				enum: ["1"],
			},
		},
		required: ["url"],
	},
	response: {
		200: {
			type: "object",
			properties: {
				id: { type: "string" },
				url: { type: "string" },
				title: { type: ["string", "null"] },
				items: {
					type: "array",
					items: {
						type: "object",
						properties: {
							title: { type: "string" },
							summary: { type: ["string", "null"] },
							link: { type: "string" },
							image: { type: ["string", "null"] },
						},
					},
				},
			},
		},
		500: {
			type: "object",
			properties: {
				error: { type: "string" },
			},
		},
	},
} as const;
