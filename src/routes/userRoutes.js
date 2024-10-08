import { Router } from "express";
import { signup, login, getUser, updateUser, changePassword, deleteUser } from "../controllers/user/index.js";
import { auth } from "../middlewares/index.js";

const router = Router();

router.get("/", auth(), getUser.validator, getUser.handler);
router.post("/signup", signup.validator, signup.handler);
router.post("/login", login.validator, login.handler);
router.delete("/:id", auth(), deleteUser.validator, deleteUser.handler);
router.put("/update-user", auth(), updateUser.validator, updateUser.handler);
router.put("/change-password", auth(), changePassword.validator, changePassword.handler);

export default router;