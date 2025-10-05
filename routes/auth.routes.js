import { Router } from "express";
import { signIn, signOut, signUp } from "../controllers/auth.controller.js";

const authRouter = Router();

//Basically, the routes are just the endpoints that we can hit
//and the controllers/handlers form the logic of what happens once you hit those routes

//Path: /api/v1/auth/sign-up (POST)
authRouter.post("/sign-up", signUp);

//Path: /api/v1/auth/sign-in (POST)
authRouter.post("/sign-in", signIn);

//Path: /api/v1/auth/sign-out (POST)
authRouter.post("/sign-out", signOut);

export default authRouter;
