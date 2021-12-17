import express from "express";
import bcrypt from "bcryptjs";
import mongoose from "mongoose";
import asyncHandler from "express-async-handler";
import orgSchema from "../models/orgSchema.js";
import sendMail from "./mailRoutes.js";

const Org = mongoose.model("Org", orgSchema);
const router = express.Router();

router.get(
	"/orgs",
	asyncHandler(async (req, res) => {
		const savedOrgs = await Org.find({});
		if (savedOrgs) {
			return res.status(201).json({ savedOrgs });
		} else return res.status(500).send("Internal Server Error");
	})
);

router.post(
	"/org/signup",
	asyncHandler(async (req, res) => {
		const { name, email, password } = req.body;
		if (!name || !email || !password) {
			return res.status(422).json({ error: "fill all field" });
		}
		const savedOrg = await Org.findOne({ email });
		if (savedOrg) {
			return res.status(422).json({ error: "Organisation already exists" });
		}
		const hashedPassword = await bcrypt.hash(password, 12);
		const org = new Org({
			name,
			email,
			password: hashedPassword,
		});
		const saved = await org.save();
		if (saved) {
			sendMail({
				mail: email,
				subject: "Main-Proj Sign up",
				text: "Main-Proj Sign up",
			});
			res.status(201).json({ message: "saved org successfully", org: saved });
		} else res.status(401).json({ message: "Internal Server Error" });
	})
);

router.get(
	"/org/signin",
	asyncHandler(async (req, res) => {
		const { email, password } = req.body;
		if (!email || !password) {
			return res.status(422).json({ error: "Fill mandatory fields " });
		}
		const savedOrg = await Org.findOne({ email });
		const matched = await bcrypt.compare(password, savedOrg.password);
		if (matched) {
			const { _id, name, email } = savedOrg;
			res.json({
				message: "Org SignIn successfully",
				org: { _id, name, email },
			});
		} else return res.status(422).json({ error: "Invalid Credentials" });
	})
);

export default router;
