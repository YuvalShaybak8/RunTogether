import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
    image: { type: String, required: true },
    description: { type: String, required: true },
    location: { type: String },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
}, { timestamps: true });


export default mongoose.model("postSchema", postSchema);
