import User from "../../models/userModel.js";
import responseHelper from "../../utils/responseHelper.js";

export default {
    deleteUser: async (req, res) => {
        const { id } = req.params;
        const { role, id: currentUserId } = req.user;
        if (role === 'admin' || currentUserId === id) {
            const deletedUser = await User.findByIdAndDelete(id, { new: true });
            if (!deletedUser) {
                return responseHelper.badRequest(res, "User not found");
            }
            return responseHelper.success(res, "User deleted successfully", deletedUser);
        } else {
            return responseHelper.forbidden(res, "Permission denied");
        }
    }
}
