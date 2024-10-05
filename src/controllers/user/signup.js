import User from "../../models/userModel.js";
import bcrypt from "bcrypt";
import Joi from "joi";
import { validator } from "../../middlewares/index.js";
import responseHelper from "../../utils/responseHelper.js";

export default {
    validator: validator({
        body: Joi.object({
            username: Joi.string().required(),
            email: Joi.string().email().required(),
            password: Joi.string().required(),
        }),
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
            const hashedPassword = await bcrypt.hash(password, 10);
            const user = await User.create({ username, email, password: hashedPassword });
            responseHelper.success(res, "User created successfully", user);
        } catch (error) {
            responseHelper.internalServerError(res, error.message);
        }
    }
}