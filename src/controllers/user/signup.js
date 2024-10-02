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
            const profilePicture = req.file;
            const hashedPassword = await bcrypt.hash(password, 10);
            const user = await User.create({ username, email, password: hashedPassword, profilePicture });
            res.status(201).json({ message: "User created successfully", user });
        } catch (error) {
            res.status(500).json({ messageeeeeeee: error.message });
        }
    }
}