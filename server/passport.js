const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('./schemaModel');

const clientId = '201959444032-a940k1h8ha9gq25hsc9j0uvf62ooe9fa.apps.googleusercontent.com';
const clientSecert = process.env.CLIENT_SECERT;

// passport serialization
passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((user, done) => done(null, user));

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
