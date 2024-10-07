import { Router } from "express";
import userRoutes from "./userRoutes.js";
import productRoutes from "./productRoutes.js";
const router = Router();


router.get("/", (req, res) => {
    res.json({
        message: "Hello Developer! this is yash babariya's api",
    });
});

router.use("/user", userRoutes);
router.use("/product", productRoutes);

export default router;