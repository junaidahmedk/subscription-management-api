import nodemailer from "nodemailer";
import { SMTP_HOST, SMTP_PASSWORD, SMTP_PORT, SMTP_USER } from "./env.js";

export const transporter = nodemailer.createTransport({
	host: SMTP_HOST,
	port: SMTP_PORT,
	secure: false, // true for 465, false for other ports
	auth: {
		user: SMTP_USER,
		pass: SMTP_PASSWORD,
	},
});
