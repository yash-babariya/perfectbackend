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
            const product = await Product.findById(req.params.id);
            responseHelper.success(res, "Product fetched successfully", product);
        } catch (error) {
            responseHelper.internalServerError(res, error.message);
        }
    }
}