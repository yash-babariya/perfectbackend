import dotenv from "dotenv/config";

export const PORT = process.env.PORT || 5353;
export const MONGO_URI = process.env.MONGO_URI || "mongodb+srv://yashbabariya:Yash%405353@yash.fevlh.mongodb.net/updateuser";
export const JWT_SECRET = process.env.JWT_SECRET || "1234567890yash";