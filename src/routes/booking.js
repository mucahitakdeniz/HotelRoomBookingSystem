"use strict";

const router = require("express").Router();

const booking = require("../controllers/booking");

router.route("/").get(booking.list).post(booking.create);

router
  .route("/:id")
  .get(booking.read)
  .put(booking.update)
  .patch(booking.update)
  .delete(booking.delete);

router.route("/user/:id").get(booking.getUserBookings);

module.exports = router;
