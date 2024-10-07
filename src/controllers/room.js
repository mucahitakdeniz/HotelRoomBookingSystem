"use strict";

const Room = require("../models/room");
const Booking = require("../models/booking");


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
    const { startDate, endDate, type } = req.query;
  
    if (!startDate || !endDate) {
      return res.status(400).json({ message: "Start date and end date are required" });
    }
  
    try {
      const start = new Date(startDate);
      const end = new Date(endDate);
  
      const bookedRooms = await Booking.find({
        $or: [
          { startDate: { $lte: end }, endDate: { $gte: start } }
        ]
      }).select("room");
  
      const bookedRoomIds = bookedRooms.map((booking) => booking.room.toString());
  
      const query = { _id: { $nin: bookedRoomIds } };
  
      if (type) {
        query.type = type;
      }
  
      const availableRooms = await Room.find(query);
  
      return res.status(200).json({
        message: "Available rooms fetched successfully",
        data: availableRooms,
      });
    } catch (error) {
      return res.status(500).json({
        message: "An error occurred while fetching available rooms",
        error: error.message,
      });
    }
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
