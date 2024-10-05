import Joi from "joi";
import User from "../../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import responseHelper from "../../utils/responseHelper.js";
import { validator } from "../../middlewares/index.js";

export default {
    validator: validator({
        body: Joi.object({
            username: Joi.string(),
            email: Joi.string().email(),
            password: Joi.string().required(),
        }).xor('username', 'email'),
        params: Joi.object({
            uniqueId: Joi.string().optional(),
        }),
        query: Joi.object({
            uniqueId: Joi.string().optional(),
        }),
    }),
    handler: async (req, res) => {
        try {
            const { username, email, password } = req.body;
            const user = await User.findOne({ $or: [{ username }, { email }] });
            if (!user) {
                return responseHelper.notFound(res, "User not found");
            }
            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                return responseHelper.badRequest(res, "Invalid password");
            }
            const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET);
            responseHelper.success(res, "Login successful", { token });
        } catch (error) {
            responseHelper.internalServerError(res, error.message);
        }
    }
}
