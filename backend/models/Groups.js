const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const GroupSchema = new Schema(
  {
    name: { type: String, required: true },
    users: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    messages: [{ type: mongoose.Schema.Types.ObjectId, red: "Message" }],
  },
  { timestamps: true, toJSON: { virtuals: true } }
);

module.exports = mongoose.model("Group", GroupSchema);
