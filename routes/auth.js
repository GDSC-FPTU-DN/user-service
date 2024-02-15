const express = require("express");
const passport = require("passport");
const authenticateMiddleware = require("../middlewares/authenticate.middleware");
const responseObject = require("../utils/response");
const { getUserByAccessToken } = require("../services/googleAuth.service");
const {
  updateOrCreateUser,
} = require("../controllers/updateOrCreateUser.controller");
const { generateToken } = require("../services/jwt.service");
const { APP_STRINGS } = require("../utils/constants");
require("../services/passport.service");

const router = express.Router();

// Login with Google endpoints
router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
  })
);

// Callback URL for Google
router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/api/auth/google" }),
  (req, res) => {
    res.send(
      `<script>window.opener.postMessage('Redirecting', '*'); window.close();</script>`
    );
  }
);

// Verify access-token from Google
router.post("/verify-access-token", async (req, res, next) => {
  const { token } = req.body;
  const payload = await getUserByAccessToken(token);
  if (!payload) {
    res.status(401).send(responseObject(null, APP_STRINGS.invalidAccessToken));
    return;
  }
  // Update User info
  const user = await updateOrCreateUser(
    payload.email,
    payload.name,
    payload.picture
  );
  // Register session
  req.session.user = user;
  const responseData = {
    token: generateToken(req.session.id),
    user: user,
  };
  res
    .status(200)
    .send(responseObject(responseData, APP_STRINGS.verifiedAccessToken));
});

// Verify if token from authorization header is valid. Used for third-party service.
router.get("/verify", authenticateMiddleware, function (req, res, next) {
  res.status(200).send(responseObject(true, APP_STRINGS.authorize));
});

// OTP
router.post(
  "/verify-otp",
  authenticateMiddleware,
  async (req, res, next) => {}
);

// Authorize user
router.get("/me", authenticateMiddleware, async (req, res, next) => {
  res.status(200).send(responseObject(req.user));
});

// Logout
router.get("/logout", authenticateMiddleware, (req, res) => {
  const userId = req.user?.id;
  req.session.destroy();
  res.status(200).send(responseObject(null, APP_STRINGS.logout(userId)));
});

module.exports = router;
