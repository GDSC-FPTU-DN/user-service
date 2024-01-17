const { UserSchema } = require("../models/user.model");

async function updateUserNameByEmail(email, userName) {
  const id = (await UserSchema.findOne("email", email)).id;
  await UserSchema.update(id, {
    userName: userName,
  });
}

module.exports = {
  updateUserNameByEmail,
};
