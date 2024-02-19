const APP_NAME = "gdsc-user-service";
const MASTER_EMAIL = "gdsc.fptudn@gmail.com";
const EXPIRED_TIME = 1000 * 60 * 60 * 24;
const CACHE_EXPIRED_TIME = 60 * 60;
const CORS_DOMAINS = [
  "http://localhost:5173",
  "https://portfolio-site-demo.vercel.app",
];
const APP_STRINGS = {
  authorize: "Verified request.",
  unAuthorize:
    "This request is un-authorized. No cookie or authorization found!",
  invalidAccessToken: "This access-token is invalid or expired.",
  verifiedAccessToken: "Access-token verified.",
  logout: (id) => `User ${id} logged out.`,
  notAllowedEmail: (email) => `Not allowed email: ${email}.`,
  userNotFound: (id) => `User with id: ${id} not found in Firebase Database.`,
  createdUser: (id) => `Created user with id: ${id}.`,
  updateSuccess: (id) => `Updated user with id: ${id}.`,
  deleteSuccess: (id) => `Deleted user with id: ${id}.`,
  userNameAvailable: (userName) => `User name: ${userName} is available.`,
  userNameNotAvailable: (userName) =>
    `User name: ${userName} is not available.`,
  emailRequired: "Email is required!",
  emptyVariable: (name) => `Variable '${name}' is undefined!`,
  wrongTypeVariable: (name, expectType, foundType) =>
    `Variable ${name} must be ${expectType}, but found ${foundType}.`,
  bug: (message) => `Bug from development: ${message}`,
};
const PLACEHOLDER_AVATAR = "https://i.pravatar.cc/100";

module.exports = {
  APP_NAME,
  MASTER_EMAIL,
  EXPIRED_TIME,
  CACHE_EXPIRED_TIME,
  CORS_DOMAINS,
  APP_STRINGS,
  PLACEHOLDER_AVATAR,
};
