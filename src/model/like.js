let mongoose = require("mongoose");

let likeSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      unique: false,
    },
    postId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      unique: false,
    },
  },
  { timestamps: { createdAt: true, updatedAt: true } },
  { versionKey: false }
);
module.exports = mongoose.model("Likes", likeSchema);
