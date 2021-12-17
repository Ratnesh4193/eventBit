import express from "express";
import bcrypt from "bcryptjs";
import mongoose from "mongoose";
import userSchema from "../models/userSchema.js";
import asyncHandler from "express-async-handler";
import sendMail from "./mailRoutes.js";

const User = mongoose.model("User", userSchema);
const router = express.Router();

router.get(
	"/users",
	asyncHandler(async (req, res) => {
		const savedUsers = await User.find({});
		if (savedUsers) {
			return res.status(201).send(savedUsers);
		} else return res.status(500).send("Internal Server Error");
	})
);

router.post(
	"/user/signup",
	asyncHandler(async (req, res) => {
		const { name, email, password } = req.body;
		if (!name || !email || !password) {
			return res.status(422).json({ error: "fill all field" });
		}
		const savedUser = await User.findOne({ email });

		if (savedUser) {
			return res.status(422).json({ error: "User already exists" });
		}

		const hashedPassword = await bcrypt.hash(password, 12);
		const user = new User({
			name,
			email,
			password: hashedPassword,
		});
		const saved = await user.save();
		if (user) {
			sendMail({
				mail: email,
				subject: "eventBit Sign up",
				text: "eventBit Sign up",
			});
			res.json({ message: "saved user successfully" });
		} else {
			return res
				.status(401)
				.json({ error: "Please Try Again .. Internal server Error" });
		}
	})
);

router.get(
	"/user/signin",
	asyncHandler(async (req, res) => {
		const { email, password } = req.body;
		if (!email || !password) {
			return res.status(422).json({ error: "Fill mandatory fields " });
		}
		const savedUser = await User.findOne({ email });
		if (savedUser) {
			const matched = await bcrypt.compare(password, savedUser.password);
			if (matched) {
				const { _id, name, email } = savedUser;
				res.json({
					message: "User SignIn successfully",
					user: { _id, name, email },
				});
			} else return res.status(422).json({ error: "Invalid Credentials" });
		} else return res.status(422).json({ error: "Invalid Credentials" });
	})
);

export default router;
