const mongoose = require("mongoose");
const { format } = require("date-fns");

const Schema = mongoose.Schema;

const MessageSchema = new Schema(
  {
    sender: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    // receiver: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: "User",
    //   required: false,
    // },
    chat: [{ type: mongoose.Schema.Types.ObjectId, ref: "Chat" }],
    group: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Group",
      required: false,
    },
    content: { type: String, required: true },
  },
  { timestamps: true, toJSON: { virtuals: true } }
);

MessageSchema.virtual("createdAtFormatted").get(() => {
  return format(this.createdAt, "dd/MM/yyyy HH:mm");
});

module.exports = mongoose.model("Message", MessageSchema);
