"use strict";

module.exports = {
  isLogin: (req, res, next) => {
    if (req.user) {
      next();
    } else {
      res.errorStatusCode = 403;
      throw new Error("NoPermission: You must login.");
    }
  },
  isAdmin: (req, res, next) => {
    if (req.user) {
      if (req.user.is_admin) {
        next();
      } else {
        throw new Error("NoPermission: You nust to be Admin.");
      }
    } else {
      res.errorStatusCode = 403;
      throw new Error("NoPermission: You must login.");
    }
  },
  isAdminOrOwner: (req, res, next) => {
    if (req.user) {
      if (req.user.is_admin) {
        next();
      } else if (req.user._id === req.params.id) {
        next();
      } else {
        throw new Error("NoPermission: You nust to be Admin or accout owner.");
      }
    } else {
      res.errorStatusCode = 403;
      throw new Error("NoPermission: You must login.");
    }
  },
};
