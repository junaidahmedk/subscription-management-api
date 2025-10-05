import { config } from "dotenv";

//config() loads variables from .env.* into process.env.

//Your destructuring works only because config() already populated process.env.

//Without config(), you’d have to manually export all variables in your terminal before starting the app.

config({ path: `.env.${process.env.NODE_ENV || "development"}.local` });

export const {
	PORT,
	NODE_ENV,
	JWT_SECRET,
	JWT_EXPIRES_IN,
	ARCJET_KEY,
	ARCJET_ENV,
	DB_URI,
	SMTP_HOST,
	SMTP_PORT,
	SMTP_USER,
	SMTP_PASSWORD,
	REDIS_HOST,
	REDIS_PORT,
} = process.env;
