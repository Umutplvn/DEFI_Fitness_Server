"use strict";
/* -------------------------------------------------------
    EXPRESSJS - DEFI Project
------------------------------------------------------- */
const router=require('express').Router()
const Profile=require('../controllers/profile')
const permissions =require('../middlewares/permissions')

router.route('/').post(Profile.create)
router.route('/:userId').get(permissions.isOwn, Profile.read)
router.route('/delete').delete(permissions.isOwn, Profile.delete)



module.exports = router;
