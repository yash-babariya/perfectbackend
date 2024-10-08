import User from "../../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../../config/config.js";
import responseHelper from "../../utils/responseHelper.js";

export default {
    loginUser: async ({ username, email, password }) => {
        const user = await User.findOne({ $or: [{ username }, { email }] });
        if (!user) {
            return { success: false, message: "Invalid username or email" };
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return { success: false, message: "Invalid password" };
        }
        const token = jwt.sign({ id: user._id, role: user.role }, JWT_SECRET);

        return { success: true, token };

    }
}
