const { Schema, model } = require("mongoose");

const userSchema = new Schema(
  {
    username: {
      type: String,
      trim: true,
      required: [true, "Username is required."],
      unique: true,
    },
    email: {
      type: String,
      required: [true, "Email is required."],
      match: [/^\S+@\S+\.\S+$/, "Please use a valid email address."],
      unique: true,
      lowercase: true,
      trim: true,
    },
    passwordHash: {
      type: String,
      required: [true, "Password is required."],
    },
    image: {
      type: String,
      default:
        "https://lh3.googleusercontent.com/proxy/mY819mIdue_DtALuZUkmehqO49bAzg-Cfboqd-MWPBsxnhAtbsmZdhLbNtyiYfeWWjJp7M0Cj1HFZkZ6yOcpljrWKRWQ3t_rNJVLlVOWcHTNoNsH3Qb4TQ",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = model("User", userSchema);
