// This file is to connect to MongoDB and start server
require('dotenv').config();
const connectToMongo = require('./db');
const path = require('path');
connectToMongo();

const express = require('express');
const app = express();
const cors = require('cors');

// CORS Configuration
const corsOptions = {
    origin: [
        'https://key-note.vercel.app',
        'http://localhost:3000',
        'http://127.0.0.1:3000',
        // Add your local development URLs here
    ],
    credentials: true, // Allow cookies and credentials
    optionsSuccessStatus: 200, // For legacy browser support
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: [
        'Origin',
        'X-Requested-With',
        'Content-Type',
        'Accept',
        'Authorization',
        'auth-token' // If you're using custom auth headers
    ]
};

// Middlewares 
app.use(cors(corsOptions)); // Configured CORS with specific origins
app.use(express.json()); // This is to use the req.body in the routes

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

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server started at http://localhost:${PORT}`);
});