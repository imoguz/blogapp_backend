"use strict";

const { Schema, model } = require("mongoose");

const viewSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },

    post_id: {
      type: Schema.Types.ObjectId,
      ref: "Blog",
    },
  },
  {
    collection: "views",
    timestamps: true,
  }
);

module.exports = model("View", viewSchema);
