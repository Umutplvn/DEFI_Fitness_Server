"use strict";

/* -------------------------------------------------------
    EXPRESSJS - DEFI Project
------------------------------------------------------- */

const mongoose = require("mongoose");

const PRSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      trim: true,
      required: true,
    },
    bench: {
      type: Number,
      trim: true,
      required: true,
    },
    deadlift: {
      type: Number,
      trim: true,
      required: true,
    },
    squat: {
      type: Number,
      trim: true,
      required: true,
    },
  },
  {
    timestamps: true,
    collection: "PR",
  }
);


module.exports = mongoose.model("PR", PRSchema);
