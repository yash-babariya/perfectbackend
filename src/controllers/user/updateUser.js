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
      const existingUser = await User.findOne({ username });
      if (existingUser && existingUser._id.toString() !== req.user.id) {
        return responseHelper.badRequest(res, "Username already exists");
      }
      const user = await User.findByIdAndUpdate(req.user.id, req.body, {
        new: true,
      });
      responseHelper.success(res, "User updated successfully", user);
    } catch (error) {
      responseHelper.internalServerError(res, error.message);
    }
  }
}

