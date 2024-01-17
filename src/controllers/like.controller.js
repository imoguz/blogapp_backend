"use strict";

const Like = require("../models/like.model");

module.exports = {
  create: async (req, res) => {
    /*
      #swagger.tags = ["Likes"]
      #swagger.summary = "Create Like"
      #swagger.parameters['body'] = {
        in: 'body',
        required: true,
        schema: {
          "user_id": "User ID",
          "post_id": "Blog ID",
          }
        }
    */

    const isLike = await Like.findOne(req.body);
    const data = isLike
      ? await Like.deleteOne(req.body)
      : await Like.create(req.body);
    res.status(201).send(data);
  },

  readOne: async (req, res) => {
    /*
      #swagger.tags = ["Likes"]
      #swagger.summary = "Get Single Like"
    */

    const data = await Like.findOne({ _id: req.params.id }).populate([
      "user_id",
      "post_id",
    ]);
    res.status(200).send(data);
  },

  readMany: async (req, res) => {
    /*
      #swagger.tags = ["Likes"]
      #swagger.summary = "List Likes"
      #swagger.description = `
        You can send query with endpoint for search[], sort[], page and limit.
        <ul> Examples:
          <li>URL/?<b>search[field1]=value1&search[field2]=value2</b></li>
          <li>URL/?<b>sort[field1]=1&sort[field2]=-1</b></li>
          <li>URL/?<b>page=2&limit=1</b></li>
        </ul>`
    */

    const data = await req.queryHandler(Like, ["user_id", "post_id"]);
    res.status(200).send(data);
  },

  update: async (req, res) => {
    /*
      #swagger.tags = ["Likes"]
      #swagger.summary = "Update Like"
      #swagger.parameters['body'] = {
        in: 'body',
        required: true,
        schema: {
          "user_id": "User ID",
          "post_id": "Blog ID",
          }
        }
    */

    const data = await Like.findByIdAndUpdate(
      { _id: req.params.id },
      req.body,
      {
        runValidators: true,
        new: true,
      }
    );
    res.status(202).send(data);
  },

  _delete: async (req, res) => {
    /*
      #swagger.tags = ["Likes"]
      #swagger.summary = "Delete Like"
    */

    const data = await Like.deleteOne({ _id: req.params.id });
    res.status(data.deletedCount ? 204 : 404).send(data);
  },
};
