"use strict";

const Chat = require("../models/chat");
const message = require("../models/message");
const Message = require("../models/message");
const User = require("../models/user");

/* -------------------------------------------------------
    EXPRESSJS - DEFI Project
------------------------------------------------------- */

module.exports = {

  list:async (req, res) => {

    const {chatId } = req.body
    const messages= await Message.find({chatId:chatId})

    res.send({
      result:messages
    })

  },

  
  create: async (req, res) => {
  //   {
  //     "text": "Deneme 1",
  //     "chatId":"6689f28f0b1efbdb235d1104"
  // }
    const { text, chatId } = req.body;
    const { name, avatar, _id } = await User.findOne({ _id: req.user });
    
    const content = await Message.create({
      text,
      chatId,
      sender: { name, avatar, _id },
    });

    await Chat.updateOne(
      { _id: chatId },
      {$inc: { messages: 1 },  $set: { lastMessage: content }, show:true }
    );

    const message = await Message.find({ chatId: { $in: chatId } });

    res.status(200).json(message);
  },


  addReaction:async(req,res)=>{
  // {
  //     "messageId": "6689f3ca210ed343339116d0",
  //     "reaction":"😍"
  // }

    const {messageId, reaction}=req.body
    await Message.updateOne({_id:messageId}, {reaction:reaction})

      res.status(200).send({
        message:await Message.findOne({_id:messageId})
      })

  },

  reply:async(req,res)=>{
  // {
  //     "replyMessageId": "6689f3ca210ed343339116d0",
  //     "text":"Reply to message 1, deneme1 content",
  //     "chatId":"6689f28f0b1efbdb235d1104"
  // }
    const {replyMessageId, text, chatId}=req.body
    const { name, avatar } = await User.findOne({ _id: req.user });

    const message=await Message.findOne({_id:replyMessageId})

    await Message.create({replyTo:message, text, chatId,sender: { name, avatar },
    })

    const chat = await Message.find({ chatId: { $in: chatId } });

    res.status(200).json(chat);
    
  },


  delete: async (req, res) => {
  //   {
  //     "messageId": "6689f900f22d2d8a84cc421e",
  //     "chatId":"6689f28f0b1efbdb235d1104"
  // }
    const { messageId, chatId } = req.body;

    const chat=await Chat.findOne({_id:chatId})
    const data = await Message.updateOne({ _id: messageId }, {text:"This message has been deleted.", reaction:"", replyTo:""});
    
    if(chat?.lastMessage?._id==messageId){
      await Chat.updateOne({_id:chatId}, {lastMessage:{text:"This message has been deleted.", reaction:"", replyTo:""}})
    }

    res.status(200).send({
      data:await Message.findOne({_id:messageId})
    });

  },
};
