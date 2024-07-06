"use strict";
/* -------------------------------------------------------
    EXPRESSJS - DEFI Project
------------------------------------------------------- */
const router=require('express').Router()
const Chat=require('../controllers/chat')

router.post('/newchat', Chat.create)
router.get('/findchats', Chat.findChats)
router.get('/findchat/:secondId', Chat.findAChat)
router.delete('/deletechat', Chat.delete)




module.exports = router;
