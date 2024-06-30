"use strict";
/* -------------------------------------------------------
    EXPRESSJS - DEFI Project
------------------------------------------------------- */

const mongoose = require("mongoose");

const DetailsSchema = new mongoose.Schema(
  {
    avatar: {
      type: String,
      trim: true,
      default:
        "https://www.google.com/url?sa=i&url=http%3A%2F%2Fwww.laptoppcapk.com%2Ffitness-point%2F&psig=AOvVaw0gWJzVmLitXNL91MZXqtOu&ust=1719788775218000&source=images&cd=vfe&opi=89978449&ved=0CBEQjRxqFwoTCKCU5sv2gYcDFQAAAAAdAAAAABAJ",
    },

    height: {
      type: Number,
      trim: true,
    },

    weight: [
      {
        type: Object,
      },
    ],

    sportBranch: [
      {
        type: String,
      },
    ],
  },
  { timestamps: true, collection: "details" }
);

DetailsSchema.virtual("FMI").get(function () {
  const weights = Array.from(this.weight.values());
  const latestWeight = weights[weights.length - 1] || 0;
  return latestWeight / ((this.height / 100) * (this.height / 100));
});

module.exports = mongoose.model("Details", DetailsSchema);
