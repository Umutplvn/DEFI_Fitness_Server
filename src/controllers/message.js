"use strict";

const Chat = require("../models/chat");
const message = require("../models/message");
const Message = require("../models/message");
const User = require("../models/user");

/* -------------------------------------------------------
    EXPRESSJS - DEFI Project
------------------------------------------------------- */

module.exports = {
  create: async (req, res) => {
    const { text, chatId } = req.body;
    const { name, avatar } = await User.findOne({ _id: req.user });
    
    const content = await Message.create({
      text,
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

  addReaction:async(req,res)=>{
    const {messageId, reaction}=req.body
    const message= await Message.updateOne({_id:messageId}, {reaction:reaction})

      res.status(200).send({
        message:await Message.findOne({_id:messageId})
      })

  },

  reply:async(req,res)=>{
    const {replyMessageId, text, chatId}=req.body
    const { name, avatar } = await User.findOne({ _id: req.user });

    const message=await Message.findOne({_id:replyMessageId})

    await Message.create({replyTo:message, text, chatId,sender: { name, avatar },
    })

    const chat = await Message.find({ chatId: { $in: chatId } });

    res.status(200).json(chat);
    
  },


  delete: async (req, res) => {
    const { messageId } = req.body;
    const data = await Message.deleteOne({ _id: messageId });
    if (data.deletedCount >= 1) {
      res.send({
        message: "Message successfully deleted",
      });
    } else {
      res.send({
        message: "There is no message to be deleted.",
      });
    }
  },
};
