import express from "express";
import { getMosPopularPost, getMostLikedPost } from "../controllers/post.js";

const router = express.Router();

router.get("/mostliked", getMostLikedPost);
router.get("/popular", getMosPopularPost);

export default router;
