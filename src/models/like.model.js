"use strict";

const { Schema, model } = require("mongoose");
const Blog = require("../models/blog.model");

const likeSchema = new Schema(
  {
    user_id: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },

    post_id: {
      type: Schema.Types.ObjectId,
      ref: "Blog",
    },
  },
  {
    collection: "likes",
    timestamps: true,
  }
);

module.exports = model("Like", likeSchema);
