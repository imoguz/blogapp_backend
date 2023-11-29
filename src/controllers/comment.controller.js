"use strict";

const Comment = require("../models/comment.model");

module.exports = {
  create: async (req, res) => {
    /*
      #swagger.tags = ["Comments"]
      #swagger.summary = "Create Comment"
      #swagger.parameters['body'] = {
        in: 'body',
        required: true,
        schema: {
          "content": "String",
          "post": "Blog ID",
          "user": "User ID",
          }
        }
    */

    const data = await Comment.create(req.body);
    res.status(201).send(data);
  },

  readOne: async (req, res) => {
    /*
      #swagger.tags = ["Comments"]
      #swagger.summary = "Get Single Comment"
    */

    const data = await Comment.findOne({ _id: req.params.id }).populate("user");
    res.status(200).send(data);
  },

  readMany: async (req, res) => {
    /*
      #swagger.tags = ["Comments"]
      #swagger.summary = "List Comments"
      #swagger.description = `
        You can send query with endpoint for search[], sort[], page and limit.
        <ul> Examples:
          <li>URL/?<b>search[field1]=value1&search[field2]=value2</b></li>
          <li>URL/?<b>sort[field1]=1&sort[field2]=-1</b></li>
          <li>URL/?<b>page=2&limit=1</b></li>
        </ul>`
    */

    const data = await req.queryHandler(Comment, "user");
    res.status(200).send(data);
  },

  update: async (req, res) => {
    /*
      #swagger.tags = ["Comments"]
      #swagger.summary = "Update Comment"
      #swagger.parameters['body'] = {
        in: 'body',
        required: true,
        schema: {
          "content": "String",
          "post": "Blog ID",
          "user": "User ID",
          }
        }
    */

    const data = await Comment.findByIdAndUpdate(
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
      #swagger.tags = ["Comments"]
      #swagger.summary = "Delete Comment"
    */

    const data = await Comment.deleteOne({ _id: req.params.id });
    res.status(data.deletedCount ? 204 : 404).send(data);
  },
};
