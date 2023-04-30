const mongoose = require("mongoose");
const Comment = require("./comment");
const postSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    caption: {
      type: String,
      required: false,
    },
    image: {
      type: [String],
      required: false,
    },
    video: {
      type: [String],
      required: false,
    },
    location: {
      type: String,
      required: false,
    },
    tagPeople: {
      type: [Object],
      required: false,
    },
    audio: {
      type: String,
      required: false,
    },
  },
  { timestamps: { createdAt: true, updatedAt: true } }
);

module.exports = mongoose.model("Post", postSchema);
