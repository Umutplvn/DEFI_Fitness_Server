"use strict";
/* -------------------------------------------------------
    EXPRESSJS - DEFI Project
------------------------------------------------------- */
const router = require("express").Router();
const User = require("../controllers/user");

router.route("/users").get(User.list);
router.route("/register").post(User.create);

router
  .route("/users/:userId")
  .get(User.read)
  .put(User.update)
  .delete(User.delete);

module.exports = router;
