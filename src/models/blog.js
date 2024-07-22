"use strict";

/* -------------------------------------------------------
    EXPRESSJS - DEFI Project
------------------------------------------------------- */

const mongoose = require("mongoose");

const BlogSchema = new mongoose.Schema(
  {
    image: {
      type: String,
      trim: true,
    },

    content: {
      type: String,
      trim: true,
      required:true
    },

    title: {
      type: String,
      trim: true,
      required:true
    },

    category_name: {
      type: String,
      required: true,
    },

    status: {
      type: String,
      enum: ["public", "draft"],
    },

    author: {
      type: Object,
      required: true,
    },

    comments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref:"Comment"
    },
    ],

    likes: [
      {
        type: String,
      },
    ],

    likes_n:{
        type: Number,
        default:0,
        transform: function(){ return this.likes.length }
    },

    isFree:{
      type:Boolean,
      default:true
    },

    post_views:[{
        type:String
    }]

  },
  {
    timestamps: true,
    collection: "blog",
  }
);

module.exports = mongoose.model("Blog", BlogSchema);
