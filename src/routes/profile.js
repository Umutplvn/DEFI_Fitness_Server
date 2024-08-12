"use strict";
/* -------------------------------------------------------
    EXPRESSJS - DEFI Project
------------------------------------------------------- */
const router=require('express').Router()
const Profile=require('../controllers/profile')
const permissions =require('../middlewares/permissions')

router.route('/').post(Profile.create)
router.route('/:userId').get(Profile.read)
router.route('/delete').delete(Profile.delete)



module.exports = router;
