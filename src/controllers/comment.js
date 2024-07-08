"use strict";

const Comment = require("../models/comment");
const User = require("../models/user");
const Blog = require("../models/blog");

/* -------------------------------------------------------
    EXPRESSJS - DEFI Project
------------------------------------------------------- */

module.exports = {
  create: async (req, res) => {
    // {
    //     "text":"Deneeme yorumu 2"
    // }
    const { blogId } = req.params;
    const { text } = req.body;
    const { name, avatar, _id } = await User.findOne({ _id: req.user });

    const comment = await Comment.create({
      comment: { text, name, avatar, _id },
    });
    await Blog.updateOne({ _id: blogId }, { $push: { comments: comment } });

    res.send({
      error: false,
      result: await Blog.findOne({ _id: blogId }).populate("comments"),
    });
  },


  update: async (req, res) => {
  },  

  
  delete: async (req, res) => {
    const { chatId } = req.body;
    const data = await Chat.deleteOne({ _id: chatId });
    if (data.deletedCount >= 1) {
      res.send({
        message: "Chat successfully deleted",
      });
    } else {
      res.send({
        message: "There is no chat to be deleted.",
      });
    }
  },
};
