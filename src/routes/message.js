"use strict";
/* -------------------------------------------------------
    EXPRESSJS - DEFI Project
------------------------------------------------------- */
const router=require('express').Router()
const Message=require('../controllers/message')

router.post('/newmessage', Message.create)
router.put('/reaction', Message.addReaction)
router.patch('/reaction', Message.addReaction)
router.post('/reply', Message.reply)
router.delete('/delete', Message.delete)





module.exports = router;
