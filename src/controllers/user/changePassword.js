import responseHelper from "../../utils/responseHelper.js";
import changePasswordService from "../../services/userService/changePasswordService.js";

export default {
    validator: (req, res, next) => {
        const { oldPassword, newPassword } = req.body;
        if (!oldPassword || !newPassword) {
            return responseHelper.badRequest(res, "Old password and new password are required");
        }
        next();
    },
    handler: async (req, res) => {
        try {
            await changePasswordService.changePassword(req, res);
        } catch (error) {
            return responseHelper.internalServerError(res, error.message);
        }
    },
};
