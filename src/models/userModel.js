import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    profilePicture: {
        type: String,
        default: null,
    },
    username: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    uniqueId: {
        type: String,
        default: null,
    },
    role: {
        type: String,
        enum: ["user", "seller", "admin"],
        default: "user",
    },
}, { timestamps: true });

const User = mongoose.model("User", userSchema);

export default User;
