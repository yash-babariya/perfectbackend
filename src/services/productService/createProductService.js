import Product from "../../models/productModel.js";
import responseHelper from "../../utils/responseHelper.js";

export default {
    createProduct: async (req, res) => {
        const { name, price, description, category, stock } = req.body;
        const { id } = req.user;

        // Check if product with same name exists for the current user
        const existingProductByName = await Product.findOne({ name, createdBy: id });
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
            createdBy: id,
        });

        return responseHelper.success(res, "Product created successfully", { product });
    }
}
