"use strict";

const Booking = require("../models/booking");
const Room = require("../models/room");

module.exports = {
  list: async (req, res) => {
    const data = await Booking.find();

    res.status(200).send(data);
  },

  create: async (req, res) => {
   
      const { room, startDate, endDate } = req.body; 
  
      const roomDetails = await Room.findById(room);
      if (!roomDetails) {
        return res.status(404).json({ message: "Room not found" });
      }
  
      const isAvailable = roomDetails.availability.some((availability) => {
        const date = new Date(availability.date).getTime();
        const start = new Date(startDate).getTime();
        const end = new Date(endDate).getTime();
  
        return date >= start && date <= end && availability.isAvailable;
      });
  console.log(isAvailable);
      if (!isAvailable) {
        return res
          .status(400)
          .json({ message: "Room is not available for the selected dates" });
      }
  
      const data = await Booking.create(req.body);
  
      roomDetails.availability = roomDetails.availability.map((availability) => {
        const date = new Date(availability.date).getTime();
        const start = new Date(startDate).getTime();
        const end = new Date(endDate).getTime();
  
        if (date >= start && date <= end) {
          return { ...availability, isAvailable: false };
        }
        return availability;
      });
  
      await roomDetails.save();
  
      res.status(201).send({
        error: false,
        message: "Booking created successfully",
        data,
      });
    
  }
  ,

  read: async (req, res) => {
    const data = await Booking.findOne({ _id: req.params.id });

    res.status(200).send({
      error: false,
      data,
    });
  },

  update: async (req, res) => {
    const data = await Booking.updateOne({ _id: req.params.id }, req.body, {
      runValidators: true,
    });

    res.status(202).send({
      error: false,
      data,
      new: await Booking.findOne({ _id: req.params.id }),
    });
  },

  delete: async (req, res) => {
    const booking = await Booking.findByIdAndDelete(req.params.id);

    const roomDetails = await Room.findById(booking.room);

    roomDetails.availability = roomDetails.availability.map((availability) => {
      const date = new Date(availability.date).getTime();
      const start = new Date(booking.startDate).getTime();
      const end = new Date(booking.endDate).getTime();

      if (date >= start && date <= end) {
        return { ...availability, isAvailable: true };
      }
      return availability;
    });
    await roomDetails.save();

    res.status(200).json({
      message: "Booking canceled successfully",
      booking,
    });
  },
  getUserBookings: async (req, res) => {
    const bookings = await Booking.find({ user: req.params.id }).populate(
      "room"
    );
    res.status(200).json({
      message: "Bookings fetched successfully",
      data: bookings,
    });
  },
};
