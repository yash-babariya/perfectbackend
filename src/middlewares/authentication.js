import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config/config.js";
import responseHelper from "../utils/responseHelper.js";

export default (roles = ["user", "admin"]) => (req, res, next) => {
    try {
        let token = req.headers.authorization.split(" ")[1];
        if (!token) {
            return responseHelper.unauthorized(res, "token is required");
        }
        const decoded = jwt.verify(token, JWT_SECRET);
        if (!decoded) {
            return responseHelper.unauthorized(res, "invalid token");
        }
        req.user = decoded;
        if (roles && !roles.includes(decoded.role)) {
            return responseHelper.unauthorized(res, "You are not authorized to access this route");
        }
        return next();
    } catch (error) {
        return responseHelper.unauthorized(res, error.message);
    }
}