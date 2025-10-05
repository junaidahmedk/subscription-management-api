import { Queue } from "bullmq";
import { redisConnection } from "./emailWorker.js";
import dayjs from "dayjs";
import Subscription from "../models/subscription.model.js";

const emailReminderQueue = new Queue("emailReminders", {
	connection: redisConnection,
});

//schedule reminders jobs for a given subscription

const REMINDERS = [7, 5, 2, 1];

const scheduleReminders = async (subscriptionId) => {
	const subscription = await Subscription.findById(subscriptionId).populate(
		"user",
		"name email"
	);
	if (!subscription || subscription.status !== "active")
		return console.log(
			`Subscription ${subscriptionId} is expired or not Found`
		);

	const renewalDate = dayjs(subscription.renewalDate);

	for (const daysBefore of REMINDERS) {
		const reminderDate = renewalDate.subtract(daysBefore, "day");

		if (reminderDate.isAfter(dayjs())) {
			const delay = reminderDate.diff(dayjs());

			await emailReminderQueue.add(
				"send-email",
				{ subscriptionId, daysBefore },
				{ delay }
			);
			console.log(
				`📅 Scheduled reminder ${daysBefore} days before at ${reminderDate.format(
					"YYYY-MM-DD HH:mm"
				)}`
			);
		}
	}
};

export default scheduleReminders;

// const sendEmail = async (req, res) => {
// 	try {
// 		await queue.add(
// 			"processingEmail",
// 			{
// 				user: req.body.userId,
// 				subscriptionName: req.body.subscription,
// 				duration: req.body.frequency,
// 			},
// 			{ priority: req.body.priority }
// 		);

// 		res.status(200).send("Task is added to the queue successfully");
// 	} catch (error) {
// 		console.error(error.message);
// 		res.status(500).send("error adding job to the queue");
// 	}
// };
