"use strict";

const Chat = require("../models/chat");
const User = require("../models/user");

/* -------------------------------------------------------
    EXPRESSJS - DEFI Project
------------------------------------------------------- */

module.exports = {
  create: async (req, res) => {
    const userId = req.user
    const { secondId } = req.body

    const user=await User.findOne({_id:userId})
    const secondUser=await User.findOne({_id:secondId})

    try {
        const chat = await Chat.findOne({ memberId: { $all: [userId, secondId] } })

        if (chat) {
            return res.status(200).send({
                result: chat,
            })
        }else{
            const newChat = await Chat.create({memberId:[userId, secondId],  members: [user, secondUser], })
        
            res.status(200).json({
                result: newChat,
            })
        }
    } catch (error) {
        console.log(error);
        res.status(500).json(error)
    }
},


  findChats: async (req, res) => {
    const userId = req.user

    const chats = await Chat.find({ memberId: { $in: [userId] } })
    res.send({
        result:chats
    });
  },


  findAChat: async (req, res) => {
    const userId = req.user
    const {secondId}=req.params
    const chat = await Chat.find({ memberId: { $in: [userId, secondId] } })

    res.send({
        result:chat
    });
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
