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
      await getUserService.getUser(req, res);
    } catch (error) {
      return responseHelper.internalServerError(res, error.message);
    }
  },
};