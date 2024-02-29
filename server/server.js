require('dotenv').config();

const path = require('path');
const express = require('express');
const passport = require('passport');
const session = require('express-session');
const cookieSession = require('cookie-session');
require('./passport');

const app = express(); //invoke framework
const PORT = 3000;
const MONGODB_PW = process.env.MONGODB_PW;

const apiController = require('./apiController');
const userController = require('./userController');

app.use(express.json()); //app.use catches every signal regardless of method (get, patch, put, post, delete) we will parse json (data form between languages)

app.use(express.static(path.resolve(__dirname, '../public/index.html'))); //serving bundled static files

//setting up mongoDB
const mongoose = require('mongoose');
// const dbController = require ('./dbController')
mongoose.connect(`mongodb+srv://dwong92:${MONGODB_PW}@mta.qmbhwkj.mongodb.net/?retryWrites=true&w=majority&appName=MTA`, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
mongoose.connection.once('open', () => {
  console.log('Connected to Database');
});

//setting up Google OAuth

app.use(
  cookieSession({
    name: 'google-auth-session',
    keys: ['key1', 'key2'],
  })
);
app.use(passport.initialize());
app.use(passport.session());

//handles request from frontend
app.get('/', (req, res) => {
  return res.status(200).sendFile(path.resolve(__dirname, '../public/index.html'));
});

//Authentication routes
app.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

// change the routes accordingly
app.get('/callback', passport.authenticate('google', { failureRedirect: '/' }), (req, res) => {
  res.redirect('/preferences');
});

// handles request from frontend for API data
app.get('/subway', apiController.getSubwayInfo, (req, res) => {
  console.log(`inside of /subway route`);
  res.status(200).json(res.locals.data);
});

//handles request to get accessiblity XML.
app.get('/accessibility', apiController.getAccInfo, (req, res) => {
  console.log('inside of /accessiblity route');
  res.status(200).json(res.locals.data);
});

app.get('/preferences', userController.isLoggedIn, (req, res) => {
  res.status(200).json({ message: 'Welcome, authenticated user!' });
});

// handle undesignated paths
app.use('*', (req, res) => {
  res.sendStatus(404);
});

//Global error handler
app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 500,
    message: { err: 'An error occurred' },
  };
  const errorObj = Object.assign({}, defaultErr, err);
  console.log(errorObj.log);
  return res.status(errorObj.status).json(errorObj.message);
});

app.listen(PORT, () => console.log(`Listening on PORT: ${PORT}`));

module.exports = app;
