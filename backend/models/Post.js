import mongoose from "mongoose";

const PostSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },

  description: {
    type: String,
    required: true,
  },

  photos: {
    type: [String],
  },

  timeToRead: {
    type: Number,
  },

  isFeatured: {
    type: Boolean,
    default: false,
  },

  city: {
    type: String,
    required: true,
  },

  address: {
    type: String,
    required: true,
  },

  view: {
    type: Number,
    default: 0,
  },

  like: {
    type: Number,
    default: 0,
  },

  // comments: {
  //   type: [String],
  // },

  comments: {
    id: {
      type: String,
    },
    data: {
      type: String,
    },
    cookie: {
      type: String,
    },
  },
});

export default mongoose.model("Post", PostSchema);
