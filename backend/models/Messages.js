const mongoose = require("mongoose");
const { format } = require("date-fns");

const Schema = mongoose.Schema;

const MessageSchema = new Schema(
  {
    sender: { type: mongoose.Schema.Types.ObjectId, ref: "User" },

    chat: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Chat",
      required: false,
    },
    group: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Group",
      required: false,
    },
    content: { type: String },
    file: { type: String },
  },
  { timestamps: true, toJSON: { virtuals: true } }
);

MessageSchema.virtual("createdAtFormatted").get(function () {
  return format(this.updatedAt, "dd/MM/yyyy HH:mm");
});

module.exports = mongoose.model("Message", MessageSchema);
