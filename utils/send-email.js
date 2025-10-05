import { SMTP_USER } from "../config/env.js";
import { transporter } from "../config/nodemailer.js";
import { emailTemplates } from "./email-templates.js";
import dayjs from "dayjs";

export const sendReminderEmail = async ({ to, type, subscription }) => {
	if (!to || !type)
		throw new Error("Missing Required Parameters i.e 'to' or 'type'");

	const template = emailTemplates.find((t) => t.label === type);

	if (!template) throw new Error("Invalid Email Type");

	const mailInfo = {
		subscriptionName: subscription.name,
		userName: subscription.user.name,
		planName: subscription.name,
		renewalDate: dayjs(subscription.renewalDate).format("MMM-D, YYYY"),
		paymentMethod: subscription.paymentMethod,
		price: subscription.price,
	};

	//generate email subject
	const subject = template.generateSubject(mailInfo);
	//generate email body
	const message = template.generateBody(mailInfo);

	const mailOptions = {
		from: SMTP_USER,
		to: to,
		subject: subject,
		html: message,
	};

	transporter.sendMail(mailOptions, (error, info) => {
		if (error) return console.log("error sending message", error);
		console.log("Email Sent" + info.response);
	});
};
