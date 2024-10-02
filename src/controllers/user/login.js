import Joi from "joi";
import User from "../../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export default {
    validator: {
        body: Joi.object({
            username: Joi.string(),
            email: Joi.string().email(),
            password: Joi.string().required(),
        }).xor('username', 'email'),
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
            const user = await User.findOne({ $or: [{ username }, { email }] });
            if (!user) {
                return res.status(400).json({ message: "User not found" });
            }
            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                return res.status(400).json({ message: "Invalid password" });
            }
            const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET);
            res.status(200).json({ message: "Login successful", token });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

}
