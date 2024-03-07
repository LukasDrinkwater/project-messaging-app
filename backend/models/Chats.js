const mongoose = require("mongoose");
const { format } = require("date-fns");

const Schema = mongoose.Schema;

const ChatSchema = Schema(
  {
    users: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    // messages: [{ type: mongoose.Schema.Types.ObjectId, ref: "Message" }],
    lastMessage: { type: String, required: false },
  },

  { timestamps: true, toJSON: { virtuals: true } }
);

ChatSchema.virtual("lastMessageFormatted").get(function () {
  if (this.lastMessage.length > 30) {
    return this.lastMessage.substring(0, 30) + "...";
  }
  return this.lastMessage;
});

ChatSchema.virtual("updatedAtFormatted").get(function () {
  return format(this.updatedAt, "dd/MM/yyyy HH:mm");
});

module.exports = mongoose.model("Chat", ChatSchema);
