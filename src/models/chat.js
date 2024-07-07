"use strict";
/* -------------------------------------------------------
    EXPRESSJS - DEFI Project
------------------------------------------------------- */

const mongoose = require("mongoose");

const ChatSchema = new mongoose.Schema(
// {
//   "secondId": "6689cdaba23dfeb3eefd944f"
// }
  {
    memberId: Array,

    members: Object,

    show: {
      type: Boolean,
      default: false,
    },

    messages:
      {
        type: Number,
        default:0
      },
    
    lastMessage: {
      type: Object,
    },
  },

  { timestamps: true, collection: "chat" }
);

module.exports = mongoose.model("Chat", ChatSchema);
