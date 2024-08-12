"use strict";

/* -------------------------------------------------------
    EXPRESSJS - DEFI Project
------------------------------------------------------- */

const mongoose = require("mongoose");

const BMISchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      trim: true,
      required: true,
    },
    height: {
      type: Number,
      trim: true,
      required: true,
    },
    weight: {
      type: Number,
      trim: true,
      required: true,
    },
    BMI: {
      type: Number,
      trim: true,
      default: 0,
    },
  },
  {
    timestamps: true,
    collection: "bmi",
  }
);

BMISchema.pre("save", function (next) {
  if (this.weight && this.height) {
    const heightInMeters = this.height / 100;
    const bmi = this.weight / (heightInMeters * heightInMeters);
    this.BMI = parseFloat(bmi.toFixed(2)); 
  } else {
    this.BMI = null;
  }
  next();
});

module.exports = mongoose.model("BMI", BMISchema);
