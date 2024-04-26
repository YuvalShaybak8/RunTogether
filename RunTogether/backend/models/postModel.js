const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
    image: { type: String, required: true },
    description: { type: String, required: true },
    location: { type: String },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
}, { timestamps: true });

module.exports = mongoose.model("Post", postSchema);
