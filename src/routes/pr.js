"use strict";
/* -------------------------------------------------------
    EXPRESSJS - DEFI Project
------------------------------------------------------- */
const router=require('express').Router()
const PR=require('../controllers/PR')

router.post('/', PR.create)
router.delete('/delete/:PRid', PR.delete)
router.get('/list', PR.list)




module.exports = router;
