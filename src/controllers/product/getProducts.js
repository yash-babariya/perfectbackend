import Joi from "joi";
import Product from "../../models/productModel.js";
import responseHelper from "../../utils/responseHelper.js";
import validator from "../../middlewares/validator.js";
import getProductsService from "../../services/productService/getProductsService.js";

export default {
    validator: validator({
        query: Joi.object({
            page: Joi.number().optional(),
            limit: Joi.number().optional(),
        }),
    }),
    handler: async (req, res) => {
        try {
            await getProductsService.getProducts(req, res);
        } catch (error) {
            responseHelper.internalServerError(res, error.message);
        }
    }
}