"use strict";
/* -------------------------------------------------------
    EXPRESSJS - DEFI Project
------------------------------------------------------- */

const mongoose = require("mongoose");

const ChatSchema = new mongoose.Schema(
  {
    memberId: Array,
    
    members: Object,

    show: {
      type: Boolean,
      default: false,
    },

    messages: [
      {
        type: mongoose.Schema.Types.ObjectId,
      },
    ],
  },

  { timestamps: true, collection: "chat" }
);

module.exports = mongoose.model("Chat", ChatSchema);
