import User from "../../models/userModel.js";

export default {
    updateUser: async (id, data) => {
        const { username } = data;
        const existingUser = await User.findOne({ username, _id: { $ne: id } });
        if (existingUser) {
            return { success: false, message: "Username already exists" };
        }
        const user = await User.findByIdAndUpdate(id, { username }, {
            new: true,
        });
        return { success: true, data: user };
    }
}
