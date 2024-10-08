import User from "../../models/userModel.js";
import bcrypt from "bcrypt";

export default {
    signUp: async (req, res) => {
        const { username, email, password, role } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({ username, email, password: hashedPassword, role });
        return responseHelper.success(res, "User created successfully", { user });
    }
};

