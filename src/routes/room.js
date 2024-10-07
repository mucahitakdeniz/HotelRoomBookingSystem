"use strict";

const router = require("express").Router();

const room = require("../controllers/room");
const {isAdmin } = require("../middlewares/permissions");

router.route("/").get(room.list).post(isAdmin, room.create);

router
  .route("/:id")
  .get(room.read)
  .put(isAdmin, room.update)
  .patch(isAdmin, room.update)
  .delete(isAdmin, room.delete);

router.route("/availability").get(room.getAvailableRooms);
router.route("/availability/:id").get(room.updateRoomAvailability);

module.exports = router;
