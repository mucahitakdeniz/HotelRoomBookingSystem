"use strict";

const router = require("express").Router();

const auth = require("../controllers/auth");
const { isLogin } = require("../middlewares/permissions");

router.route("/login").post(auth.login);
router.route("/logout").post(isLogin, auth.logout);
router.route("/logout").get(isLogin, auth.logout);

module.exports = router;
