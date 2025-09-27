import { fastifySchedule } from "@fastify/schedule";
import fp from "fastify-plugin";
import { AsyncTask, CronJob } from "toad-scheduler";
import { DEFAULT_FEED_URL, FEED_CRON_EXPR } from "../modules/feedParser/consts";
import { feedParserService } from "../modules/feedParser/services/feedParser.service";

const pluginName = "schedule-plugin";

export default fp(
	async (fastify) => {
		await fastify.register(fastifySchedule);

		fastify.ready().then(() => {
			const feedParser = feedParserService(fastify.prisma);

			const feedTask = new AsyncTask(
				"daily-feed-parser",
				async () => {
					fastify.log.info("Starting daily feed parsing...");
					try {
						const url = DEFAULT_FEED_URL;
						await feedParser.parseAndSave(url);
						fastify.log.info("Feed saved successfully");
					} catch (err) {
						fastify.log.error({ err }, "Error while parsing feed");
					}
				},
				(err) => {
					fastify.log.error(err, "Unhandled error in feed parser task");
				},
			);

			const feedJob = new CronJob(
				{ cronExpression: FEED_CRON_EXPR },
				feedTask,
				{ preventOverrun: true },
			);

			fastify.scheduler.addCronJob(feedJob);
		});

		fastify.pluginLoaded(pluginName);
	},
	{ name: pluginName },
);
