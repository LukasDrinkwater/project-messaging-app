const mongoose = require("mongoose");
const { format } = require("date-fns");

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
  if (this.lastMessage.length > 30) {
    return this.lastMessage.subString(0, 30) + "...";
  }
  return this.lastMessage;
});

GroupSchema.virtual("updatedAtFormatted").get(function () {
  return format(this.updatedAt, "dd/MM/yyyy HH:mm");
});

module.exports = mongoose.model("Group", GroupSchema);
