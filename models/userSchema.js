import mongoose from "mongoose";

var userSchema = new mongoose.Schema({
	name: { type: String, required: true },
	username: { type: String, required: true },
	email: { type: String, required: true },
	contact_number: { type: Number },
	password: { type: String, required: true },
	org: { type: mongoose.Types.ObjectId, ref: "Org" },
	event_registered: [{ type: mongoose.Types.ObjectId, ref: "Event" }],
	gender: { type: String, enum: ["male", "female"], default: "male" },
	token: { type: String, required: true },
});

export default userSchema;
