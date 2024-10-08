import User from "../../models/userModel.js";
import { compare, hash } from "bcrypt";
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
            const { oldPassword, newPassword } = req.body;
            const result = await changePasswordService.changePassword(oldPassword, newPassword, req.user);
            if (!result.success) {
                return responseHelper.badRequest(res, result.message);
            }
            return responseHelper.success(res, "Password changed successfully", result.data);
        } catch (error) {
            return responseHelper.internalServerError(res, error.message);
        }
    },
};
