import Product from "../../models/productModel.js";
import responseHelper from "../../utils/responseHelper.js";

export default {
    updateProduct: async (req, res) => {
        const productId = req.params.id;
        const updateData = req.body;
        const isAdmin = req.user && req.user.role === 'admin'; // Assuming user role is stored in req.user

        let product;

        if (isAdmin) {
            // Admin can update any product
            product = await Product.findByIdAndUpdate(productId, updateData, { new: true });
        } else {
            // Regular users can only update their own products
            product = await Product.findOneAndUpdate(
                { _id: productId, user: req.user._id },
                updateData,
                { new: true }
            );
        }

        if (!product) {
            return responseHelper.notFound(res, "Product not found or you're not authorized to update it");
        }

        return responseHelper.success(res, "Product updated successfully", product);
    }
}