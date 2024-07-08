"use strict";
/* -------------------------------------------------------
    EXPRESSJS - DEFI Project
------------------------------------------------------- */
const router=require('express').Router()
const blog=require('../controllers/blog')

router.post('/create', blog.create)
router.post('/like', blog.like)
router.get('/list', blog.list)
router.get('/:blogId', blog.read)
router.put('/update/:blogId', blog.update)
router.patch('/update/:blogId', blog.update)
router.delete('/delete/:blogId', blog.delete)



module.exports = router;
