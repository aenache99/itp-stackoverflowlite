const { Pool } = require('pg');
const mongoose = require('mongoose');


const pool = new Pool({
    user: process.env.PG_USER,
    host: process.env.PG_HOST,
    database: process.env.PG_DATABASE,
    password: process.env.PG_PASSWORD,
    port: process.env.PG_PORT,
});

pool.on('connect', () => {
    console.log('Connected to the PostgreSQL database.');
});

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Connected to the MongoDB database.');
    })
    .catch((err) => {
        console.error('Error connecting to MongoDB:', err);
    });


module.exports = pool;
