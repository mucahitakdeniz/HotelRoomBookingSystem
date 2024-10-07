"use strict";

const User = require("../models/user");
const Token = require("../models/token");
const passwordEncrypt = require("../helpers/passwordEncrypt");

module.exports = {
  list: async (req, res) => {
    const data = await User.find();

    res.status(200).send(data);
  },

  create: async (req, res) => {
    if (!req?.user?.is_admin) {
      req.body.is_admin = false;
    }
    const data = await User.create(req.body);
    const tokenData = await Token.create({
      user_id: data._id,
      token: passwordEncrypt(data._id + Date.now()),
    });
    delete data._doc.password;


    res.status(201).send({
      error: false,
      data,
      token: tokenData.token,
    });
  },

  read: async (req, res) => {
    const data = await User.findOne({ _id: req.params.id });

    res.status(200).send({
      error: false,
      data,
    });
  },

  update: async (req, res) => {
    if (!req.user.is_admin) {
      req.body.is_admin = false;
    }
    const data = await User.updateOne({ _id: req.params.id }, req.body, {
      runValidators: true,
    });

    res.status(202).send({
      error: false,
      data,
      new: await User.findOne({ _id: req.params.id }),
    });
  },

  delete: async (req, res) => {
    const data = await User.deleteOne({ _id: req.params.id });

    res.status(data.deletedCount ? 204 : 404).send({
      error: !data.deletedCount,
      data,
    });
  },
};
