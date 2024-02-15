const { APP_STRINGS } = require("../utils/constants");
const responseObject = require("../utils/response");

function userGuardMiddleware(roles) {
  // Inner function
  async function middleware(req, res, next) {
    // Return if request is un-authenticate
    if (!req.user) {
      return res
        .status(401)
        .send(responseObject(null, APP_STRINGS.unAuthorize));
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
      if (role.includes("email")) {
        let email = role.split(":")[1];
        if (email === "REF_USER_EMAIL") {
          email = req.user?.email;
        }
        // Include email
        if (req.user?.email !== email) {
          return res
            .status(405)
            .send(responseObject(null, APP_STRINGS.notAllowedEmail(email)));
        }
        // Exclude email
        if (role.includes("!") && req.user?.email === email) {
          return res
            .status(405)
            .send(responseObject(null, APP_STRINGS.notAllowedEmail(email)));
        }
      }
    }
    next();
  }
  return middleware;
}

module.exports = userGuardMiddleware;
