"use strict";

/* -------------------------------------------------------
    EXPRESSJS - DEFI Project
------------------------------------------------------- */

const User = require("../models/user");
const Blog = require("../models/blog");

module.exports = {
  
  list: async (req, res) => {
    const blogs = await Blog.find().populate("comments");

    res.send({
      result: blogs,
    });
  },

  create: async (req, res) => {
    //   SAMPLE DATA
    //   {
    //     "category_name": "Deneme Category",
    //     "status": "public",
    //     "title":"ağlıklı Yaşam İçin Egzersiz ve Beslenmenin Önemi",
    //     "content": "Sağlıklı bir yaşam sürdürmek..."
    // }

    const { _id, name, avatar } = await User.findOne({ _id: req.user });
    const { category_name, status, content, title } = req.body;
    const blog = await Blog.create({
      author: { _id, name, avatar },
      status,
      category_name,
      content,
      title,
    });

    res.status(201).send({
      message: "Blog successfully created.",
      result: blog,
    });
  },

  read: async (req, res) => {
    const { blogId } = req.params;

    const blog = await Blog.findOne({ _id: blogId }).populate("comments");

    res.status(200).send({
      result: blog,
    });
  },

  update: async (req, res) => {
    await Blog.updateOne({ _id: req.params.blogId }, req.body, {
      runValidators: true,
    });
    res.status(202).send({
      error: false,
      result: await Blog.findOne({ _id: req.params.blogId }),
    });
  },

  delete: async (req, res) => {
    const { blogId } = req.params;
    const data = await Blog.deleteOne({ _id: blogId });
    if (data.deletedCount >= 1) {
      res.send({
        message: "Blog successfully deleted",
      });
    } else {
      res.send({
        message: "There is no blog to be deleted.",
      });
    }
  },

  like: async (req, res) => {
    //   SAMPLE DATA
    //   {
    //     "blogId": "668b4e49fe936d29f9dc17f4"
    // }

    const user = req.user.toString();
    const { blogId } = req.body;
    const blog = await Blog.findOne({ _id: blogId });

    if (blog.likes.includes(user)) {
      blog.likes = blog.likes.filter((item) => item !== user);
    } else {
      blog.likes.push(user);
    }

    await blog.save();

    res.send({
      result: blog,
    });
  }

};
