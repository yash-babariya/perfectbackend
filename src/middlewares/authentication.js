import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config/config.js";

export default (roles = ["user", "admin"]) => (req, res, next) => {
    try {
        let token = req.headers.authorization.split(" ")[1];
        if (!token) {
            return res.status(401).json({ message: "token is required" });
        }
        const decoded = jwt.verify(token, JWT_SECRET);
        if (!decoded) {
            return res.status(401).json({ message: "invalid token" });
        }
        req.user = decoded;
        if (roles && !roles.includes(decoded.role)) {
            return res.status(401).json({ message: "You are not authorized to access this route" });
        }
        return next();
    } catch (error) {
        return res.status(401).json({ message: "Unauthorized" });
    }
}