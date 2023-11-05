const jwt = require("jsonwebtoken");
const {createError} = require("./error")

const verifyToken = (req, res, next) => {
    console.log("Verify Token Middleware is executed.");
    const token = req.cookies.access_token;
    
    if (!token) return next(createError(401, "You are not authenticated"));

    jwt.verify(token, process.env.JWT, (err, user) => {
        if (err) {
            console.log("JWT Verification Error:", err); // Add this line for error logging
            return next(createError(403, "Token is not valid"));
        }
        req.user = user;
        next();
    });
};

module.exports = {verifyToken};