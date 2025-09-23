import * as cheerio from "cheerio";

export async function parseArticle(url: string) {
	const $ = await cheerio.fromURL(url);

	const title =
		$("meta[property='og:title']").attr("content") ||
		$("h1").first().text().trim();

	const content = $("p")
		.map((_, el) => $(el).text().trim())
		.get()
		.join("\n\n");

	const image =
		$("article img").first().attr("src") ||
		$("meta[property='og:image']").attr("content") ||
		null;
	return { url, title, content, image };
}
