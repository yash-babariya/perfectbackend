import User from "../../models/userModel.js";
import { compare, hash } from "bcrypt";

export default {
    changePassword: async (oldPassword, newPassword, user) => {
        const foundUser = await User.findById(user.id);
        if (!foundUser) {
            return { success: false, message: "User not found", statusCode: 404 };
        }
        const isMatch = await compare(oldPassword, foundUser.password);
        if (!isMatch) {
            return { success: false, message: "Old password is incorrect", statusCode: 400 };
        }
        const hashedPassword = await hash(newPassword, 10);
        foundUser.password = hashedPassword;
        await foundUser.save();
        return { success: true, message: "Password changed successfully", data: foundUser };
    }
}