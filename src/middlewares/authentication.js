import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config/config.js";
import responseHelper from "../utils/responseHelper.js";

export default (roles = ["user", "admin"]) => (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader) {
            return responseHelper.unauthorized(res, "Authorization header is missing");
        }

        const [bearer, token] = authHeader.split(" ");
        if (bearer !== "Bearer" || !token) {
            return responseHelper.unauthorized(res, "Invalid authorization format");
        }

        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = decoded;
        return next();
    } catch (error) {
        if (error instanceof jwt.JsonWebTokenError) {
            return responseHelper.unauthorized(res, "Invalid token");
        }
        return responseHelper.internalServerError(res, "Authentication error");
    }
}