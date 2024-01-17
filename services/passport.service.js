const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
require("dotenv").config();
const {
  updateOrCreateUser,
} = require("../controllers/updateOrCreateUser.controller");
const { extractFromGoogleProfile } = require("../utils/profileHandler");
const { APP_DOMAIN } = require("../utils/constants");

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLOUD_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLOUD_CLIENT_SECRET,
      callbackURL: `${APP_DOMAIN}/api/auth/google/callback`,
    },
    async (token, tokenSecret, profile, done) => {
      const { email, name, avatar } = extractFromGoogleProfile(profile);
      await updateOrCreateUser(email, name, avatar);
      return done(null, profile);
    },
  ),
);

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});
