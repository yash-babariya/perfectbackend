import Joi from "joi";
import { validator } from "../../middlewares/index.js";
import responseHelper from "../../utils/responseHelper.js";
import deleteUserService from "../../services/userService/deleteUserService.js";

export default {
    validator: validator({
        params: Joi.object({
            id: Joi.string().required(),
        }),
    }),
    handler: async (req, res) => {
        try {
            await deleteUserService.deleteUser(req, res);
        } catch (error) {
            return responseHelper.internalServerError(res, error.message);
        }
    }
}
