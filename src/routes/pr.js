"use strict";
/* -------------------------------------------------------
    EXPRESSJS - DEFI Project
------------------------------------------------------- */
const router=require('express').Router()
const PR=require('../controllers/PR')

router.post('/', PR.create)
router.delete('/delete/:PRid', PR.delete)
router.delete('/deleteall', PR.deleteAll)
router.get('/list', PR.list)




module.exports = router;
