"use strict";
/* -------------------------------------------------------
    EXPRESSJS - DEFI Project
------------------------------------------------------- */
const router=require('express').Router()
const Message=require('../controllers/message')
const permissions =require('../middlewares/permissions')

router.post('/newmessage', permissions.isLogin, Message.create)
router.put('/reaction', permissions.isLogin, Message.addReaction)
router.patch('/reaction', permissions.isLogin, Message.addReaction)
router.post('/reply', permissions.isLogin, Message.reply)
router.put('/delete', permissions.isLogin, Message.delete)
router.patch('/delete', permissions.isLogin, Message.delete)





module.exports = router;
