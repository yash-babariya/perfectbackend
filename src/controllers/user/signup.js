import User from "../../models/userModel.js";
import bcrypt from "bcrypt";
import Joi from "joi";

export default {
    validator: {
        body: Joi.object({
            username: Joi.string().required(),
            email: Joi.string().email().required(),
            password: Joi.string().required(),
        }),
        params: Joi.object({
            uniqueId: Joi.string().optional(),
        }),
        query: Joi.object({
            uniqueId: Joi.string().optional(),
        }),
    },
    handler: async (req, res) => {
        try {
            const { username, email, password } = req.body;
            console.log(req.file);
            const profilePicture = req.file?.filename;
            const hashedPassword = await bcrypt.hash(password, 10);
            const user = await User.create({ username, email, password: hashedPassword, profilePicture });
            return res.status(201).json({ message: "User created successfully", user });
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }
}