import express from "express";

import { generateImage } from "../controllers/dalleControllers.js";

const router = express.Router();

router.route("/").post(generateImage);

export default router;
