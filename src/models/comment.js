"use strict";

/* -------------------------------------------------------
    EXPRESSJS - DEFI Project
------------------------------------------------------- */

const mongoose = require("mongoose");

const CommentSchema = new mongoose.Schema(
  {
    comment:{
        type:Object,
        trim:true,
        required:true
    }
  },
  {
    timestamps: true,
    collection: "comment",
  }
);

module.exports = mongoose.model("Comment", CommentSchema);
