import Joi from "joi";
import responseHelper from "../../utils/responseHelper.js";
import validator from "../../middlewares/validator.js";
import updateProductService from "../../services/productService/updateProductService.js";


export default {
    validator: validator({
        body: Joi.object({
            name: Joi.string().optional(),
            price: Joi.number().optional(),
            description: Joi.string().optional(),
            category: Joi.string().optional(),
            stock: Joi.number().optional(),
            image: Joi.string().optional(),
        }),
        params: Joi.object({
            id: Joi.string().required(),
        }),
    }),
    handler: async (req, res) => {
        try {
            await updateProductService.updateProduct(req, res);
        } catch (error) {
            console.error('Error updating product:', error);
            return responseHelper.internalServerError(res, "An error occurred while updating the product");
        }
    }
}