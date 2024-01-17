const EXPIRED_TIME = 1000 * 60 * 60 * 24;
const SUPPORT_DOMAINS = [];
const APP_DOMAIN = "https://88456n-3000.csb.app";
const APP_STRINGS = {
  notAllowedEmail: (email) => `Not allowed email: ${email}`,
  userNotFound: (id) => `User with id: ${id} not found in Firebase Database`,
  updateSuccess: (email) => `Updated user with email: ${email}`,
  deleteSuccess: (email) => `Deleted user with email: ${email}`,
  userNameAvailable: (userName) => `User name: ${userName} is available`,
  userNameNotAvailable: (userName) => `User name: ${userName} is not available`,
};

const DOC_TEMPLATE = `
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>GDSC User Service</title>
  </head>
  <body>
    <img src="https://seeklogo.com/images/G/google-developers-logo-F8BF3155AC-seeklogo.com.png" alt="logo" width="100">
    <h1>GDSC User Back-end Service</h1>
    <span>Served URL: </span>
    <a href="${APP_DOMAIN}">${APP_DOMAIN}</a>
  </body>
</html>
`;

module.exports = {
  EXPIRED_TIME,
  SUPPORT_DOMAINS,
  APP_DOMAIN,
  APP_STRINGS,
  DOC_TEMPLATE,
};
