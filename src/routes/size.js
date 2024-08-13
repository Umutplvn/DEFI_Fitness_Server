"use strict";
/* -------------------------------------------------------
    EXPRESSJS - DEFI Project
------------------------------------------------------- */
const router=require('express').Router()
const Size=require('../controllers/size')

router.post('/', Size.create)
router.delete('/delete/:sizeId', Size.delete)
router.delete('/deleteall', Size.deleteAll)
router.get('/list', Size.list)



module.exports = router;
