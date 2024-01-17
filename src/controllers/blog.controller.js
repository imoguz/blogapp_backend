"use strict";

const Blog = require("../models/blog.model");
const Like = require("../models/like.model");
const Comment = require("../models/comment.model");
const View = require("../models/view.model");

module.exports = {
  create: async (req, res) => {
    /*
      #swagger.tags = ["Blogs"]
      #swagger.summary = "Create Blog"
      #swagger.parameters['body'] = {
        in: 'body',
        required: true,
        schema: {
          "title": "String",
          "content": "String",
          "image": "String",
          "author": "String",
          "category": "String",
          "status": "Enum p or d"
          }
        }
    */
    req.body.author = req.user?.username || req.user?.firstname;
    const data = await Blog.create(req.body);
    res.status(201).send(data);
  },

  readOne: async (req, res) => {
    /*
      #swagger.tags = ["Blogs"]
      #swagger.summary = "Get Single Blog"
    */

    const blog = await Blog.findOne({ _id: req.params.id });
    const likes_n = await Like.find({ post_id: blog._id });
    const comments = await Comment.find({ post: blog._id }).populate("user");
    const views = await View.find({ post_id: blog._id });
    const likes = likes_n?.length;
    const post_views = views?.length;
    const comment_count = comments?.length;
    const data = {
      ...blog.toObject(),
      likes_n,
      likes,
      comments,
      comment_count,
      post_views,
    };

    res.status(200).send(data);
  },

  readMany: async (req, res) => {
    /*
      #swagger.tags = ["Blogs"]
      #swagger.summary = "List Blogs"
      #swagger.description = `
        You can send query with endpoint for search[], sort[], page and limit.
        <ul> Examples:
          <li>URL/?<b>search[field1]=value1&search[field2]=value2</b></li>
          <li>URL/?<b>sort[field1]=1&sort[field2]=-1</b></li>
          <li>URL/?<b>page=2&limit=1</b></li>
        </ul>`
    */
    const blogs = await req.queryHandler(Blog);
    const blogsWithLikes = await Promise.all(
      blogs?.map(async (blog) => {
        const likes_n = await Like.find({ post_id: blog._id });
        const views = await View.find({ post_id: blog._id });
        const comments = await Comment.find({ post: blog._id }).populate(
          "user"
        );
        const post_views = views.length;
        const likes = likes_n.length;
        const comment_count = comments.length;
        return {
          ...blog.toObject(),
          likes_n,
          likes,
          comments,
          comment_count,
          post_views,
        };
      })
    );
    res.status(200).send(blogsWithLikes);
  },

  update: async (req, res) => {
    /*
      #swagger.tags = ["Blogs"]
      #swagger.summary = "Update Blog"
      #swagger.parameters['body'] = {
        in: 'body',
        required: true,
        schema: {
          "title": "String",
          "content": "String",
          "image": "String",
          "author": "String",
          "category": "String",
          "status": "Enum p or d"
          }
        }
    */

    const data = await Blog.findByIdAndUpdate(
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
      #swagger.tags = ["Blogs"]
      #swagger.summary = "Delete Blog"
    */

    const deletedBlog = await Blog.deleteOne({ _id: req.params.id });
    if (deletedBlog.deletedCount) {
      await Comment.deleteMany({ post: req.params.id });
      await Like.deleteMany({ post_id: req.params.id });
      await View.deleteMany({ post_id: req.params.id });
    }
    res.status(deletedBlog.deletedCount ? 204 : 404).send(deletedBlog);
  },
};
