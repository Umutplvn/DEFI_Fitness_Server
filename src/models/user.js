"use strict";
/* -------------------------------------------------------
    EXPRESSJS - DEFI Project
------------------------------------------------------- */

const mongoose = require("mongoose");
const passwordEncrypt = require("../helpers/passwordEncrypt");

// Regex pattern for password validation
const passwordPattern = /^.{8,}$/;

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

    dateOfBirth: {
      type: Date,
      trim: true,
    },

    gender: {
      type: String,
      trim: true,
      default:"Male"
    },

    password: {
      type: String,
      trim: true,
      required: true,
      set: (password) => passwordEncrypt(password),
    },

    verified: {
      type: Boolean,
      default: false,
    },

    isAdmin: {
      type: Boolean,
      default: false,
    },

    membership: {
      type: String,
      default: "Basic",
      // enum: ["Basic", "Premium"],
    },

    workoutplan: {
      type: String,
      trim: true,
    },

    avatar: {
      type: String,
      trim: true
    },
    
    level: {
      type: Number,
      trim: true,
      default:1 
    },

    savedBlog: [
      {
        type: Object,
      },
    ],

    sportBranch: 
      {
        type: String,
      },

    stripeCustomerId: {
        type: String, 
        trim: true,
      },
  },
  { timestamps: true, collection: "user" }
);

module.exports = mongoose.model("User", UserSchema);
