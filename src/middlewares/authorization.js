"use strict";
/* -------------------------------------------------------
    EXPRESSJS - DEFI Project
------------------------------------------------------- */

const express = require("express");
const tokenModel = require("../models/token");

module.exports = async (req, res, next) => {
  const tokenData = req?.headers?.authorization || null;
  req.isLogin = false;

  if (tokenData) {
    const authToken = await tokenModel
      .findOne({ token: tokenData })
      .populate("userId");
    req.isLogin = true;
    req.user = authToken?.userId?._id;
  }
  next();
};
