"use strict";

const Profile = require("../models/profile");

/* -------------------------------------------------------
    EXPRESSJS - DEFI Project
------------------------------------------------------- */

module.exports = {
  create: async (req, res) => {
    const { FMI, PR, size } = req.body;
const userId=req.user
    const profile = await Profile.create({
      FMI,
      PR,
      size,
      userId
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
