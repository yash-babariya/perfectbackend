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
            await LoginService.loginUser(req, res);
        } catch (error) {
            return responseHelper.internalServerError(res, error.message);
        }
    }
}
