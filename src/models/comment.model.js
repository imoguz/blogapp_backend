"use strict";

const { Schema, model } = require("mongoose");

const commentSchema = new Schema(
  {
    content: {
      type: String,
      required: true,
      trim: true,
    },

    post: {
      type: Schema.Types.ObjectId,
      ref: "Blog",
    },

    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    collection: "comments",
    timestamps: true,
  }
);

module.exports = model("Comment", commentSchema);
