"use strict";
/* -------------------------------------------------------
    EXPRESSJS - DEFI Project
------------------------------------------------------- */


const mongoose = require("mongoose");

const MessageSchema = new mongoose.Schema(
  {
    text:{
        type:String,
        required:true

    },

    reaction:{
        type:String,
        required:false
    },

    chatId:{
        type:String,
        required:true
    },
    
     sender:{
        type:Object
     }
  },

  { timestamps: true, collection: "message" }
);

module.exports = mongoose.model("Message", MessageSchema);
