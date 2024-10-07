"use strict";

const mongoose = require("mongoose");

const roomSchema = new mongoose.Schema(
  {
    roomNumber: {
      type: String,
      required: true,
      unique: true,
    },
    type: {
      type: String,
      enum: ["Basic", "Premium", "Suite"],
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    availability: [
      {
        date: {
          type: Date,
          required: true,
        },
        isAvailable: {
          type: Boolean,
          default: true,
        },
      },
    ],
  },
  { collection: "users", timestamps: true }
);

module.exports = mongoose.model("Room", roomSchema);
