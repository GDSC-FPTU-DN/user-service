require("dotenv").config();
const { EXPIRED_TIME } = require("../utils/constants");

const session = require("express-session");
const sessionFileConfig = require("./sessionFile.config");
const FileStore = require("session-file-store")(session);

const sessionConfig = {
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
  store: new FileStore(sessionFileConfig),
  cookie: {
    maxAge: EXPIRED_TIME,
    httpOnly: true,
    secure: true,
    sameSite: "none",
  },
};

module.exports = sessionConfig;
