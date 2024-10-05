import User from "../../models/userModel.js";
import { compare, hash } from "bcrypt";
import responseHelper from "../../utils/responseHelper.js";

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
            const user = await User.findById(req.user.id);
            if (!user) {
                return responseHelper.notFound(res, "User not found");
            }
            const isMatch = await compare(oldPassword, user.password);
            if (!isMatch) {
                return responseHelper.badRequest(res, "Old password is incorrect");
            }
            const hashedPassword = await hash(newPassword, 10);
            user.password = hashedPassword;
            await user.save();
            responseHelper.success(res, "Password changed successfully");
        } catch (error) {
            responseHelper.internalServerError(res, error.message);
        }
    },
};
