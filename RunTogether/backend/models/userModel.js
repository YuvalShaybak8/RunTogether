const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    image: { type: String },
    posts: { type: Array, default: [] },
    likedPosts: [{ type: mongoose.Schema.Types.ObjectId, ref: "Post" }],
    comments: [
      {
        post: { type: mongoose.Schema.Types.ObjectId, ref: "Post" },
        text: { type: String, required: true },
        createdAt: { type: Date, default: Date.now },
        updatedAt: { type: Date, default: Date.now },
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
