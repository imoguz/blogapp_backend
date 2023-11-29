"use strict";

const { Schema, model } = require("mongoose");

const categorySchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
  },
  {
    collection: "categories",
    timestamps: true,
  }
);

module.exports = model("Category", categorySchema);
