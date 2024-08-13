"use strict";
/* -------------------------------------------------------
    EXPRESSJS - DEFI Project
------------------------------------------------------- */
const router=require('express').Router()
const BMI=require('../controllers/bmi')

router.post('/', BMI.create)
router.delete('/delete/:BMIid', BMI.delete)
router.delete('/deleteall', BMI.deleteAll)
router.get('/list', BMI.list)




module.exports = router;
