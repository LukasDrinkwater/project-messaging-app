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

// ChatSchema.virtual("lastUpdate").get(function () {
//   return this.updatedAt.toLocalDateString;
// });

// Need to check this, it causes an issue which stops the usersChats from being sent in
// the contract controller.
// ChatSchema.virtual("lastMessageFormatted").get(function () {
//   if (this.lastMessage.length > 30) {
//     return this.lastMessage.slice(0, 30) + "...";
//   }
//   return this.lastMessage;
// });

module.exports = mongoose.model("Chat", ChatSchema);
