import Post from "../models/Post.js";

//CREATE
export const createPost = async (req, res, next) => {
  const newPost = new Post(req.body);
  const authHeader = req.headers.cookie;

  try {
    const savedPost = await newPost.save();
    res.status(201).send({
      message: "post created successfully",
      data: { savedPost },
      // cookie: authHeader,
    });
  } catch (error) {
    next(error);
  }
};

// UPDATE
export const updatePost = async (req, res, next) => {
  try {
    const updatedPost = await Post.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(201).send({
      message: "post updated successfully",
      data: updatedPost,
    });
  } catch (error) {
    next(error);
  }
};

//   DELETE
export const deletePost = async (req, res, next) => {
  try {
    await Post.findByIdAndDelete(req.params.id);
    res.status(200).send({
      message: "post deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};

//   GET
export const getAPost = async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id);
    res.status(200).send({
      data: post,
    });
  } catch (error) {
    next(error);
  }
};

export const getOwnPost = async (req, res, next) => {
  try {
    // const post = await Post.findById(req.params.id);
    const post = await Post.find({ cookie: req.params.cookie });

    res.status(200).send({
      data: post,
    });
  } catch (error) {
    next(error);
  }
};

//   GET ALL
export const getAllPost = async (req, res, next) => {
  try {
    const posts = await Post.find();
    res.status(200).send({
      data: posts,
    });
  } catch (error) {
    next(error);
  }
};

// view post
export const createCount = async (req, res, next) => {
  const postId = req.params.postid;
  const post = await Post.findById(postId);

  try {
    try {
      await Post.findByIdAndUpdate(postId, {
        view: post.view + 1,
      });
    } catch (error) {
      next(error);
    }
    res.status(201).send({
      message: "viewed",
    });
  } catch (error) {
    next(error);
  }
};

//like post
export const createLike = async (req, res, next) => {
  const postId = req.params.postid;
  const post = await Post.findById(postId);

  try {
    try {
      await Post.findByIdAndUpdate(postId, {
        like: post.like + 1,
      });
    } catch (error) {
      next(error);
    }
    res.status(201).send({
      message: "liked",
    });
  } catch (error) {
    next(error);
  }
};

//unlike post
export const createUnlike = async (req, res, next) => {
  const postId = req.params.postid;
  const post = await Post.findById(postId);

  try {
    try {
      await Post.findByIdAndUpdate(postId, {
        like: post.like - 1,
      });
    } catch (error) {
      next(error);
    }
    res.status(201).send({
      message: "liked",
    });
  } catch (error) {
    next(error);
  }
};

//get popular post
export const getMosPopularPost = async (req, res, next) => {
  try {
    const posts = await Post.find().sort({ view: -1 });
    res.status(200).send({
      data: posts,
    });
  } catch (error) {
    next(error);
    console.log("error", error);
  }
};

//get most liked posts
export const getMostLikedPost = async (req, res, next) => {
  try {
    const posts = await Post.find().sort({ like: -1 });
    res.status(200).send({
      data: posts,
    });
  } catch (error) {
    next(error);
  }
};
