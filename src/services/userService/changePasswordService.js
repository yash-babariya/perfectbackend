import User from "../../models/userModel.js";
import { compare, hash } from "bcrypt";
import responseHelper from "../../utils/responseHelper.js";
export default {
    changePassword: async (req, res) => {
        const { oldPassword, newPassword } = req.body;
        const { id } = req.user;
        const foundUser = await User.findById(id);
        if (!foundUser) {
            return responseHelper.badRequest(res, "User not found");
        }
        const isMatch = await compare(oldPassword, foundUser.password);
        if (!isMatch) {
            return responseHelper.badRequest(res, "Old password is incorrect");
        }
        const hashedPassword = await hash(newPassword, 10);
        foundUser.password = hashedPassword;
        await foundUser.save();
        return responseHelper.success(res, "Password changed successfully", foundUser);
    }
}