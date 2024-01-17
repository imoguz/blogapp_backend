"use strict";

const packagejson = require("./package.json");
const autogen = require("swagger-autogen")();

require("dotenv").config();
const HOST = "https://blogapp-backend-ba4v8wd4q-imoguz.vercel.app";
const PORT = process.env?.PORT || 8000;

const document = {
  info: {
    version: packagejson.version,
    title: packagejson.name,
    description: packagejson.description,
    termsOfService: "https://portfolio-imoguz.vercel.app/",
    contact: { name: packagejson.author, email: "imoguz0510@gmail.com" },
    license: { name: packagejson.license },
  },
  host: `${HOST}:${PORT}`,
  basePath: "/",
  schemes: ["http", "https"],
  securityDefinitions: {
    JWT: {
      type: "apiKey",
      in: "header",
      name: "Authorization",
      description:
        "Enter Your AccessToken (JWT) for Login. Example: <b>Bearer <i>...token...<i></b>",
    },
  },
  security: [{ JWT: true }],
  definition: {
    "/auth/login": {
      username: {
        type: "String",
        required: true,
      },
      password: {
        type: "String",
        required: true,
      },
    },
    "/auth/refresh": {
      "token.refresh": {
        description: "{ token: { refresh: ... } }",
        type: "String",
        required: true,
      },
    },
    User: require("./src/models/user.model").schema.obj,
  },
};
const routes = ["./index.js"];
const outputFile = "./src/configs/swagger.json";

autogen(outputFile, routes, document);
