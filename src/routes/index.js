"use strict";

const router = require("express").Router();

router.use("/auth", require("./auth.route"));
router.use("/users", require("./user.route"));
router.use("/blogs", require("./blog.route"));
router.use("/categories", require("./category.route"));
router.use("/comments", require("./comment.route"));
router.use("/likes", require("./like.route"));
router.use("/views", require("./view.route"));
router.use("/documents", require("./document.route"));

module.exports = router;
