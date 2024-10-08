import Joi from "joi";
import Product from "../../models/productModel.js";
import responseHelper from "../../utils/responseHelper.js";
import validator from "../../middlewares/validator.js";
import getProductByIdService from "../../services/productService/getProductByIdService.js";

export default {
    validator: validator({
        params: Joi.object({
            id: Joi.string().required(),
        }),
    }),
    handler: async (req, res) => {
        try {
            await getProductByIdService.getProductById(req, res);
        } catch (error) {
            responseHelper.internalServerError(res, error.message);
        }
    }
}