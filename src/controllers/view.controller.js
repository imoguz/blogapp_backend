"use strict";

const View = require("../models/view.model");

module.exports = {
  create: async (req, res) => {
    /*
      #swagger.tags = ["Views"]
      #swagger.summary = "Create View"
      #swagger.parameters['body'] = {
        in: 'body',
        required: true,
        schema: {
          "user": "User ID",
          "post_id": "Blog ID",
          }
        }
    */

    const isView = await View.findOne(req.body);
    if (isView) {
      return res
        .status(200)
        .send("This blog has been viewed from the same user");
    }

    const data = await View.create(req.body);
    res.status(201).send(data);
  },

  readOne: async (req, res) => {
    /*
      #swagger.tags = ["Views"]
      #swagger.summary = "Get Single View"
    */

    const data = await View.findOne({ _id: req.params.id });
    res.status(200).send(data);
  },

  readMany: async (req, res) => {
    /*
      #swagger.tags = ["Views"]
      #swagger.summary = "List Views"
      #swagger.description = `
        You can send query with endpoint for search[], sort[], page and limit.
        <ul> Examples:
          <li>URL/?<b>search[field1]=value1&search[field2]=value2</b></li>
          <li>URL/?<b>sort[field1]=1&sort[field2]=-1</b></li>
          <li>URL/?<b>page=2&limit=1</b></li>
        </ul>`
    */

    const data = await req.queryHandler(View);
    res.status(200).send(data);
  },

  update: async (req, res) => {
    /*
      #swagger.tags = ["Views"]
      #swagger.summary = "Update View"
      #swagger.parameters['body'] = {
        in: 'body',
        required: true,
        schema: {
          "user": "User ID",
          "post_id": "Blog ID",
          }
        }
    */

    const data = await View.findByIdAndUpdate(
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
      #swagger.tags = ["Views"]
      #swagger.summary = "Delete View"
    */

    const data = await View.deleteOne({ _id: req.params.id });
    res.status(data.deletedCount ? 204 : 404).send(data);
  },
};
