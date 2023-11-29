"use strict";

const gUser = require("../models/gUser.model");

module.exports = {
  create: async (req, res) => {
    /*
      #swagger.tags = ["gUsers"]
      #swagger.summary = "Create Google User"
      #swagger.parameters['body'] = {
        in: 'body',
        required: true,
        schema: {
          "firstname": "String",
          "lastname": "String",
          "email": "String",
          "uid": "String",
          "image": "string",
          }
        }
    */

    req.user?.isAdmin === false && (req.body.isAdmin = false);
    const data = await gUser.create(req.body);
    res.status(201).send(data);
  },

  readOne: async (req, res) => {
    /*
      #swagger.tags = ["gUsers"]
      #swagger.summary = "Get Single Google User"
    */

    if (req.params.id != req.user?._id && !req.user?.isAdmin) {
      res.errorStatusCode = 401;
      throw new Error(
        "You do not have permission to view other users' information"
      );
    }
    const data = await gUser.findOne({ _id: req.params.id });
    res.status(200).send(data);
  },

  readMany: async (req, res) => {
    /*
      #swagger.tags = ["gUsers"]
      #swagger.summary = "List Google Users"
      #swagger.description = `
        You can send query with endpoint for search[], sort[], page and limit.
        <ul> Examples:
          <li>URL/?<b>search[field1]=value1&search[field2]=value2</b></li>
          <li>URL/?<b>sort[field1]=1&sort[field2]=-1</b></li>
          <li>URL/?<b>page=2&limit=1</b></li>
        </ul>`
    */

    const filter =
      req.user?.isAdmin || req.user?.isStaff ? {} : { _id: req.user?._id };

    const data = await req.queryHandler(gUser, "", filter);
    res.status(200).send(data);
  },

  update: async (req, res) => {
    /*
      #swagger.tags = ["gUsers"]
      #swagger.summary = "Update Google User"
      #swagger.parameters['body'] = {
        in: 'body',
        required: true,
        schema: {
          "firstname": "String",
          "lastname": "String",
          "email": "String",
          "uid": "String",
          "image": "string",
          }
        }
    */
    if (req.params?.id !== req.user?._id && !req.user?.isAdmin) {
      res.errorStatusCode = 401;
      throw new Error(
        "You do not have permission to update other users' information"
      );
    }
    req.user?.isAdmin === false && (req.body.isAdmin = false);
    const data = await gUser.findByIdAndUpdate(
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
      #swagger.tags = ["gUsers"]
      #swagger.summary = "Delete Google User"
    */

    if (req.params?.id !== req.user?._id && !req.user?.isAdmin) {
      res.errorStatusCode = 401;
      throw new Error(
        "You do not have permission to delete other users' information"
      );
    }

    const data = await gUser.deleteOne({ _id: req.params.id });
    res.status(data.deletedCount ? 204 : 404).send(data);
  },
};
