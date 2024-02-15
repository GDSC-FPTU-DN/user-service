const { UserSchema } = require("../models/user.model");
const { APP_STRINGS, PLACEHOLDER_AVATAR } = require("../utils/constants");
const { getToday } = require("../utils/utilities");

async function createUser(data) {
  if (!data) {
    throw Error(APP_STRINGS.emptyVariable("data"));
  }
  // Get required field
  const email = data.email;
  if (!email) {
    throw Error(APP_STRINGS.emailRequired);
  }
  // Get optional field
  const name = data.name ?? "";
  const avatar = data.avatar ?? PLACEHOLDER_AVATAR;
  const userName = data.userName ?? "";
  return await UserSchema.create({
    name,
    email,
    avatar,
    userName,
    admin: false,
    createDate: getToday(),
  });
}

module.exports = {
  createUser,
};
