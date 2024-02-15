const { verifyToken } = require("../services/jwt.service");
const { getSessionData } = require("../services/sessionFile.service");
const { APP_STRINGS } = require("../utils/constants");
const responseObject = require("../utils/response");

async function authenticateMiddleware(req, res, next) {
  // Get the user from session
  let user = req.session.user;
  const token = req.headers.authorization?.split(" ")[1];

  // If user not found in session cookie, use token from authorization header.
  if (!user && token) {
    const sessionId = verifyToken(token);
    // Add session id to request
    req.sessionId = sessionId;
    // Get the user from session
    const sessionData = await getSessionData(req.sessionStore, sessionId);
    if (sessionData) {
      user = sessionData.user;
    }
  }

  // If user not found in session cookie, or token not in authorization header.
  // If token is available, token will be parse to get user. After that process,
  // return 401 if user still not found.
  if (!user || !token) {
    return res.status(401).send(responseObject(null, APP_STRINGS.unAuthorize));
  }

  // Add user to request
  req.user = user;
  next();
}

module.exports = authenticateMiddleware;
