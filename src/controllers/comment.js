"use strict";

const Comment = require("../models/comment");
const User = require("../models/user");
const Blog = require("../models/blog");

/* -------------------------------------------------------
    EXPRESSJS - DEFI Project
------------------------------------------------------- */

module.exports = {
  create: async (req, res) => {
  //  {
  //     "text":"deneeme 2",
  //     "blogId":"669d7b2a0866616388013124"
  // }
    const { text,blogId } = req.body;
    const { name, avatar, _id } = await User.findOne({ _id: req.user });

    const data = await Comment.create({
      comment: { text, name, avatar, userId:_id, blogId },
    });
    await Blog.updateOne({ _id: blogId }, { $push: { comments: data._id } });
    
    const blogComment=await Blog.findOne({_id:blogId}).populate("comments")

    res.send({
      error: false,
      result:blogComment
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
  //   {
  //     "commentId": "66a07a194aab58ba16524b6a",
  //     "blogId": "669d7b2a0866616388013124"
  // }
    const { commentId, blogId } = req.body;
    const data = await Comment.deleteOne({ _id: commentId });
    const blogComment=await Blog.findOne({_id:blogId}).populate("comments")

    if (data.deletedCount >= 1) {
      res.send({
        message: "Comment successfully deleted",
        result:blogComment

      });
    } else {
      res.send({
        message: "There is no comment to be deleted.",
      });
    }
  },
};
