import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import cors from "cors";

import authRoute from "./routes/auth.js";
import usersRoute from "./routes/users.js";
import postsRoute from "./routes/posts.js";
import commentsRoute from "./routes/comments.js";
import otherRoute from "./routes/other.js";

const app = express();
dotenv.config();

const corsOptions = {
  origin: "http://localhost:3000",
};
app.use(cors(corsOptions));

try {
  await mongoose.connect(process.env.MONGO);
  console.log("connected to mongodb");
} catch (error) {
  throw error;
}

app.get("/", (req, res) => {
  res.send("hehe");
});

// MIDDLEWARES

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});
app.use(cookieParser());
app.use(express.json());

app.use("/api/auth", authRoute);
app.use("/api/users", usersRoute);
app.use("/api/posts", postsRoute);
app.use("/api/comments", commentsRoute);
app.use("/api", otherRoute);

app.use((err, req, res, next) => {
  const errorStatus = err.status || 500;
  const errorMesage = err.message || "Something went wrong";

  return res.status(errorStatus).send({
    success: false,
    status: errorMesage,
    message: errorMesage,
    stack: err.stack,
  });
});

app.listen(8000, () => {
  console.log("connected to backend");
});
