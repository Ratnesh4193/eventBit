import mongoose from "mongoose";

var eventSchema = new mongoose.Schema({
	name: { type: String, required: true },
	organised_by: { type: mongoose.Types.ObjectId, ref: "Org", required: true },

	start_time: { type: String, default: Date.now() },
	end_time: { type: String, default: Date.now() },
	venue: { type: String },

	heading: { type: String, required: true },
	description: { type: String, required: true },
	images: [{ type: String }],

	fees: { type: Number, default: 0 },

	event_views: { type: String, default: 0 },
	user_registered: [{ type: mongoose.Types.ObjectId, ref: "User" }],
});

export default eventSchema;
