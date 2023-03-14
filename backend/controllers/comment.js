import Post from "../models/Post.js";
import Comment from "../models/Comment.js";

import { createError } from "../utils/error.js";

//CREATE
export const createComment = async (req, res, next) => {
  const postId = req.params.postid;

  const newComment = new Comment(req.body);

  try {
    const savedComment = await newComment.save();
    try {
      await Post.findByIdAndUpdate(postId, {
        $push: {
          comments: { id: savedComment._id, data: savedComment.comment },
        },
      });
    } catch (error) {
      next(error);
    }
    res.status(201).send({
      message: "Comment has been added to Post successfully",
      data: savedComment,
    });
  } catch (error) {
    next(error);
  }
};

// export const createCount = async (req, res, next) => {
//   const postId = req.params.postid;
//   const post = await Post.findById(postId);

//   try {
//     try {
//       await Post.findByIdAndUpdate(postId, {
//         view: post.view + 1,
//       });
//     } catch (error) {
//       next(error);
//     }
//     res.status(201).send({
//       message: "viewed",
//     });
//   } catch (error) {
//     next(error);
//   }
// };

// UPDATE
export const updateComment = async (req, res, next) => {
  try {
    const updatedComment = await Comment.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(201).send({
      message: "Comment updated successfully",
      data: updatedComment,
    });
  } catch (error) {
    next(error);
  }
};

//   DELETE
export const deleteComment = async (req, res, next) => {
  try {
    await Comment.findByIdAndDelete(req.params.id);
    res.status(200).send({
      message: "Comment deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};

//   GET
export const getAComment = async (req, res, next) => {
  try {
    const comment = await Comment.findById(req.params.id);
    res.status(200).send({
      data: comment,
    });
  } catch (error) {
    next(error);
  }
};

//   GET ALL
export const getAllComment = async (req, res, next) => {
  try {
    const Comments = await Comment.find();
    res.status(200).send({
      data: Comments,
    });
  } catch (error) {
    next(error);
  }
};
