import User from "../../models/userModel.js";
import joi from "joi";
import responseHelper from "../../utils/responseHelper.js";
import { validator } from "../../middlewares/index.js";

export default {
  validator: validator({
    body: joi.object({
      username: joi.string().required(),
    }),
  }),
  handler: async (req, res) => {
    try {
      const { username } = req.body;
      const existingUser = await User.findOne({ username, _id: { $ne: req.user.id } });
      if (existingUser) {
        return responseHelper.badRequest(res, "Username already exists");
      }
      const user = await User.findByIdAndUpdate(req.user.id, { username }, {
        new: true,
      });
      responseHelper.success(res, "User updated successfully", user); o
    } catch (error) {
      responseHelper.internalServerError(res, error.message);
    }
  }
}




