"use strict";
/* -------------------------------------------------------
    EXPRESSJS - DEFI Project
------------------------------------------------------- */
const router=require('express').Router()
const Comment=require('../controllers/comment')

router.post('/:blogId', Comment.create)
router.put('/update', Comment.update)
router.delete('/delete', Comment.delete)
router.get('/read', Comment.read)




module.exports = router;
