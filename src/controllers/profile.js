"use strict";

const Profile = require("../models/profile");

/* -------------------------------------------------------
    EXPRESSJS - DEFI Project
------------------------------------------------------- */

module.exports = {
  create: async (req, res) => {
    const { height, weight, PR, size } = req.body;

    const profile = await Profile.create({
      height,
      weight,
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
    const profile = await Profile.find({ userId: userId });
    res.send({
      Profile: profile,
    });
  },

  update: async (req, res) => {
    // SAMPLE DATA - Hangi datayi degistirirsen degistir diger verileride yollaman lazim
    //   {
    //     "subDocType": "PR", _id verisi
    //     "subDocId": "66820cb321cf6c1d811bd50e", 
    //     "updateData": {
    //         "Bench": "190",
    //         "Squat": "180",
    //         "Deadlift": "100",
    //         "Date": "30.06.2024"
    //     }
    // }

    const { subDocType, subDocId, updateData } = req.body;

    const updatedProfile = await Profile.findOneAndUpdate(
      { _id: subDocId },
      { $set: { [`${subDocType}`]: updateData } },
      { new: true }
    );

    res.send({
      message: "Profile updated.",
      Profile: updatedProfile,
    });
  },


  delete: async (req, res) => {
    const { dataId } = req.body;
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
