"use strict";

const Room = require("../models/room");

module.exports = {
  list: async (req, res) => {
    const data = await Room.find();

    res.status(200).send(data);
  },

  create: async (req, res) => {
    const data = await Room.create(req.body);

    res.status(201).send({
      error: false,
      message: "Room created successfully",
      data,
    });
  },

  read: async (req, res) => {
    const data = await Room.findOne({ _id: req.params.id });

    res.status(200).send({
      error: false,
      data,
    });
  },

  update: async (req, res) => {
    const data = await Room.updateOne({ _id: req.params.id }, req.body, {
      runValidators: true,
    });

    res.status(202).send({
      error: false,
      data,
      new: await Room.findOne({ _id: req.params.id }),
    });
  },

  delete: async (req, res) => {
    const data = await Room.deleteOne({ _id: req.params.id });

    res.status(data.deletedCount ? 204 : 404).send({
      error: !data.deletedCount,
      data,
    });
  },
  getAvailableRooms: async (req, res) => {
    const { date } = req.query;

    if (!date) {
      return res.status(400).json({ message: "Date is required" });
    }

    const targetDate = new Date(date);

    const availableRooms = await Room.find({
      availability: { $elemMatch: { date: targetDate, isAvailable: true } },
    });

    res.status(200).json({
      message: "Available rooms fetched successfully",
      data: availableRooms,
    });
  },
  updateRoomAvailability: async (req, res) => {
    const { date, isAvailable } = req.body;

    const targetDate = new Date(date);

    const updatedRoom = await Room.findByIdAndUpdate(
      req.params.id,
      {
        $push: {
          availability: {
            date: targetDate,
            isAvailable,
          },
        },
      },
      { new: true }
    );

    if (!updatedRoom) {
      return res.status(404).json({ message: "Room not found" });
    }

    res.status(200).json({
      message: "Room availability updated successfully",
      data: updatedRoom,
    });
  },
};
