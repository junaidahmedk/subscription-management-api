import mongoose from "mongoose";
import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { JWT_EXPIRES_IN, JWT_SECRET } from "../config/env.js";

export const signUp = async (req, res, next) => {
	const session = await mongoose.startSession();

	//this above session in not a user session instead its a session of mongoose transaction
	//here we have initiated a 'startTransaction' function becasue we wanna perform the 'Atomic Updates' or also called 'Atomic Operations'
	//Atomic Operations: Database operations that update the state are atomic. (means we the operation is 'All' or 'Nothing')
	//e.g
	//Insert operation either works completly or it doesn't
	//Update operation either works completly or it doesn't
	//We never get half operation
	session.startTransaction();

	try {
		//Logic to create a new user

		//What is "req.body": A 'req.body' is an object that contains data from the client or user (frontend)
		//this object is part of the 'POST' request sent by the frontend to the backend

		const { name, email, password } = req.body;

		//check if a user already exists
		const existingUser = await User.findOne({ email });
		if (existingUser) {
			const error = new Error("User already exists");
			error.statusCode = 409;
			throw error;
		}

		//if User not Exist
		//Hash password
		const salt = await bcrypt.genSalt(10);
		const hashedPassword = await bcrypt.hash(password, salt);

		const newUsers = await User.create(
			[{ name, email, password: hashedPassword }],
			{ session }
		);
		const token = jwt.sign({ userId: newUsers[0]._id }, JWT_SECRET, {
			expiresIn: JWT_EXPIRES_IN,
		});

		await session.commitTransaction();
		session.endSession();

		res.status(201).json({
			success: true,
			message: "User created successfully",
			data: {
				token,
				user: newUsers[0],
			},
		});
	} catch (error) {
		await session.abortTransaction();
		session.endSession();
		next(error);
	}
};

export const signIn = async (req, res, next) => {
	try {
		const { email, password } = req.body;

		const user = await User.findOne({ email });
		if (!user) {
			const error = new Error("User not Found");
			error.statusCode = 404;
			throw error;
		}

		const isPasswordValid = await bcrypt.compare(password, user.password);

		if (!isPasswordValid) {
			const error = new Error("Invalid Password");
			error.statusCode = 401;
			throw error;
		}

		const token = jwt.sign({ userId: user._id }, JWT_SECRET, {
			expiresIn: JWT_EXPIRES_IN,
		});

		res.status(200).json({
			success: true,
			message: "User successfully signed-In",
			data: {
				token,
				user,
			},
		});
	} catch (error) {
		next(error);
	}
};

export const signOut = async (req, res, next) => {};
