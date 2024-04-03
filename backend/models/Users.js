const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const Schema = mongoose.Schema;

const UserSchema = Schema(
  {
    username: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    // messages: [{ type: mongoose.Schema.Types.ObjectId, ref: "Message" }],
    // chats: [{ type: mongoose.Schema.Types.ObjectId, ref: "Chat" }],
    contacts: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    // groups: [{ type: mongoose.Schema.Types.ObjectId, ref: "Group" }],
    profilePic: { type: String, ref: "Image" },
  },
  { timestamps: true, toJSON: { virtuals: true } }
);

UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    return next();
  } catch (error) {
    return next(error);
  }
});

module.exports = mongoose.model("User", UserSchema);
