"use strict";

const router = require("express").Router();

const booking = require("../controllers/booking");
const { isAdminOrOwner, isAdmin } = require("../middlewares/permissions");

router.route("/").get(booking.list).post(isAdmin, booking.create);

router
  .route("/:id")
  .get(booking.read)
  .put(isAdmin, booking.update)
  .patch(isAdmin, booking.update)
  .delete(isAdmin, booking.delete);

router.route("/user/:id").get(isAdminOrOwner,booking.getUserBookings);

module.exports = router;
