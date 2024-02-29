require('dotenv').config();

const path = require('path');
const express = require('express');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const session = require('express-session');
const MongoStore = require('connect-mongo').default;
const User = require('./schemaModel');

const app = express(); //invoke framework
const PORT = 3000;
const clientId = '201959444032-a940k1h8ha9gq25hsc9j0uvf62ooe9fa.apps.googleusercontent.com';
const clientSecert = process.env.CLIENT_SECERT;
const dbPassword = process.env.MONGODB_PW;

const apiController = require('./apiController');
const userController = require('./userController');

app.use(express.json()); //app.use catches every signal regardless of method (get, patch, put, post, delete) we will parse json (data form between languages)

app.use(express.static(path.resolve(__dirname, '../public/index.html'))); //serving bundled static files

//setting up Google OAuth
const sessionStore = new MongoStore({
  client: dbConnection.getClient(),
  collection: 'sessions',
  ttl: 14 * 24 * 60 * 60,
});
app.use(cors());
app.use(session({ secret: 'your session secret', resave: false, saveUninitialized: false, store: sessionStore })); // Session config
app.use(passport.initialize());
app.use(passport.session());

// FrSadoGCS3iw1joN

//setting up mongoDB
const mongoose = require('mongoose');
// const dbController = require ('./dbController')
mongoose.connect('mongodb+srv://dwong92:' + dbPassword + '@mta.qmbhwkj.mongodb.net/?retryWrites=true&w=majority&appName=MTA', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
mongoose.connection.once('open', () => {
  console.log('Connected to Database');
});

passport.use(
  new GoogleStrategy(
    {
      clientID: clientId,
      clientSecret: clientSecert,
      callbackURL: 'http://localhost:3000/callback',
    },
    async (req, accessToken, refreshToken, profile, done) => {
      //handle user data recieved from Google
      console.log('Google Profile:', profile);

      //must require mongoose model in this file
      const user = await User.findOne({ email: profile.email });

      if (user) {
        console.log('User Found', user);
        user.accessToken = accessToken;
        //finding existing user from DB
        User.updateOne({ _id: user._id }, { $set: { accessToken: accessToken } })
          .then(() => {
            console.log('Access token updated in database');
            req.session.userId = user._id;
            return done(null, user);
          })
          .catch((err) => console.log('error in passport.use when trying to update the user with the new accesstoken:' + err));
      } else {
        // if no user found, adding the user to our DB
        const newUser = {
          name: profile.displayName,
          email: profile.email,
          accessToken: accessToken,
        };
        User.insertOne(newUser)
          .then((newUserData) => {
            console.log('New user created: ', newUserData);
            req.session.userId = newUserData._id;
            return done(null, newUserData);
          })
          .catch((err) => console.log('error in passport.use when trying to insert new user:' + err));
      }
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
app.get('/callback', passport.authenticate('google', { failureRedirect: '/' }), (req, res) => {
  res.redirect('http://localhost:3000/preferences');
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
