"use strict";
/* -------------------------------------------------------
    EXPRESSJS - DEFI Project
------------------------------------------------------- */
const router=require('express').Router()
const Chat=require('../controllers/chat')
const permissions =require('../middlewares/permissions')

router.post('/newchat', permissions.isLogin, Chat.create)
router.get('/findchats', permissions.isLogin, Chat.findChats)
router.get('/findchat/:secondId', permissions.isLogin, Chat.findAChat)
router.delete('/deletechat', permissions.isLogin, Chat.delete)




module.exports = router;
