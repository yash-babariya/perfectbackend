import Joi from "joi";
import Product from "../../models/productModel.js";
import responseHelper from "../../utils/responseHelper.js";
import validator from "../../middlewares/validator.js";
import deleteProductService from "../../services/productService/deleteProductService.js";
export default {
    validator: validator({
        params: Joi.object({
            id: Joi.string().required(),
        }),
    }),
    handler: async (req, res) => {
        try {
            await deleteProductService.deleteProduct(productId, req.user.id, req, res);
        } catch (error) {
            console.error('Error deleting product:', error);
            responseHelper.internalServerError(res, "An error occurred while deleting the product");
        }
    }
}