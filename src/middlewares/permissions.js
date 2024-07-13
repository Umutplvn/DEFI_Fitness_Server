"use strict";
/* -------------------------------------------------------
    EXPRESSJS - DEFI Project
------------------------------------------------------- */

// Middleware: permissions

const User = require("../models/user");

module.exports = {
  isLogin: (req, res, next) => {
    if (req.isLogin){
      next();
    } else {
      res.errorStatusCode = 403;
      throw new Error("NoPermission: You must login.");
    }
  },

  isAdmin: async (req, res, next) => {
    const user = await User.findOne({ _id: req.user });
    console.log(user);
    if (user.isAdmin) {
      next();
    } else {
      res.errorStatusCode = 403;
      res.send({
        error: true,
        message: "NoPermission: Only admin can proceed.",
      });
    }
  },

  isOwn: async (req, res, next) => {
    const user = await User.findOne({ _id: req.user });
    const {userId}=req.params
    if(user._id==userId || user.isAdmin){
      next()
    }else {
      res.send({
        error: true,
        message: "NoPermission: You can only update your own data.",
      });
    }
  },


  isPremium: async (req, res, next) => {
    const user = await User.findOne({ _id: req.user });
    if (user.isPremium || user.isAdmin ) {
      next();
    } else {
      res.errorStatusCode = 403;
      res.send({
        error: true,
        message: "NoPermission: Only premium users can proceed.",
      });
    }
  }
};
