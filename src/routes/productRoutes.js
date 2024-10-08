import { Router } from "express";
import auth from "../middlewares/authentication.js";
import upload from "../middlewares/upload.js";
import { createProduct, getProducts, getProductById, updateProduct, deleteProduct } from "../controllers/product/index.js";

const router = Router();



router.post("/", auth(), upload.single("image"), createProduct.validator, createProduct.handler);
router.get("/", auth(), getProducts.validator, getProducts.handler);
router.get("/:id", auth(), getProductById.validator, getProductById.handler);
router.put("/:id", auth(), upload.single("image"), updateProduct.validator, updateProduct.handler);
router.delete("/:id", auth(), deleteProduct.validator, deleteProduct.handler);

export default router;