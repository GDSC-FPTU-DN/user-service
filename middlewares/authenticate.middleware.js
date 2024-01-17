const { verifyToken } = require("../services/jwt.service");
const { promisify } = require("util");
const { getSessionData } = require("../services/sessionFile.service");

async function authenticateMiddleware(req, res, next) {
  // Get the user from session
  let user = req.session.user;
  const token = req.headers.authorization?.split(" ")[1];
  if (!user && token !== "undefined") {
    const sessionId = verifyToken(token);
    // Add session id to request
    req.sessionId = sessionId;
    // Get the user from session
    const sessionData = await getSessionData(req.sessionStore, sessionId);
    if (sessionData) {
      user = sessionData.user;
    }
  }
  if (!user && !token) {
    res.status(401).send("Unauthorized");
    return;
  }
  // Add user to request
  req.user = user;
  next();
}

module.exports = authenticateMiddleware;
