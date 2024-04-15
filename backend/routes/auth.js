const express = require('express');
const router = express.Router();

const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Must not be exposed to the public
const JWT_SECRET = 'thisisasecret';

// Accessing User model
const User = require('../models/User');

// Importing middlewares
const fetchuser = require('../middlewares/fetchuser');


// Here we will get the authentication related data of the user, and then the user doesn't require authentication

// Route 1: Create a user using: POST "/api/auth/userjoin". Doesn't require login
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
        // or we can directly use req.body.name, req.body.email, req.body.password

        // Check whether the user with this email exists already
        let existingUser = await User.findOne({ email: email })
        if (existingUser) {
            return res.status(400).json({ success, error: "Sorry, a user with this email already exists" });
        }
        // return is necessary otherwise following statements will be executed

        // Hashing the password
        const salt = await bcrypt.genSalt(10);
        // A random salt will be generated every time this end point is hit 
        // console.log(salt)

        const securedPass = await bcrypt.hash(password, salt);

        // Create a new user
        User.create({
            name: name,
            email: email,
            password: securedPass
        })

            // Another method to create a new user
            // const newUser = new User({
            //     name: name,
            //     email: email,
            //     password: securedPass
            // })
            // newUser.save()
            // This is to save the user in the database


            .then(newUser => {
                success = true;
                let data = {
                    // userId: newUser._id
                    user: {
                        id: newUser._id
                    }
                }
                const authToken = jwt.sign(data, JWT_SECRET)
                // res.json(newUser);
                res.json({ success, authToken });
            })
            // await can also be used in place of .then()

            .catch(err => {
                console.error(err);
                res.status(500).json({ error: 'An error occurred', err });
            })
        // Using try{} catch{} block is also a good option
        // catch(error){
        //     console.error(error.message);
        // }
    })

// Route 2: Authenticate a user using: POST "/api/auth/userlogin". Doesn't require login
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
                // userId: user._id 
                user: {
                    id: user._id
                }
            }
            success = true;
            const authToken = jwt.sign(data, JWT_SECRET)
            // Authentication token signature will be different in this end point for the same user because jwt.sign method includes a timestamp as part of the token payload by default.
            res.json({ success, authToken });
        } catch (error) {
            console.error(error);
            res.status(500).json({ "error": 'An error occurred' });
        }
    });

// Route 3: Get loggedin user details using: POST "/api/auth/getuser". Require login
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