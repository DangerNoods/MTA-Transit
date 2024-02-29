require('dotenv').config();

const path = require('path');
const express = require('express');
const session = require('express-session');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

const app = express(); //invoke framework
const PORT = 3000;
const clientId = '201959444032-a940k1h8ha9gq25hsc9j0uvf62ooe9fa.apps.googleusercontent.com';
const clientSecert = process.env.CLIENT_SECERT;

const apiController = require('./apiController');

app.use(express.json()); //app.use catches every signal regardless of method (get, patch, put, post, delete) we will parse json (data form between languages)

app.use(express.static(path.resolve(__dirname, '../public/index.html'))); //serving bundled static files

//setting up Google OAuth
app.use(session({ secret: 'your session secret', resave: false, saveUninitialized: false })); // Session config
app.use(passport.initialize());
app.use(passport.session());

passport.use(
  new GoogleStrategy(
    {
      clientID: clientId,
      clientSecret: clientSecert,
      callbackURL: 'http://localhost:3000/callback',
    },
    (accessToken, refreshToken, profile, done) => {
      //handle user data recieved from Google
      console.log('Google Profile:', profile);
      return done(null, profile);
    }
  )
);

// passport serialization
passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((user, done) => done(null, user));

//handles request from frontend
app.get('/', (req, res) => {
  return res.status(200).sendFile(path.resolve(__dirname, '../public/index.html'));
});

//Authentication routes
app.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
// change the routes accordingly
app.get('/callback', passport.authenticate('google', { failureRedirect: '/login' }), (req, res) => {
  res.redirect('http://localhost:3000/profile');
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

// app.get('/*', function (req, res) {
//   res.sendFile(path.resolve(__dirname, '../public/index.html'), function (err) {
//     if (err) {
//       res.status(500).send(err);
//     }
//   });
// });

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
