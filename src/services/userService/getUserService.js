import User from "../../models/userModel.js";
import responseHelper from "../../utils/responseHelper.js";

export default {
    getUser: async (req, res) => {
        const { role, id } = req.user;
        const result = role === 'admin' ? await User.find() : await User.findById(id);
        if (!result) return responseHelper.badRequest(res, "User not found");
        return responseHelper.success(res, "User fetched successfully", result);
    }
}
