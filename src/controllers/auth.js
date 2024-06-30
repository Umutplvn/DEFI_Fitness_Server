"use strict";
/* -------------------------------------------------------
    EXPRESSJS - DEFI Project
------------------------------------------------------- */

const Token = require("../models/token");
const User = require("../models/user");
const passwordEncrypt = require("../helpers/passwordEncrypt");

module.exports = {
  login: async (req, res) => {
      const { password, email } = req.body;

      if (!password || !email) {
        res.status(401).send({
          error: true,
          message: "Email and password are required.",
        });
        return;
      }

      const user = await User.findOne({ email, password });

      if (user) {
        const tokenData = "Token " + passwordEncrypt(user._id + `${new Date()}`);
        await Token.create({ userId: user._id, token: tokenData });

        res.status(201).send({
          error: false,
          result: user,
          Token: tokenData,
        });
      } else {
        res.status(401).send({
          error: true,
          message: "Login parameters are not correct.",
        });
      }
  },

  logout: async (req, res) => {
    try {
      const token = req?.headers?.authorization || null;
      let message = "";

      if (token) {
        await Token.deleteOne({ token });
        message = "Successfully logged out.";
      } else {
        message = "Logout failed.";
      }

      res.status(200).send({
        error: false,
        message: message,
      });
    } catch (err) {
      res.status(500).send({
        error: true,
        message: err.message,
      });
    }
  }
};
