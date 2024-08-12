"use strict";


const PR = require("../models/pr");

/* -------------------------------------------------------
    EXPRESSJS - DEFI Project
------------------------------------------------------- */

module.exports = {
  create: async (req, res) => {
    const userId=req.user
    const { bench, deadlift, squat } = req.body;
    const data=await PR.create({bench, deadlift, squat, userId})

    res.send({
      error: false,
      result: data,
      list: await PR.find({userId:req.user})
    });
  },

  list: async (req, res) => {
    const userId=req.user
    const data = await PR.find({ userId });

    res.send({
      error: false,
      result: data,
    });
  },

  delete: async (req, res) => {
   
    const { PRid } = req.params;
    const data = await PR.deleteOne({ _id: PRid });
   
    if (data.deletedCount >= 1) {
      res.send({
        message: "Comment successfully deleted",
      });
    } else {
      res.send({
        message: "There is no comment to be deleted.",
      });
    }
  },
};
