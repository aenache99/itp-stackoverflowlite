import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import userRoutes from "./routes/v1/users.js";
import questionRoutes from "./routes/v1/Questions.js";
import answerRoutes from "./routes/v1/Answers.js";
import metricsRoutes from "./routes/v1/Metrics.js";
import connectDB from "./database.js";

dotenv.config();
connectDB();

const app = express();
app.use(express.json({ limit: "30mb", extended: true }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

app.get('/', (req, res) => {
    res.send("This is a stack overflow clone API")
})

app.use("/user", userRoutes);
app.use("/questions", questionRoutes);
app.use("/answer", answerRoutes);
app.use("/metrics", metricsRoutes);

const PORT = process.env.PORT || 5000
const DATABASE_URL = process.env.CONNECTION_URL

app.listen(PORT, () => {
    console.log(`server running on port ${PORT}`);
});
