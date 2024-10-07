import Joi from "joi";
import Product from "../../models/productModel.js";
import responseHelper from "../../utils/responseHelper.js";
import validator from "../../middlewares/validator.js";

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
            const { name, price, description, category, stock } = req.body;

            // Check if product with same name exists for the current user
            const existingProductByName = await Product.findOne({ name, });
            if (existingProductByName) {
                return responseHelper.badRequest(res, "You have already created a product with this name");
            }

            const image = req.file?.filename;
            const product = await Product.create({
                name,
                price,
                description,
                category,
                stock,
                image,
                createdBy: req.user.id,
            });

            return responseHelper.success(res, "Product created successfully", product);
        } catch (error) {
            return responseHelper.internalServerError(res, error.message);
        }
    }
};