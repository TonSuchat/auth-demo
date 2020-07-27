const { Schema, model } = require("mongoose");

const userSchema = new Schema(
  {
    email: { type: String, required: true, unique: true, trim: true },
    password: { type: String, required: true },
    firstName: { type: String },
    lastName: { type: String },
    role: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const User = model("User", userSchema);

module.exports = User;
