const { Schema, model } = require("mongoose");

const refreshTokenSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: "User" },
    token: String,
    expires: Date,
    created: { type: Date, default: Date.now },
    revoked: Date,
    replacedByToken: String,
  },
);

refreshTokenSchema.virtual("isExpired").get(function () {
  return Date.now() >= this.expires;
});

refreshTokenSchema.virtual("isActive").get(function () {
  console.log("revoked-condition", this.revoked);
  return !this.revoked && !this.isExpired;
});

refreshTokenSchema.set("toJSON", {
  virtuals: true,
  versionKey: false,
  transform: (_doc, ret) => {
    delete ret._id;
    delete ret.id;
    delete ret.user;
  },
});

module.exports = model("RefreshToken", refreshTokenSchema);
