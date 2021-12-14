import mongoose from "mongoose";

var eventSchema = new mongoose.Schema({
	name: { type: String, required: true },
});

export default eventSchema;
