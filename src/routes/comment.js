"use strict";
/* -------------------------------------------------------
    EXPRESSJS - DEFI Project
------------------------------------------------------- */
const router=require('express').Router()
const Comment=require('../controllers/comment')
const permissions =require('../middlewares/permissions')

router.post('/:blogId', permissions.isLogin, Comment.create)
router.put('/update', Comment.update)
router.delete('/delete', Comment.delete)
router.get('/read', Comment.read)




module.exports = router;
