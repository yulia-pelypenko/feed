import fs from "node:fs";
import path from "node:path";
import { pipeline } from "node:stream/promises";
import multipart, { type MultipartFile } from "@fastify/multipart";
import fp from "fastify-plugin";

interface MultipartFileWithValue extends MultipartFile {
	value?: string;
}

const pluginName = "multipart-plugin";

export default fp(
	async (fastify) => {
		fastify.register(multipart, {
			attachFieldsToBody: "keyValues",
			limits: {
				fileSize: 10 * 1024 * 1024,
				files: 1,
			},

			async onFile(part: MultipartFileWithValue) {
				if (!part.filename) {
					throw fastify.httpErrors.badRequest("Creative file is required");
				}

				const uploadDir = path.join(process.cwd(), "public", "uploads");

				if (!fs.existsSync(uploadDir)) {
					fs.mkdirSync(uploadDir, { recursive: true });
				}

				const filePath = path.join(uploadDir, part.filename);

				await pipeline(part.file, fs.createWriteStream(filePath));

				part.value = `/uploads/${part.filename}`;
			},
		});

		fastify.pluginLoaded(pluginName);
	},
	{ name: pluginName },
);
