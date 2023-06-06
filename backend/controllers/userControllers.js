import User from "../models/userModel.js";
import { catchAsync } from "../utils/catchAsync.js";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const getAllUsers = catchAsync(async (req, res) => {
  const users = await User.find();
  res.status(200).json({
    message: "success",
    users,
  });
});

export const createUsers = catchAsync(async (req, res, next) => {
  const user = new User(req.body);
  await user.save();
  res.status(200).json({
    message: "success",
    user,
  });
});

export const authUser = catchAsync(async (req, res, next) => {
  const { username, email, picture } = req.body;

  if (!picture) {
    const photoUrl = await cloudinary.uploader.upload(pic);
  }

  const isPresent = await User.findOne({ username: username });

  if (isPresent) {
    return res.status(200).json({
      status: "success",
      isPresent,
    });
  } else {
    const user = await User.create({
      username: username,
      email: email,
      picture,
    });
    return res.status(200).json({
      status: "success",
      user,
    });
  }
});
export const editPosts = catchAsync(async (req, res, next) => {
  const { username } = req.params;
  const { newUsername, picture } = req.body;
  if (picture) {
    const user = await User.findOneAndUpdate(
      { username: username },
      { username: newUsername, picture: picture },
      { new: true }
    );
    return res.status(200).json({
      status: "success",
      user,
    });
  }
  const user = await User.findOneAndUpdate(
    { username: username },
    { username: newUsername },
    { new: true }
  );
  return res.status(200).json({
    status: "success",
    user,
  });
});
