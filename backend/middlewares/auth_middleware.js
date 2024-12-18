const jwt = require("jsonwebtoken");

const protect = (req, res, next) => {

    try {
        const authorization = req.headers.authorization;

        
        if (!authorization) {
            res.status(400);
            throw new Error("You are not signed in");
        }

        if (!authorization.startsWith("Bearer")) {
            res.status(400);
            throw new Error("Bearer not detected");
        }

        const token = authorization.split(" ")[1];

        if (!jwt.verify(token, process.env.ACCESS_SECRET)) {
            res.status(403);
            throw new Error("Not valid token")
        }

        const decodedToken = jwt.decode(token);

        req.id = decodedToken.id;
        
        next();


    } catch (error) {
        next(error.message);
    }
}

module.exports = protect;