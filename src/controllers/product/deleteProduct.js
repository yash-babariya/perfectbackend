import Joi from "joi";
import Product from "../../models/productModel.js";
import responseHelper from "../../utils/responseHelper.js";
import validator from "../../middlewares/validator.js";

export default {
    validator: validator({
        params: Joi.object({
            id: Joi.string().required(),
        }),
    }),
    handler: async (req, res) => {
        try {
            const productId = req.params.id;
            const isAdmin = req.user && req.user.role === 'admin'; // Assuming user role is stored in req.user

            let deletedProduct;

            if (isAdmin) {
                // Admin can delete any product
                deletedProduct = await Product.findByIdAndDelete(productId);
            } else {
                // Regular users can only delete their own products
                deletedProduct = await Product.findOneAndDelete({ _id: productId, user: req.user._id });
            }

            if (!deletedProduct) {
                return responseHelper.notFound(res, "Product not found or you're not authorized to delete it");
            }

            responseHelper.success(res, "Product deleted successfully");
        } catch (error) {
            console.error('Error deleting product:', error);
            responseHelper.internalServerError(res, "An error occurred while deleting the product");
        }
    }
}