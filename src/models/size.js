"use strict";

/* -------------------------------------------------------
    EXPRESSJS - DEFI Project
------------------------------------------------------- */

const mongoose = require("mongoose");

const SizeSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      trim: true,
      required: true,
    },
    arm: {
      type: Number,
      trim: true,
      required: true,
    },
    chest: {
      type: Number,
      trim: true,
      required: true,
    },
    waist: {
      type: Number,
      trim: true,
      required: true,

    },
    thigh: {
        type: Number,
        trim: true,
        required: true,

      }
  },
  {
    timestamps: true,
    collection: "size",
  }
);


module.exports = mongoose.model("Size", SizeSchema);
