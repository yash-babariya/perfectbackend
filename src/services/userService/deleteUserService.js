import User from "../../models/userModel.js";

export default {
    deleteUser: async (id, currentUser) => {
        if (currentUser.role === 'admin' || currentUser.id === id) {
            const deletedUser = await User.findByIdAndDelete(id, { new: true });
            if (deletedUser) {
                return { success: true, data: deletedUser };
            } else {
                return { success: false, message: "User not found", statusCode: 404 };
            }
        } else {
            return { success: false, message: "Permission denied", statusCode: 403 };
        }

    }
}