import express from "express";
import mongoose from "mongoose";
import asyncHandler from "express-async-handler";
import eventSchema from "../models/eventSchema.js";

const Event = mongoose.model("Event", eventSchema);
const router = express.Router();

router.get(
	"/events",
	asyncHandler(async (req, res) => {
		const savedEvents = await Event.find({});
		if (savedEvents) {
			console.log(savedEvents);

			return res.status(201).send(savedEvents);
		} else return res.status(500).send("Internal Server Error");
	})
);

router.post(
	"/event/register",
	asyncHandler(async (req, res) => {
		const { name } = req.body;
		if (!name) {
			return res.status(422).json({ error: "fill all field" });
		}
		// const savedEvent = await Event.findOne({ name });

		// if (savedEvent) {
		// 	return res.status(422).json({ error: "Event already exists" });
		// }
		const event = new Event({
			name,
		});
		const saved = await event.save();
		if (saved) {
			// sendMail({
			// 	mail: email,
			// 	subject: "Main-Proj Sign up",
			// 	text: "Main-Proj Sign up",
			// });
			res.json({ message: "Event Created successfully", event: saved });
		} else {
			return res
				.status(401)
				.json({ error: "Please Try Again .. Internal server Error" });
		}
	})
);

export default router;
