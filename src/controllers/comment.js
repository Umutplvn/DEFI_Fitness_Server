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
    //     "text":"Deneme yorumu"
    // }
    const { blogId } = req.params;
    const { text } = req.body;
    const { name, avatar, _id } = await User.findOne({ _id: req.user });

    const comment = await Comment.create({
      comment: { text, name, avatar, userId:_id },
    });
    await Blog.updateOne({ _id: blogId }, { $push: { comments: comment._id } });

    res.send({
      error: false,
      result: comment,
    });
  },

  read: async (req, res) => {
    //     "commentId":"6691d5427814085bc825370e"
    const {commentId}=req.body
    const comment= await Comment.findOne({_id:commentId})

    res.send({
      error: false,
      result: comment,
    });

  },


  update: async (req, res) => {
    // {
    //     "text": "Deneme update",
    //     "commentId":"6691d5427814085bc825370e"
    // }
    const { text, commentId } = req.body;
    const { name, avatar, _id } = await User.findOne({ _id: req.user });
    await Comment.updateOne(
      { _id: commentId },
      { comment: { text, name, avatar, userId:_id } }
    );

    res.send({
      error: false,
      result: await Comment.findOne({ _id: commentId }),
    });
  },

  delete: async (req, res) => {
    const { commentId } = req.body;
    const data = await Comment.deleteOne({ _id: commentId });
    if (data.deletedCount >= 1) {
      res.send({
        message: "Comment successfully deleted",
      });
    } else {
      res.send({
        message: "There is no comment to be deleted.",
      });
    }
  },
};
