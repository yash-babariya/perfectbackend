import Product from "../../models/productModel.js";
import responseHelper from "../../utils/responseHelper.js";

export default {
    deleteProduct: async (req, res) => {
        const { id } = req.params;
        const { role, id: currentUserId } = req.user;
        if (role === 'admin' || currentUserId === id) {
            const deletedUser = await User.findByIdAndDelete(id, { new: true });
            if (!deletedUser) {
                return responseHelper.badRequest(res, "User not found");
            }
            return responseHelper.success(res, "User deleted successfully", deletedUser);
        }

        const deletedProduct = await Product.findByIdAndDelete(query, { new: true });

        if (!deletedProduct) {
            return responseHelper.notFound(res, "Product not found or you're not authorized to delete it");
        }

        return responseHelper.success(res, "Product deleted successfully", { deletedProduct });
    }
}
