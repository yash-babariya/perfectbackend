import User from "../../models/userModel.js";
import responseHelper from "../../utils/responseHelper.js";

export default {
    getUser: async (id, role) => {
        const result = role === 'admin' ? await User.find() : await User.findById(id);
        if (!result) return { success: false, message: "User not found" };
        return { success: true, data: result };
    }
}
