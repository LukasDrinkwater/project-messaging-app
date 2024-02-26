const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const GroupSchema = new Schema(
  {
    name: { type: String, required: true },
    users: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    // messages: [{ type: mongoose.Schema.Types.ObjectId, red: "Message" }],
    lastMessage: { type: String, required: false },
  },
  { timestamps: true, toJSON: { virtuals: true } }
);

GroupSchema.virtual("lastMessageFormatted").get(function () {
  return this.lastMessage;
});

module.exports = mongoose.model("Group", GroupSchema);
