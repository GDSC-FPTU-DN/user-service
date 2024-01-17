const { UserSchema } = require("../models/user.model");

async function deleteUserByEmail(email) {
  const id = (await UserSchema.findOne("email", email)).id;
  await UserSchema.delete(id);
}

async function deleteUserById(id) {
  await UserSchema.delete(id);
}

module.exports = {
  deleteUserByEmail,
  deleteUserById,
};
