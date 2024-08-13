"use strict";

const BMI = require("../models/bmi");

/* -------------------------------------------------------
    EXPRESSJS - DEFI Project
------------------------------------------------------- */

module.exports = {
  create: async (req, res) => {
    const userId = req.user;
    const { weight, height } = req.body;
    const data = await BMI.create({ weight, height, userId });

    res.send({
      error: false,
      result: data,
      list: await BMI.find({ userId: req.user }),
    });
  },

  list: async (req, res) => {
    const userId = req.user;
    const data = await BMI.find({ userId });

    res.send({
      error: false,
      result: data,
    });
  },

  deleteAll: async (req, res) => {
    try {
      const userId = req.user.toString();

      const data = await BMI.deleteMany({ userId: userId });

      if (data.deletedCount >= 1) {
        res.status(200).send({
          message: "BMI history successfully deleted",
        });
      } else {
        res.status(404).send({
          message: "There is no data to be deleted.",
        });
      }
    } catch (error) {
      res.status(500).send({
        message: "An error occurred while deleting the BMI history.",
        error: error.message,
      });
    }
  },
  
  delete: async (req, res) => {
    const { BMIid } = req.params;
    const data = await BMI.deleteOne({ _id: BMIid });

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
