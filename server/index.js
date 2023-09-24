import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { auth } from "express-openid-connect";

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

const config = {
    authRequired: false, // You can set this to true if you want authentication for all routes
    auth0Logout: true,
    secret: process.env.AUTH0_CLIENT_SECRET,  // Use your Auth0 client secret here
    baseURL: 'http://localhost:5000',  // Your application base URL
    clientID: process.env.AUTH0_CLIENT_ID,  // Your Auth0 client ID
    issuerBaseURL: process.env.AUTH0_DOMAIN  // Your Auth0 domain
};

// OIDC Middleware
app.use(auth(config));

app.get('/', (req, res) => {
    res.send("Hello out there!")
})

app.use("/user", userRoutes);
app.use("/questions", questionRoutes);
app.use("/answer", answerRoutes);
app.use("/metrics", metricsRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`server running on port ${PORT}`);
});
