export const articleSchema = {
	tags: ["article"],
	summary: "Parse article by URL",
	querystring: {
		type: "object",
		properties: {
			url: { type: "string", format: "uri" },
		},
		required: ["url"],
	},
	response: {
		200: {
			type: "object",
			properties: {
				url: { type: "string", format: "uri" },
				title: { type: "string" },
				content: {
					type: "array",
					items: { type: "string" },
				},
				image: { type: ["string", "null"] },
			},
			required: ["url", "title", "content"],
		},
	},
} as const;
