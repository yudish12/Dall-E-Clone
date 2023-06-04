import { catchAsync } from "../utils/catchAsync.js";
import Post from "../models/postsModel.js";
import User from "../models/userModel.js";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const getAllposts = catchAsync(async (req, res, next) => {
  const posts = await Post.find();
  res.status(200).json({
    status: "success",
    posts,
  });
});

export const createPost = catchAsync(async (req, res, next) => {
  const { prompt, photo, user } = req.body;

  const photoUrl = await cloudinary.uploader.upload(photo);

  const newPost = await Post.create({
    prompt,
    photo: photoUrl.url,
    createdBy: user,
  });

  res.status(200).json({ success: true, data: newPost });
});

export const getUserPosts = catchAsync(async (req, res, next) => {
  const { username } = req.params;
  const posts = await Post.find({ createdBy: username });
  res.status(200).json({
    status: "success",
    posts,
  });
});
