import Joi from "joi";
import responseHelper from "../../utils/responseHelper.js";
import { validator } from "../../middlewares/index.js";
import LoginService from "../../services/userService/loginService.js";

export default {
    validator: validator({
        body: Joi.object({
            username: Joi.string(),
            email: Joi.string().email(),
            password: Joi.string().required(),
        }).xor('username', 'email'),
    }),
    handler: async (req, res) => {
        try {
            const { username, email, password } = req.body;
            const result = await LoginService.loginUser({ username, email, password });
            if (!result.success) {
                return responseHelper.badRequest(res, result.message);
            }

            return responseHelper.success(res, "Login successful", { token: result.token });

        } catch (error) {
            return responseHelper.internalServerError(res, error.message);
        }
    }
}
