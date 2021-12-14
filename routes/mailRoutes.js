import express from "express";
import nodemailer from "nodemailer";
import asyncHandler from "express-async-handler";
const router = express.Router();

const sendMail = asyncHandler(async (data) => {
	let transporter = nodemailer.createTransport({
		host: "smtp.gmail.com",
		port: 587,
		secure: false, // true for 465, false for other ports
		auth: {
			user: process.env.MAIL_ID, // generated ethereal user
			pass: process.env.MAIL_PASSWORD, // generated ethereal password
		},
		tls: {
			rejectUnauthorized: false,
		},
	});
	let info = await transporter.sendMail({
		from: '"Team" <noreply.main-proj@gmail.com>', // sender address
		to: `${data.mail}`, // list of receivers
		subject: `${data.subject}`, // Subject line
		text: `${data.text}`, // plain text body
		html: "<b>Thanks for registering.<br>You can view your account now.</br>", // html body
	});

	console.log("Message sent: %s", info.messageId);
});

export default sendMail;
