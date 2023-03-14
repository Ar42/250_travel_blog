import express from "express";

import {
  createPost,
  deletePost,
  getAPost,
  getAllPost,
  updatePost,
  getOwnPost,
  createCount,
  createLike,
  createUnlike,
} from "../controllers/post.js";

import { verifyAdmin, verifyUser } from "../utils/verifyToken.js";

const router = express.Router();

// router.post("/", verifyAdmin, createPost);
// router.put("/:id", verifyUser, updatePost);
router.put("/:id", updatePost);

router.post("/", createPost);
router.put("/count/:postid", createCount);
router.put("/like/:postid", createLike);
router.put("/unlike/:postid", createUnlike);
router.delete("/:id", deletePost);
router.get("/:id", getAPost);
router.get("/", getAllPost);

router.get("/:cookie", getOwnPost);

export default router;
