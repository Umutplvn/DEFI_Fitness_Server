"use strict";
/* -------------------------------------------------------
    EXPRESSJS - DEFI Project
------------------------------------------------------- */

const mongoose = require("mongoose");
const passwordEncrypt = require("../helpers/passwordEncrypt");

const UserSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      trim: true,
      required: true,
      unique: true,
    },

    name: {
      type: String,
      trim: true,
      required: true,
    },

    surname: {
        type: String,
        trim: true,
      },
  
    dateOfBirth:{
        type:Date,
        trim:true,
    },

    gender: {
        type: String,
        enum: ["Male", "Female"],
      },
  
      password: {
        type: String,
        trim: true,
        required: true,
        set: (password) => passwordEncrypt(password),
      },

      isAdmin:{
        type:Boolean,
        default:false
      }

  },
  { timestamps: true, collection: "user" }
);


module.exports = mongoose.model("User", UserSchema);

