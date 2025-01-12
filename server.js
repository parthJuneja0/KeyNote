// This file is to connect to MongoDB and start server
require('dotenv').config();
const connectToMongo = require('./db');
const path = require('path');
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

// Serve static files from the React app
const buildPath = path.join(__dirname, 'build');
app.use(express.static(buildPath));

// Catch-all route to serve React's index.html for other routes
app.get('*', (req, res) => {
    res.sendFile(path.join(buildPath, 'index.html'));
});

app.listen(5000, () => {
    console.log(`Server started at http://localhost:5000`);
});


