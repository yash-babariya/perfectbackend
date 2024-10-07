import Joi from "joi";
import Product from "../../models/productModel.js";
import responseHelper from "../../utils/responseHelper.js";
import validator from "../../middlewares/validator.js";
export default {
    validator: validator({
        query: Joi.object({
            page: Joi.number().optional(),
            limit: Joi.number().optional(),
        }),
    }),
    handler: async (req, res) => {
        try {
            const products = await Product.find();
            responseHelper.success(res, "Products fetched successfully", products);
        } catch (error) {
            responseHelper.internalServerError(res, error.message);
        }
    }
}