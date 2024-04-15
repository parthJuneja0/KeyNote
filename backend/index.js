// This file is to connect to MongoDB and start server
const connectToMongo = require('./db');
connectToMongo();

const express = require('express');
const app = express();
const cors = require('cors');

// Middlewares 
app.use(cors()); // This is to allow cross-origin requests from frontend (API calls from frontend)) 
app.use(express.json()); //This is to use the req.body in the routes

// Available Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/notes', require('./routes/notes'));

// Routes
app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.listen(5000, () => {
    console.log(`Server started at http://localhost:5000`);
});


