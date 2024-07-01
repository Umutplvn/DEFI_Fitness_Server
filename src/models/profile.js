"use strict";
/* -------------------------------------------------------
    EXPRESSJS - DEFI Project
------------------------------------------------------- */

// SAMPLE DATA
// {
//   "avatar": "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.iconfinder.com%2Ficons%2F4043232%2Favatar_batman_comics_hero_icon&psig=AOvVaw1bH8SWy48phInF-otWgNiS&ust=1719806945674000&source=images&cd=vfe&opi=89978449&ved=0CBEQjRxqFwoTCMikg6O6gocDFQAAAAAdAAAAABAE",
//   "height": {
//       "netHeight": "170",
//       "id": "5475685623"
//   },
//   "weight": {
//       "Date": "30.06.2024",
//       "netWeight": "70",
//       "id": "2342353453534"
//   },
//   "sportBranch": {
//       "Branch": "Football",
//       "id": "623424235345354"
//   },
//   "PR": {
//       "Bench": "80",
//       "Squat": "180",
//       "Deadlift": "100",
//       "Date": "30.06.2024",
//       "id": "34455676867"
//   },
//   "size": {
//       "Wist": "40",
//       "Biceps": "35",
//       "Shoulder": "120",
//       "Chest": "120",
//       "Leg": "50",
//       "Date": "30.06.2024",
//       "id": "78679675674543"
//   }
// }

const mongoose = require("mongoose");

const ProfileSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
    },

    sportBranch: [
      {
        type: Object,
      },
    ],

    // Height and Weight for FMI
    height: [{
      type: Object,
      trim: true,
    }],

    weight: [
      {
        type: Object, 
      },
    ],

    // PR Chart
    PR: [
      {
        type: Object, 
      },
    ],

    //Size Chart
    size: [
      {
        type: Object, 
      },
    ],
  },
  { timestamps: true, collection: "profile" }
);

module.exports = mongoose.model("Profile", ProfileSchema);
