const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ChatSchema = Schema(
  {
    users: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    // messages: [{ type: mongoose.Schema.Types.ObjectId, ref: "Message" }],
    lastMessage: { type: String, required: false },
  },

  { timestamps: true, toJSON: { virtuals: true } }
);

ChatSchema.virtual("lastUpdate").get(function () {
  return this.updatedAt.toLocalDateString;
});

ChatSchema.virtual("lastMessageFormatted").get(function () {
  if (this.lastMessage.length > 30) {
    return this.lastMessage.slice(0, 30) + "...";
  }
  return this.lastMessage;
});

// ChatSchema.virtual("lastMessage").get(async function () {
//   // Populate the 'messages' field before sorting
//   await this.populate("messages");
//   // console.log("Populated messages:", this.messages);

//   // If there are messages, sort them and send back the latest message
//   if (this.messages.length > 0) {
//     const sortedMessages = this.messages.sort(
//       (a, b) => b.createdAt - a.createdAt
//     );
//     return sortedMessages[0];
//   } else {
//     return null;
//   }
// });

module.exports = mongoose.model("Chat", ChatSchema);
