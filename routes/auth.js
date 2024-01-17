const express = require("express");
const passport = require("passport");
const authenticateMiddleware = require("../middlewares/authenticate.middleware");
const responseObject = require("../utils/response");
const { getUserByAccessToken } = require("../services/googleAuth.service");
const {
  updateOrCreateUser,
} = require("../controllers/updateOrCreateUser.controller");
const { generateToken } = require("../services/jwt.service");
require("../services/passport.service");

const router = express.Router();

// Login with Google endpoints
router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
  }),
);

// Callback URL for Google
router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/api/auth/google" }),
  (req, res) => {
    res.send(
      `<script>window.opener.postMessage('Redirecting', '*'); window.close();</script>`,
    );
  },
);

router.post("/verify", async (req, res, next) => {
  const { token } = req.body;
  const payload = await getUserByAccessToken(token);
  if (!payload) {
    res.status(401).send(responseObject(null, "Invalid token"));
    return;
  }
  // Update User info
  const user = await updateOrCreateUser(
    payload.email,
    payload.name,
    payload.picture,
  );
  // Register session
  req.session.user = user;
  const responseData = {
    token: generateToken(req.session.id),
    user: user,
  };
  res.status(200).send(responseObject(responseData, "Token verified"));
});

// Authorize services
router.get("/me", authenticateMiddleware, async (req, res, next) => {
  const user = req.user;

  if (!user) {
    res.status(401).send(`Email ${user?.email} is not allowed`);
    return;
  }

  res.status(200).send(responseObject(user));
});

router.get("/logout", (req, res) => {
  req.session.destroy();
  res.status(200).send(responseObject(null, "Logged out"));
});

module.exports = router;
