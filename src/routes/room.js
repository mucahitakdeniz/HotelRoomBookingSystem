"use strict";

const router = require("express").Router();

const room = require("../controllers/room");

router.route("/").get(room.list).post(room.create);

router
  .route("/:id")
  .get(room.read)
  .put(room.update)
  .patch(room.update)
  .delete(room.delete);

router.route("/availability").get(room.getAvailableRooms);
router.route("/availability/:id").get(room.updateRoomAvailability);

module.exports = router;
