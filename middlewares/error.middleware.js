//actually middlewares are some blocks of code that are executed before or after something allowing us to intercept what is happening

//any kind of middleware in node.js or any backend consists of 4 parameters
//"err" -> the information that happened before the request
//"next" -> waht happenes next when u r ready to proceed to next step

//For Example
//we want to create a subscription
//then we have a middleware that checks for something (like check the renewal date)
//we can have as many middlewares as we want
//maybe  we have another middleware which checks for the errors
//and only when both of these middlewares have called their 'next()' status, then we will navigate over to the controller which handles the actual logic of creating a subscription

//"Flow Chart"
//Create a Subscription -> middleware 1 (check for renewal date) -> middleware 2 (check for errors) -> controller

//Global Error Handling Middleware for our APP apart from built-in middlewares

const errorMiddleware = (err, req, res, next) => {
	try {
		let error = { ...err };
		error.message = err.message;
		console.error(err);

		//Mongoose bad ObjectID
		if (err.name === "CastError") {
			const message = "Resource not found";
			error = new Error(message);
			error.statusCode = 404;
		}

		//Mongoose duplicate key
		if (err.code === 11000) {
			const message = "Duplicate field value entered";
			error = new Error(message);
			error.statusCode = 400;
		}

		//Mongoose Document Model validation error
		if (err.name === "ValidationError") {
			const message = Object.values(err.errors).map((val) => val.message);
			error = new Error(message.join(", "));
			error.statusCode = 400;
		}

		res
			.status(error.statusCode || 500)
			.json({ success: false, error: error.message || "Server Error" });
	} catch (error) {
		next(error);
	}
};

export default errorMiddleware;
