const jwt = require('jsonwebtoken');

// Must not be exposed to the public
const JWT_SECRET = 'thisisasecret';

const fetchuser = async (req, res, next) => {
    const token = await req.header('auth-token');
    if (!token) {
        res.status(401).send({ error: "Token not sent" })
    }
    try {
        const data = await jwt.verify(token, JWT_SECRET);
        // It will return payload data
        console.log(data)

        // console.log(req.user)
        req.user = data.user;
        console.log(req.user)

        next();
        // next() will call the next function in the stack
    } catch (error) {
        console.log(error.message)
        res.status(401).send({ error: error.message })
    }
}

module.exports = fetchuser;