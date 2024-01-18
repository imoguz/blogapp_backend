"use strict";

const jwt = require("jsonwebtoken");
const setUserJWT = require("../helpers/setUserJWT");

module.exports = {
  login: async (req, res) => {
    /*
      #swagger.tags = ['Authentication']
      #swagger.summary = 'JWT: Login'
      #swagger.description = 'Login with username and password'
      #swagger.parameters['body'] = {
        in: 'body',
        required: true,
        schema: {
          "email": 'test',
          "password": 'Aa.12345'
        }
      }
    */
    const data = await setUserJWT(req.body);
    if (data.error) {
      res.status(401).send(data.error);
    } else {
      res.send(data);
    }
  },

  refresh: (req, res) => {
    /*
      #swagger.tags = ['Authentication']
      #swagger.summary = 'JWT: Refresh'
      #swagger.description = 'Refresh accesToken with refreshToken'
      #swagger.parameters['body'] = {
        in: 'body',
        required: true,
        schema: {
          "refresh": 'refreshToken',
        }
      }
    */
    const refresh = req.body?.refresh || null;
    jwt.verify(refresh, process.env.REFRESH_KEY, async (err, decoded) => {
      if (err) {
        res.status(403).send("invalid refresh token");
      } else {
        const data = await setUserJWT(decoded, refresh);
        if (data.error) {
          res.status(401).send(data.error);
        } else {
          res.send(data);
        }
      }
    });
  },

  logout: (req, res) => {
    /*
      #swagger.tags = ['Authentication']
      #swagger.summary = 'JWT: Logout'
      #swagger.description = 'No need to log out—just delete the token from storagee.'
    */
    res.send("No need to log out—just delete the token from storage.");
  },
};
