import express from "express";
import {
  createUsers,
  getAllUsers,
  authUser,
  editPosts,
} from "../controllers/userControllers.js";

const router = express.Router();

router.route("/").get(getAllUsers).post(createUsers);
router.route("/auth").post(authUser);
router.route("/:username").patch(editPosts);

export default router;
