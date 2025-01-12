const jwt = require('jsonwebtoken');

const fetchuser = async (req, res, next) => {
    const token = await req.header('auth-token');
    if (!token) {
        res.status(401).send({ error: "Token not sent" })
    }
    try {
        const data = await jwt.verify(token, process.env.JWT_SECRET);
        req.user = data.user;

        next();
    } catch (error) {
        console.log(error.message)
        res.status(401).send({ error: error.message })
    }
}

module.exports = fetchuser;