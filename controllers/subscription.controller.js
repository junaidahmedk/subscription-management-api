import Subscription from "../models/subscription.model.js";
import scheduleReminders from "../queues/emailScheduler.js";

export const createSubscription = async (req, res, next) => {
	try {
		const subscription = await Subscription.create({
			...req.body,
			//This user is not part of the req.body rather the user id is coming form the "auth.middleware.js" that we put before creating any subscription to allow the subscription creation for only currently logged-in users
			//We put "authorize" function before the "createSubscription" function to validate the user sending this subscription request is actually the logged-in user or not
			//e.g subscriptionRouter.post("/", authorize,createSubscription)
			user: req.user._id,
		});

		// Schedule reminders for this new subscription
		await scheduleReminders(subscription._id);

		res.status(201).json({ success: true, data: subscription });
	} catch (error) {
		next(error);
	}
};

export const getUserSubscriptions = async (req, res, next) => {
	try {
		if (req.user.id !== req.params.id) {
			const error = new Error("You are not the owner of this account");
			error.status = 401;
			throw error;
		}

		const subscriptions = await Subscription.find({ user: req.params.id });

		res.status(200).json({
			success: true,
			data: subscriptions,
		});
	} catch (error) {
		next(error);
	}
};
