import Product from "../../models/productModel.js";
import responseHelper from "../../utils/responseHelper.js";

export default {
    getProducts: async (req, res) => {
        const { page = 1, limit = 10 } = req.query;
        const skip = (page - 1) * limit;

        const products = await Product.find()
            .skip(skip)
            .limit(Number(limit));

        const total = await Product.countDocuments();

        responseHelper.success(res, "Products fetched successfully", {
            products,
            currentPage: Number(page),
            totalPages: Math.ceil(total / limit),
            totalProducts: total
        });
    }
}
