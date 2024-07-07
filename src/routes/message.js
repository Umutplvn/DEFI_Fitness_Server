"use strict";
/* -------------------------------------------------------
    EXPRESSJS - DEFI Project
------------------------------------------------------- */
const router=require('express').Router()
const Message=require('../controllers/message')

router.post('/newmessage', Message.create)





module.exports = router;
