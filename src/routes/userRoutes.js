import { Router } from "express";
import signup from "../controllers/user/signup.js";
import login from "../controllers/user/login.js";
import authentication from "../middlewares/authentication.js";
import getUser from "../controllers/user/getUser.js";
import updateUser from "../controllers/user/updateUser.js";
import validator from "../middlewares/validator.js";
import upload from "../middlewares/upload.js";
const router = Router();

router.get("/", (req, res) => {
    res.json({
        message: "Hello Developer! this is yash babariya's api",
    });
});

router.post("/signup", upload, validator(signup.validator), signup.handler);
router.post("/login", validator(login.validator), login.handler);
router.get("/get-user", authentication(), getUser);
router.put("/update-user", authentication(), validator(updateUser.validator), updateUser.handler);

export default router;