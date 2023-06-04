import express from "express";
import "dotenv/config";
import cors from "cors";
import morgan from "morgan";
import { connectDb } from "./utils/db.js";
import { globalErrorHandler } from "./utils/globalErrorHandler.js";
import userRoutes from "./routes/userRoutes.js";
import path from "path";
import postRoutes from "./routes/postRoutes.js";
import { dirname } from "path";
import { fileURLToPath } from "url";
import dalleRoutes from "./routes/dalleRoutes.js";

connectDb();

const app = express();

app.enable("trust proxy");

app.use(cors());

app.options("*", cors());

const __dirname = dirname(fileURLToPath(import.meta.url));

app.use(express.static(path.join(__dirname, "public")));

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: false }));

app.use(morgan("dev"));

app.use((req, res, next) => {
  req.reqTime = new Date().toISOString();
  next();
});

app.get("/", (req, res) => {
  res.send("hello from server");
});

app.use("/api/users", userRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/dalle", dalleRoutes);

app.use(globalErrorHandler);

const port = process.env.PORT || 5000;

const server = app.listen(port, () => {
  console.log("server started");
});

process.on("unhandledRejection", (err) => {
  console.log(err.name, err.message);
  console.log("UNHANDLED REJECTION! ");
  server.close(() => {
    process.exit(1);
  });
});
