import { Worker } from "bullmq";
import { REDIS_HOST, REDIS_PORT } from "../config/env.js";
import Subscription from "../models/subscription.model.js";
import { sendReminderEmail } from "../utils/send-email.js";

export const redisConnection = { host: REDIS_HOST, port: REDIS_PORT };

const processEmail = async (job) => {
	const { subscriptionId, daysBefore } = job.data;
	const subscription = await Subscription.findById(subscriptionId).populate(
		"user",
		"name email"
	);

	if (!subscription || subscription.status !== "active")
		return console.log(
			`Subscription ${subscriptionId} is expired or not Found`
		);

	console.log(
		`📨 Sending reminder email for subscription ${subscriptionId}, ${daysBefore} days before renewal.`
	);

	await sendReminderEmail({
		to: subscription.user.email,
		type: `${daysBefore} days before reminder`,
		subscription,
	});
};

const emailReminderWorker = new Worker("emailReminders", processEmail, {
	connection: redisConnection,
});

//WORKER EVENTS

emailReminderWorker.on("completed", (job) => {
	console.log(
		`✅ Reminder job completed for ${job.data.subscriptionId} (${job.data.daysBefore} days before)`
	);
});

emailReminderWorker.on("failed", (job, err) => {
	console.error(
		`❌ Reminder job failed for ${job?.data?.subscriptionId}:`,
		err
	);
});

export default emailReminderWorker;
