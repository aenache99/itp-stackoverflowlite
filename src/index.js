const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
require('./database');
require('dotenv').config();


app.use(express.json());

app.get('/', (req, res) => {
    res.send('Welcome to StackOverflow Light API!');
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
