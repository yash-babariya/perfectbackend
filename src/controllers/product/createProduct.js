import Joi from "joi";
import responseHelper from "../../utils/responseHelper.js";
import validator from "../../middlewares/validator.js";
import createProductService from "../../services/productService/createProductService.js";

export default {
    validator: validator({
        body: Joi.object({
            name: Joi.string().required(),
            price: Joi.number().required(),
            description: Joi.string().required(),
            category: Joi.string().required(),
            stock: Joi.number().required(),
        }),
        params: Joi.object({
            id: Joi.string().optional(),
        }),
        query: Joi.object({
            page: Joi.number().optional(),
            limit: Joi.number().optional(),
        }),
    }),
    handler: async (req, res) => {
        try {
            await createProductService.createProduct(req, res);

        } catch (error) {
            return responseHelper.internalServerError(res, error.message);
        }
    }
};