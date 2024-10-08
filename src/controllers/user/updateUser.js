import User from "../../models/userModel.js";
import joi from "joi";
import responseHelper from "../../utils/responseHelper.js";
import { validator } from "../../middlewares/index.js";
import updateUserService from "../../services/userService/updateUserService.js";

export default {
  validator: validator({
    body: joi.object({
      username: joi.string().required(),
    }),
  }),
  handler: async (req, res) => {
    try {
      await updateUserService.updateUser(req, res);
    } catch (error) {
      return responseHelper.internalServerError(res, error.message);
    }
  }
}




