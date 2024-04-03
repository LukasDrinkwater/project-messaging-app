const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const Schema = mongoose.Schema;

const ImageSchema = Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: false,
    },
    imageId: { type: String, required: true },
  },
  { timestamps: true, toJSON: { virtuals: true } }
);

module.exports = mongoose.model("Image", ImageSchema);
