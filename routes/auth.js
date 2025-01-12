const express = require('express');
const router = express.Router();

const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Accessing User model
const User = require('../models/User');

// Importing middlewares
const fetchuser = require('../middlewares/fetchuser');

// Route 1: Create a user using: POST "/api/auth/userjoin".
router.post('/userjoin', [
    body('name', 'Enter a valid name').isLength({ min: 3 }),
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Password must be atleast 5 characters').isLength({ min: 5 })
],
    async (req, res) => {
        let success = false;

        if (!validationResult(req).isEmpty()) {
            return res.status(400).json({ success, errors: validationResult(req).array() });
        }

        // Destructuring the req.body
        const { name, email, password } = req.body;

        // Check whether the user with this email exists already
        let existingUser = await User.findOne({ email: email })
        if (existingUser) {
            return res.status(400).json({ success, error: "Sorry, a user with this email already exists" });
        }

        // Hashing the password
        const salt = await bcrypt.genSalt(10);
        const securedPass = await bcrypt.hash(password, salt);

        // Create a new user
        User.create({
            name: name,
            email: email,
            password: securedPass
        })

            .then(newUser => {
                success = true;
                let data = {
                    user: {
                        id: newUser._id
                    }
                }
                const authToken = jwt.sign(data, process.env.JWT_SECRET)
                res.json({ success, authToken });
            })

            .catch(err => {
                console.error(err);
                res.status(500).json({ error: 'An error occurred', err });
            })
    })

// Route 2: Authenticate a user using: POST "/api/auth/login".
router.post('/login', [
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Password must be atleast 5 characters').isLength({ min: 5 })
],
    async (req, res) => {
        let success = false;

        const { email, password } = req.body;

        if (!validationResult(req).isEmpty()) {
            return res.status(400).json({ success, errors: validationResult(req).array() });
        }

        try {
            let user = await User.findOne({ email: email })
            if (!user) {
                return res.status(400).json({ success, "error": "Enter valid credentials" });
            }

            // Compare the password
            let passwordCompare = await bcrypt.compare(password, user.password);
            if (!passwordCompare) {
                return res.status(400).json({ success, "error": "Enter valid credentials" });
            }

            let data = {
                user: {
                    id: user._id
                }
            }
            success = true;
            const authToken = jwt.sign(data, process.env.JWT_SECRET)
            res.json({ success, authToken });
        } catch (error) {
            console.error(error);
            res.status(500).json({ "error": 'An error occurred' });
        }
    });

// Route 3: Get loggedin user details using: POST "/api/auth/getuser".
router.get('/getuser', fetchuser, async (req, res) => {
    let success = true;
    try {
        const userId = req.user.id;
        const user = await User.findById(userId).select("-password");
        res.status(200).json({ success, user });
    } catch (error) {
        console.error(error);
        res.status(500).json({ "error": 'An error occurred' });
    }
})
module.exports = router;