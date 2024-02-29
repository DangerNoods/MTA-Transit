const User = require('./schemaModel');

const userController = {};

userController.isLoggedIn = (req, res, next) => {
  if (req.user) {
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
