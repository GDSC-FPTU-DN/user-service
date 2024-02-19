const { APP_STRINGS } = require("../utils/constants");
const responseObject = require("../utils/response");

function userGuardMiddleware(roles) {
  // Inner function
  async function middleware(req, res, next) {
    // Return if request is un-authenticate
    if (!req.user) {
      throw new Error(
        APP_STRINGS.bug(
          "The 'userGuardMiddleware' must be called after 'authenticateMiddleware"
        )
      );
    }
    for (const role of roles) {
      // If role is admin
      if (role === "admin") {
        if (!req.user?.admin) {
          const userEmail = req.user?.email;
          return res
            .status(405)
            .send(responseObject(null, APP_STRINGS.notAllowedEmail(userEmail)));
        }
      }
      // If role is email. Format: email:example@gmail.com
      if (role.includes("email")) {
        const email = role.split(":")[1];
        // Include email from role
        if (req.user?.email !== email) {
          return res
            .status(405)
            .send(responseObject(null, APP_STRINGS.notAllowedEmail(email)));
        }
        // Exclude email from role
        if (role.includes("!")) {
          if (req.user?.email === email) {
            return res
              .status(405)
              .send(responseObject(null, APP_STRINGS.notAllowedEmail(email)));
          }
        }
      }
    }
    next();
  }
  return middleware;
}

module.exports = userGuardMiddleware;
