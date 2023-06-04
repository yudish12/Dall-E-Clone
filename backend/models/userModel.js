import mongoose from "mongoose";

const user_schema = new mongoose.Schema(
  {
    email: {
      type: String,
      unique: [true, "user with same email already exists"],
    },
    username: {
      type: String,
      required: [true, "User name is required"],
    },
    picture: {
      type: String,
      default: "default-user.jpg",
    },
    posts: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post",
    },
    role: {
      type: String,
      enum: ["admin", "user"],
      default: "user",
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", user_schema);

export default User;
