const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const questionRoutes = require('../routes/questionRoutes');
const answerRoutes = require('./src/routes/answerRoutes');
const userRoutes = require('./src/routes/userRoutes');
const authRoutes = require('./src/routes/authRoutes');
const socketIo = require('socket.io');
const http = require('http');
const { authMiddleware } = require('./src/middleware/authMiddleware');

dotenv.config();

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));

app.use(express.json());
app.use(cors());

app.use('/api/questions', authMiddleware, questionRoutes);
app.use('/api/answers', authMiddleware, answerRoutes);
app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes);

// Real-time updates with socket.io
io.on('connection', (socket) => {
    console.log('New client connected');
    socket.on('disconnect', () => {
        console.log('Client disconnected');
    });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

module.exports = app; // for testing
