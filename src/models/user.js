"use strict";

const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    full_name: {
      type: String,
      trim: true,
      required: true,
      unique: true,
      index: true,
    },

    password: {
      type: String,
      trim: true,
      required: true,
    },

    email: {
      type: String,
      trim: true,
      required: true,
      unique: true,
      index: true,
    },
    is_admin: {
      type: Boolean,
      default: false,
    },
  },
  { collection: "users", timestamps: true }
);
const passwordEncrypt = require("../helpers/passwordEncrypt");

UserSchema.pre(["save", "updateOne"], function (next) {
  const data = this?._update || this;

  const isEmailValidated = data.email
    ? /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(data.email)
    : true;

  if (isEmailValidated) {
    if (data?.password) {
      const isPasswordValidated =
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/.test(
          data.password
        );

      if (isPasswordValidated) {
        this.password = data.password = passwordEncrypt(data.password);
        this._update = data;
      } else {
        next(new Error("Password not validated."));
      }
    }

    next();
  } else {
    next(new Error("Email not validated."));
  }
});

module.exports = mongoose.model("User", UserSchema);
