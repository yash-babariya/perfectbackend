import { Router } from "express";
import { signup, login, getUser, updateUser, changePassword } from "../controllers/user/index.js";
import { auth } from "../middlewares/index.js";

const router = Router();

router.get("/", (req, res) => {
    res.json({ message: "Hello Developer! this is yash babariya's api" });
});

router.post("/signup", signup.validator, signup.handler);
router.post("/login", login.validator, login.handler);
router.get("/get-user", auth(), getUser.handler);
router.put("/update-user", auth(), updateUser.validator, updateUser.handler);
router.put("/change-password", auth(), changePassword.validator, changePassword.handler);

export default router;