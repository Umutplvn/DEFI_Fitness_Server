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
    const user = User.findOne({ password, email });
    const isVerified = user?.verified;
    if (password && email) {
      if (user && isVerified) {
        const tokenData =
          "Token " + passwordEncrypt(newUser._id + `${new Date()}`);
        res.status(201).send({
          error: false,
          result: user,
          Token: tokenData,
        });
      } else {
        res.errorStatusCode = 401;
        throw new Error("Login parameters are not true.");
      }
    } else {
      res.errorStatusCode = 401;
      throw new Error("Email and password are required.");
    }
  },

  logout: async (req, res) => {
    const token = (await req.headers?.authorization) || null;
    let message = "";

    if (token) {
    await Token.deleteOne({ token: token });
      message = "Successfully logged out. ";
    } else {
      message = "Logout failed.";
    }

    res.status(200).send({
      error: false,
      message: message,
    });
  },
};
