import User from "../../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../../config/config.js";
import responseHelper from "../../utils/responseHelper.js";


export default {
    loginUser: async (req, res) => {
        const { username, email, password } = req.body;
        const user = await User.findOne({ $or: [{ username }, { email }] });
        if (!user) {
            return responseHelper.badRequest(res, "Invalid username or email");
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return responseHelper.badRequest(res, "Invalid password");
        }
        const token = jwt.sign({ id: user._id, role: user.role }, JWT_SECRET);

        return responseHelper.success(res, "Login successful", { token });

    }
}
