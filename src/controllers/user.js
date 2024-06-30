"use strict";
/* -------------------------------------------------------
    EXPRESSJS - DEFI Project
------------------------------------------------------- */

require("express-async-errors");
const passwordEncrypt = require("../helpers/passwordEncrypt");
const User = require("../models/user");
const Token = require("../models/token");
const sendVerificationEmail = require("../helpers/emailVerification");


module.exports = {
  list: async (req, res) => {
    const data = await req.getModelList(User);

    res.status(200).send({
      error: false,
      count: data.length,
      result: data,
    });
  },

  create: async (req, res) => {
    let passcode = Math.floor(Math.random() * 10000) + 2000;
    const { email, password, name } = req.body;
    const upName = name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
    const userEmail = await User.findOne({ email });

    if (userEmail) {
      res
        .status(400)
        .send({ error: true, message: "The email address is already in use." });
      return;
    }

    const newUser = await User.create({ email, password, name });
    const tokenData = "Token " + passwordEncrypt(newUser._id + `${new Date()}`);
    await Token.create({ userId: newUser._id, token: tokenData });

    sendVerificationEmail(email, passcode, upName);

    res.status(201).send({
      error: false,
      result: newUser,
      Token: tokenData,
      passcode,
    });
  },

  read: async (req, res) => {
    const data = await User.findOne({ _id: req.params.userId });

    res.status(200).send({
      error: false,
      result: data,
    });
  },

  update: async (req, res) => {
    const updateData = req.body;
    const updatedUser = await User.findOneAndUpdate(
      { _id: req.params.userId },
      updateData,
      { new: true, runValidators: true }
    );

    res.status(202).send({
      error: false,
      result: updatedUser,
    });
  },

  delete: async (req, res) => {
    const data = await User.deleteOne({ _id: req.params.userId });
    await Token.deleteOne({ userId: req.params.userId });
    if (data.deletedCount >= 1) {
      res.send({
        message: "Successfully deleted",
      });
    } else {
      res.send({
        message: "There is no recording to be deleted.",
      });
    }
  },

  updatePassword: async (req, res) => {
    const password = req.body.password;

    await User.updateOne(
      { _id: req.user },
      { password: password },
      {
        runValidators: true,
      }
    );
    const newData = await User.findOne({ _id: req.user });

    res.status(202).send({
      error: false,
      message: "Password has changed successfully.",
      result: newData,
    });
  },
};
