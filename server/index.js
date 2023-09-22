import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import http from 'http';
import socketIo from 'socket.io';

import userRoutes from "./routes/v1/users.js";
import questionRoutes from "./routes/v1/Questions.js";
import answerRoutes from "./routes/v1/Answers.js";
import metricsRoutes from "./routes/v1/Metrics.js";
import connectDB from "./database.js";

dotenv.config();
connectDB();

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"]
    }
});

io.on('connection', (socket) => {
    console.log('User connected');

    socket.on('disconnect', () => {
        console.log('User disconnected');
    });

    // Additional socket listeners here
});

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

server.listen(PORT, () => {
    console.log(`server running on port ${PORT}`);
});
