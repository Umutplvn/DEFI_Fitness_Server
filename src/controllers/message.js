"use strict";

const Chat = require("../models/chat");
const Message = require("../models/message");
const User = require("../models/user");

/* -------------------------------------------------------
    EXPRESSJS - DEFI Project
------------------------------------------------------- */

module.exports = {
  create: async (req, res) => {
    const { text, reaction, chatId } = req.body;
    const { name, avatar } = await User.findOne({ _id: req.user });
    
    const content = await Message.create({
      text,
      reaction,
      chatId,
      sender: { name, avatar },
    });

    await Chat.updateOne(
      { _id: chatId },
      {$inc: { messages: 1 },  $set: { lastMessage: content }, show:true }
    );

    const message = await Message.find({ chatId: { $in: chatId } });

    res.status(200).json(message);
  },

  delete: async (req, res) => {
    const { chatId } = req.body;
    const data = await Chat.deleteOne({ _id: chatId });
    if (data.deletedCount >= 1) {
      res.send({
        message: "Chat successfully deleted",
      });
    } else {
      res.send({
        message: "There is no chat to be deleted.",
      });
    }
  },
};
