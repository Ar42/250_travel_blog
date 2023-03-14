import express from "express";
import {
  deleteUser,
  getAllUser,
  getAUser,
  updateUser,
} from "../controllers/user.js";
import { verifyAdmin, verifyToken, verifyUser } from "../utils/verifyToken.js";

const router = express.Router();

router.get("/checkauthentication", verifyToken, (req, res, next) => {
  res.send({ message: "Hello user! You are logged in." });
});

router.get("/checkuser/:id", verifyUser, (req, res, next) => {
  res.send({
    message: `Hello user! You are logged in and now you can delete your account`,
  });
});

router.get("/checkadmin/:id", verifyAdmin, (req, res, next) => {
  res.send({
    message: "Hello Admin! You can delete accounts",
  });
});

router.put("/:id", verifyUser, updateUser);
router.delete("/:id", verifyUser, deleteUser);
router.get("/:id", verifyUser, getAUser);
router.get("/", verifyAdmin, getAllUser);

export default router;
