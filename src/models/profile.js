"use strict";
/* -------------------------------------------------------
    EXPRESSJS - DEFI Project
------------------------------------------------------- */

// SAMPLE DATA

// {
//   "weight": {
//       "Date": "30.06.2024",
//       "netWeight": "70"
//   },
//   "height": {
//       "Date": "30.06.2024",
//       "netHeight": "180"
//   },
//   "PR": {
//       "Bench": "80",
//       "Squat": "180",
//       "Deadlift": "100",
//       "Date": "30.06.2024"
//   },
//   "size": {
//       "Wist": "40",
//       "Biceps": "35",
//       "Shoulder": "120",
//       "Chest": "120",
//       "Leg": "50",
//       "Date": "30.06.2024"    }
// }

const mongoose = require("mongoose");

const ProfileSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
    },

    // Height and Weight for FMI
    height: {
      type: Object,
      trim: true,
    },

    weight: {
      type: Object,
    },

    // PR Chart
    PR: {
      type: Object,
    },

    //Size Chart
    size: {
      type: Object,
    },
  },
  { timestamps: true, collection: "profile" }
);

module.exports = mongoose.model("Profile", ProfileSchema);
