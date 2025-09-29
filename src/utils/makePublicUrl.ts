import type { FastifyRequest } from "fastify";

export function makePublicUrl(
	{ protocol, headers }: FastifyRequest,
	relativePath: string,
): string {
	const baseUrl = `${protocol}://${headers.host}`;
	return `${baseUrl}${relativePath}`;
}
