"use strict";

const User = require("../models/user");
const Token = require("../models/token");
const passwordEncrypt = require("../helpers/passwordEncrypt");

module.exports = {
  login: async (req, res) => {
    const { email, password } = req.body;

    if (email && password) {
      const user = await User.findOne({ email: email });

      if (user && user.password == passwordEncrypt(password)) {
        let tokenData = await Token.findOne({ user_id: user._id });
        if (!tokenData)
          tokenData = await Token.create({
            user_id: user._id,
            token: passwordEncrypt(user._id + Date.now()),
          });

        delete user._doc.password;
        res.send({
          error: false,
          token: token,
          user,
        });
      } else {
        res.errorStatusCode = 401;
        throw new Error("Wrong email or password.");
      }
    } else {
      res.errorStatusCode = 401;
      throw new Error("Please enter email and password.");
    }
  },

  logout: async (req, res) => {
    const auth = req.headers?.authorization || null;
    const tokenKey = auth ? auth.split(" ") : null;

    if (tokenKey) {
      if (tokenKey[0] == "Token") {
        result = await Token.deleteOne({ token: tokenKey[1] });
      }
    }

    res.send({
      error: false,
      message : "Token deleted. Logout was OK.",
      result,
    });
  },
};
