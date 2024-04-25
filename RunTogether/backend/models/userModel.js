import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    image: { type: String },
    posts: { type: Array, default: [] }
}, { timestamps: true });


export default mongoose.model("userSchema", userSchema);
