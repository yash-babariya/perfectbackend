import User from "../../models/userModel.js";
import bcrypt from "bcrypt";

export default {
    signUp: async ({ username, email, password, role }) => {
        const hashedPassword = await bcrypt.hash(password, 10);
        return User.create({ username, email, password: hashedPassword, role });
    }
};

