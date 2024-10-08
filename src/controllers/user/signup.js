import Joi from "joi";
import { validator } from "../../middlewares/index.js";
import responseHelper from "../../utils/responseHelper.js";
import SignUpService from "../../services/userService/signUpService.js";

export default {
    validator: validator({
        body: Joi.object({
            username: Joi.string().required(),
            email: Joi.string().email().required(),
            role: Joi.string().valid("user", "seller").required(),
            password: Joi.string().required(),
        }),
    }),
    handler: async (req, res) => {
        try {
            const { username, email, role, password } = req.body;
            const user = await SignUpService.signUp({ username, email, role, password });
            return responseHelper.success(res, "User created successfully", user);
        } catch (error) {
            return responseHelper.internalServerError(res, error.message);
        }
    }
}