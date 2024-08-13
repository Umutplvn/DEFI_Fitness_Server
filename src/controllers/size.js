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


  deleteAll: async (req, res) => {
    try {
      const userId = req.user.toString();
  
      const data = await Size.deleteMany({ userId: userId });
  
      if (data.deletedCount >= 1) {
        res.status(200).send({
          message: "Body Size history successfully deleted",
        });
      } else {
        res.status(404).send({
          message: "There is no data to be deleted.",
        });
      }
    } catch (error) {
      res.status(500).send({
        message: "An error occurred while deleting the Body Size history.",
        error: error.message,
      });
    }
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
