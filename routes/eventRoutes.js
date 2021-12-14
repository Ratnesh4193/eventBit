import express from "express";
import mongoose from "mongoose";
import asyncHandler from "express-async-handler";
import eventSchema from "../models/eventSchema.js";

const Event = mongoose.model("Event", eventSchema);
const router = express.Router();

export default router;
