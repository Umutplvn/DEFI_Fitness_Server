"use strict";


const Size = require("../models/size");

/* -------------------------------------------------------
    EXPRESSJS - DEFI Project
------------------------------------------------------- */

module.exports = {
  create: async (req, res) => {
    const userId=req.user
    const { arm, chest, waist, thigh } = req.body;
    const data=await Size.create({arm, chest, waist, thigh, userId})

    res.send({
      error: false,
      result: data,
      list: await Size.find({userId:req.user})
    });
  },

  list: async (req, res) => {
    const userId=req.user
    const data = await Size.find({ userId });

    res.send({
      error: false,
      result: data,
    });
  },

  delete: async (req, res) => {
   
    const { sizeId } = req.params;
    const data = await Size.deleteOne({ _id: sizeId });
   
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
