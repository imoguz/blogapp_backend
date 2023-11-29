"use strict";

const { Schema, model } = require("mongoose");

const blogSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    content: {
      type: String,
      required: true,
      trim: true,
    },

    image: {
      type: String,
      trim: true,
    },

    publish_date: {
      type: Date,
      default: Date.now,
    },

    author: {
      type: String,
      required: true,
      trim: true,
    },

    category: {
      type: String,
    },

    status: {
      type: String,
      enum: ["d", "p"],
    },

    slug: {
      type: String,
    },
  },
  {
    collection: "blogs",
    timestamps: true,
  }
);

module.exports = model("Blog", blogSchema);
