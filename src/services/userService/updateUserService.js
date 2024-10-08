import User from "../../models/userModel.js";
import responseHelper from "../../utils/responseHelper.js";

export default {
    updateUser: async (req, res) => {
        const { username } = req.body;
        const { id } = req.user;
        const existingUser = await User.findOne({ username, _id: { $ne: id } });
        if (existingUser) {
            return responseHelper.badRequest(res, "Username already exists");
        }
        const user = await User.findByIdAndUpdate(id, { username }, {
            new: true,
        });
        return responseHelper.success(res, "User updated successfully", user);
    }
}
