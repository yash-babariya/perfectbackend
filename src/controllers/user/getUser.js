import User from "../../models/userModel.js";
import responseHelper from "../../utils/responseHelper.js";
export default {
  handler: async (req, res) => {
    try {
      const role = req.user.role;
      if (role === "user") {
        const user = await User.findById(req.user.id);
        if (!user) {
          return responseHelper.notFound(res, "User not found");
        }
        responseHelper.success(res, "User fetched successfully", user);
      } else {
        const users = await User.find();
        responseHelper.success(res, "Users fetched successfully", users);
      }
    } catch (error) {
      responseHelper.internalServerError(res, error.message);
    }
  },
};
