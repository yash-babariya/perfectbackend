import { Router } from "express";
import userRoutes from "./userRoutes.js";
const router = Router();


router.get("/", (req, res) => {
    res.send("Hello Developer! this is yash babariya's api");
});

router.use("/user", userRoutes);

export default router;