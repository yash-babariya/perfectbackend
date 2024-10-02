import User from "../../models/userModel.js";

const getUser = async (req, res) => {
    try {
        const role = req.user.role;
        if (role === "user") {
            const user = await User.findById(req.user.id);
            if (!user) {
                return res.status(404).json({ message: "User not found" });
            }
            res.status(200).json({ message: "User fetched successfully", user });
        } else {
            const users = await User.find();
            res.status(200).json({ message: "Users fetched successfully", users });
        }
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
}

export default getUser;