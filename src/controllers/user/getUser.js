import responseHelper from "../../utils/responseHelper.js";
import getUserService from "../../services/userService/getUserService.js";

export default {
  validator: (req, res, next) => {
    if (!["admin", "user", "seller"].includes(req.user.role)) {
      return responseHelper.forbidden(res, "Unauthorized");
    }
    next();
  },
  handler: async (req, res) => {
    try {
      const { role, id } = req.user;
      const result = await getUserService.getUser(id, role);
      if (!result.success) {
        return responseHelper.badRequest(res, result.message);
      }
      return responseHelper.success(res, "User fetched successfully", result.data);
    } catch (error) {
      return responseHelper.internalServerError(res, error.message);
    }
  },
};