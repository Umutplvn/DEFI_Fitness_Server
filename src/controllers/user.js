"use strict";
/* -------------------------------------------------------
    EXPRESSJS - DEFI Project
------------------------------------------------------- */

require("express-async-errors");
const passwordEncrypt = require("../helpers/passwordEncrypt");
const User = require("../models/user");
const Token = require("../models/token");
const Blog = require("../models/blog");
const sendVerificationEmail = require("../helpers/emailVerification");
const fotgotPassVerify = require("../helpers/forgotPassVerify");


module.exports = {
  list: async (req, res) => {
    const data = await req.getModelList(User);
    const filteredData = data.map(user => ({
      _id: user._id,
      email: user.email,
      avatar: user.avatar,
      name: user.name,
      isAdmin:user.isAdmin,
      verified:user.verified,
      membership:user.membership,
      level:user.level
    }));

    res.status(200).send({
      error: false,
      count: filteredData.length,
      result: filteredData,
    })
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
    const {userId}= req.params
    const data = await User.deleteOne({ _id:userId });
    await Token.deleteOne({ userId: userId });
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

  saveBlog: async (req, res) => {
    const userId = req.user;
    const user = await User.findOne({ _id: userId });
    const { blogId } = req.body;
  
    if (!user) {
      return res.status(404).send({ error: "User not found" });
    }
  
    const checkBlog = user.savedBlog.some((item) => item._id.toString() == blogId);
  
    if (checkBlog) {
      user.savedBlog = user?.savedBlog.filter((item) => item._id.toString() !== blogId);
    } else {
      const blog = await Blog.findOne({ _id: blogId });
      user?.savedBlog.push(blog);
    }
  
    await user.save();
  
    res.send({
      result: user,
    });
  },
  
  

  forgotPass: async (req, res) => {
    const { email } = req.body;
    const user = await User.findOne({ email });
    const upName = user?.name.charAt(0).toUpperCase() + user?.name.slice(1).toLowerCase();
  

    if (!user) {
      res.status(400).send({ error: true, message: "User not found!" });
      return;
    } else if (!user.verified) {
      await User.deleteOne({ _id: user._id });
      res.status(400).send({ error: true, message: "User not found!" });
      return;
    }
  
    const tokenData = "Token " + passwordEncrypt(user._id + `${new Date()}`);
    await Token.create({ userId: user._id, token: tokenData });
  
    fotgotPassVerify({ email, name: upName, userId: user._id });
  
    res.status(201).send({
      error: false,
      Token: tokenData,
      result: user,
    });
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
