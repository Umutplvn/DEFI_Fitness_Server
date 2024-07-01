"use strict";
/* -------------------------------------------------------
    EXPRESSJS - DEFI Project
------------------------------------------------------- */
const router=require('express').Router()
const Profile=require('../controllers/profile')

router.post('/', Profile.create)
router.get('/:userId', Profile.read)
router.put('/update/:userId', Profile.update)




module.exports = router;
