const mongoose = require("mongoose");

const replySchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      unique: false,
    },
    commentId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      unique: false,
    },
    image: {
      type: String,
      required: false,
    },
    text: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: {
      createdAt: true,
      updatedAt: true,
    },
  }
);

module.exports = mongoose.model("Reply", replySchema);
