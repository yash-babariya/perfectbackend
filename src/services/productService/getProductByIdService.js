import Product from "../../models/productModel.js";
import responseHelper from "../../utils/responseHelper.js";

export default {
    getProductById: async (req, res) => {
        const { id } = req.params;
        const product = await Product.findById(id);
        responseHelper.success(res, "Product fetched successfully", product);
    }
}
