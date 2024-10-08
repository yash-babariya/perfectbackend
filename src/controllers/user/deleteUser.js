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
            const { id } = req.params;
            const result = await deleteUserService.deleteUser(id, req.user);
            if (!result.success) {
                return responseHelper.badRequest(res, result.message);
            }
            return responseHelper.success(res, "User deleted successfully", result.data);
        } catch (error) {
            return responseHelper.internalServerError(res, error.message);
        }
    }
}
