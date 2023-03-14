import express from "express";

import {
  createComment,
  deleteComment,
  getAllComment,
  getAComment,
  updateComment,
} from "../controllers/comment.js";
import { verifyUser } from "../utils/verifyToken.js";

const router = express.Router();

// router.post("/:postid", verifyUser, createComment);
// router.put("/:id", verifyUser, updateComment);
// router.delete("/:id", verifyUser, deleteComment);
// router.get("/:id", getAComment);
// router.get("/", getAllComment);

router.post("/:postid", createComment);
router.put("/:id", updateComment);
router.delete("/:id", deleteComment);
router.get("/:id", getAComment);
router.get("/", getAllComment);

export default router;
