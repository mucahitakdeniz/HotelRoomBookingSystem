"use strict";

const router = require("express").Router();

const user = require("../controllers/user");

const { isAdmin, isAdminOrOwner } = require("../middlewares/permissions");

router.route("/").get(isAdmin, user.list).post(user.create);

router
  .route("/:id")
  .get(isAdminOrOwner, user.read)
  .put(isAdminOrOwner, user.update)
  .patch(isAdminOrOwner, user.update)
  .delete(isAdminOrOwner, user.delete);

module.exports = router;
