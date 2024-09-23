import jwt from "jsonwebtoken";
import { errorHandler } from "./error.js";

// authentication middleware
export const verifyToken = (req, res, next) => {

    // retrieve JWT from cookie named access_token from the incoming request
    const token = req.cookies.access_token; 

    if (!token) {
        return next(errorHandler(401), 'Unauthorized');
    }
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) {
            return next(errorHandler(401), 'Unauthorized');
        }
        req.user = user;
        next();
    })
};
