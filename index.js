"use strict";

const express = require("express");
const app = express();
require("express-async-errors");

// ----- .env variables -----
require("dotenv").config();
const PORT = process.env.PORT || 8000;
const packagejson = require("./package.json");

// ----- Database Connection -----
require("./src/configs/dbConnection")();

// ----- Convert to JSON -----
app.use(express.json());

// ----- Cors -----
app.use(require("cors")());

// ----- middlewares -----
app.use(require("./src/middlewares/queryHandler"));
app.use(require("./src/middlewares/jwt.verification"));

// // ----- routes -----
app.use("/blog", require("./src/routes/index"));

// ----- main path -----
app.all("/", (req, res) => {
  res.send({
    message: "Welcome to " + packagejson.name,
    documents: {
      swagger: "/blog/documents/swagger",
      redoc: "/blog/documents/redoc",
      json: "/blog/documents/json",
    },
    user: req.user,
  });
});

// ----- Error Handler -----
app.use(require("./src/middlewares/errorHandler"));

// ----- listenning server -----
app.listen(PORT, () => console.log("Server is running on", PORT));
