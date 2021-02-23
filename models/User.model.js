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
        "https://res.cloudinary.com/dtpkbfvr5/image/upload/v1614046732/avatar_j8q2jr.png",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = model("User", userSchema);
