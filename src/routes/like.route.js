"use strict";

const router = require("express").Router();
const { isLogin, isAdmin } = require("../middlewares/permissions");
const {
  create,
  verify,
  readOne,
  readMany,
  update,
  _delete,
} = require("../controllers/like.controller");

router.route("/").get(readMany).post(create);
router.route("/:id").get(readOne).put(update).delete(_delete);

module.exports = router;
