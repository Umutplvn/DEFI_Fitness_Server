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


  deleteAll: async (req, res) => {
    try {
      const userId = req.user.toString();
  
      const data = await PR.deleteMany({ userId: userId });
  
      if (data.deletedCount >= 1) {
        res.status(200).send({
          message: "PR history successfully deleted",
        });
      } else {
        res.status(404).send({
          message: "There is no data to be deleted.",
        });
      }
    } catch (error) {
      res.status(500).send({
        message: "An error occurred while deleting the PR history.",
        error: error.message,
      });
    }
  }
  ,
  
  


  delete: async (req, res) => {
   
    const { PRid } = req.params;
    const data = await PR.deleteOne({ _id: PRid });
   
    if (data.deletedCount >= 1) {
      res.send({
        message: "PR data successfully deleted",
      });
    } else {
      res.send({
        message: "There is no PR data to be deleted.",
      });
    }
  },
};
