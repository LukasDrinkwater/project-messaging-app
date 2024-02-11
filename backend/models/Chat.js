const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ChatSchema = Schema(
  {
    users: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    messages: [{ type: mongoose.Schema.Types.ObjectId, ref: "Message" }],
  },
  { timestamps: true, toJSON: { virtuals: true } }
);

ChatSchema.virtual("lastUpdate").get(function () {
  return this.updatedAt.toLocalDateString;
});

ChatSchema.virtual("lastMessage").get(function () {
  // if there are messages sort them and send back the latest message
  if (this.messages.length > 0) {
    const sortedMessages = this.messages.sort(
      (a, b) => b.createdAt - a.createdAt
    );
    return sortedMessages[0];
  } else {
    return null;
  }
});

module.exports = mongoose.model("Chat,", ChatSchema);
