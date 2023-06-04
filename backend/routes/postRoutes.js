import express from "express";
import {
  getUserPosts,
  getAllposts,
  createPost,
} from "../controllers/postControllers.js";
import { v2 as cloudinary } from "cloudinary";

const router = express.Router();

router.route("/").get(getAllposts).post(createPost);

router.route("/:username").get(getUserPosts);

export default router;
