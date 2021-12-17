import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import "./config/db.js";
import userRoutes from "./routes/userRoutes.js";
import orgRoutes from "./routes/orgRoutes.js";
import eventRoutes from "./routes/eventRoutes.js";
import { errorHandler, notFound } from "./middleware/errorMiddleware.js";

const app = express();
dotenv.config();

const jsonParser = bodyParser.json();
app.use(jsonParser);
app.use(express.json());

app.use(userRoutes);
app.use(orgRoutes);
app.use(eventRoutes);

app.use(notFound);
app.use(errorHandler);

app.get("/", (req, res) => {
	res.send("API is running");
});

const PORT = process.env.PORT || 8000;
const MODE = process.env.MODE;
app.listen(PORT, () => {
	console.log(`Server Running on PORT:${PORT} in ${MODE} mode`);
});
