const { UserSchema } = require("../models/user.model");
const { checkAllowedEmail } = require("../utils/emails");

async function getUserByEmail(email) {
  if (!checkAllowedEmail(email)) {
    return null;
  }
  return await UserSchema.findOne("email", email);
}

async function getUserByUserName(userName) {
  return await UserSchema.findOne("userName", userName);
}

async function getAllUsers() {
  return await UserSchema.getAll();
}

async function getUserById(id) {
  return await UserSchema.getById(id);
}

module.exports = {
  getUserByEmail,
  getUserByUserName,
  getAllUsers,
  getUserById,
};
