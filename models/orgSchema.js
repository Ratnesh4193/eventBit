import mongoose from "mongoose";

var orgSchema = new mongoose.Schema({
	name: { type: String, required: true },
	orgname: { type: String, required: true },
	email: { type: String, required: true },
	contact_number: { type: Number, required: true },
	event_hosted: [{ type: mongoose.Types.ObjectId, ref: "Event" }],
	address: { type: String, required: true },
	password: { type: String, required: true },
	token: { type: String, required: true },
});

export default orgSchema;
