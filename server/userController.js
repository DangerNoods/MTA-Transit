const User = require('../models/userModel');

const userController = {};

userController.verifyUser = (req, res, next) => {};

userController.isLoggedIn = (req, res, next) => {
  if (req.session.userId) {
    next();
  } else {
    next({
      log: 'error caught on userController.isLoggedIn',
      status: 401,
      message: 'Unauthorized',
    });
  }
};

module.exports = userController;
