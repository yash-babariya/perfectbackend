import User from "../../models/userModel.js";
import joi from "joi";

export default {
    validator: {
        body: joi.object({
            username: joi.string().required(),
        }),
    },
    handler: async (req, res) => {
        try {
          const { username } = req.body;
      const existingUser = await User.findOne({ username });
      if (existingUser && existingUser._id.toString() !== req.user.id) {
        return res.status(400).json({ message: "Username already exists" });
      }
      const user = await User.findByIdAndUpdate(req.user.id, req.body, {
        new: true,
      });
      res.status(200).json({ message: "User updated successfully", user });
        } catch (error) {
            res.status(500).json({ message: "Internal server error" });
        }
    }
}
