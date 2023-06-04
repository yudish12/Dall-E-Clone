import express from "express";
import {
  createUsers,
  getAllUsers,
  authUser,
} from "../controllers/userControllers.js";

const router = express.Router();

router.route("/").get(getAllUsers).post(createUsers);
router.route("/auth").post(authUser);

export default router;
