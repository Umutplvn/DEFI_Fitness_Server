"use strict";

const Profile = require("../models/profile");

/* -------------------------------------------------------
    EXPRESSJS - DEFI Project
------------------------------------------------------- */

module.exports = {
  create: async (req, res) => {
    const { avatar, height, weight, sportBranch, PR, size } = req.body;

    const profile = await Profile.create({
      avatar,
      height,
      weight,
      sportBranch,
      PR,
      size,
      userId: req.user,
    });

    res.send({
      message: "Profile data has added successfully.",
      Profile: profile,
    });
  },

  read: async (req, res) => {
    const { userId } = req.params;
    const profile = await Profile.findOne({ userId: userId });
    res.send({
      Profile: profile,
    });
  },


  update: async (req, res) => {
    // SAMPLE DATA
    // {
    //     "subDocType": "size",
    //     "subDocId": "78679675674543",
    //     "updateData": {
    //         "Bench": "180",
    //                 "Wist": "70",
    //                 "Biceps": "45",
    //                 "Shoulder": "150",
    //                 "Chest": "180",
    //                 "Leg": "60",
    //                 "Date": "30.06.2024",
    //         "id":"78679675674543"
    //     }
    // }

    const { userId } = req.params;
    const { subDocType, subDocId, updateData } = req.body;

    const updatedProfile = await Profile.findOneAndUpdate(
      { userId: userId, [`${subDocType}.id`]: subDocId },
      { $set: { [`${subDocType}.$`]: updateData } },
      { new: true }
    );

    res.send({
      message: "Profile updated.",
      Profile: updatedProfile,
    });
  },

  delete: async (req, res) => {
    const {dataId}=req.body
    const data = await Profile.deleteOne({ _id: dataId });
    if (data.deletedCount >= 1) {
      res.send({
        message: "Data successfully deleted",
      });
    } else {
      res.send({
        message: "There is no recording to be deleted.",
      });
    }
  },
};
