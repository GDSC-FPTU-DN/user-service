const { UserSchema } = require("../models/user.model");
const { APP_STRINGS } = require("../utils/constants");

async function updateUserNameById(id, userName) {
  await UserSchema.update(id, {
    userName: userName,
  });
}

async function updateIsAdminRoleById(id, isAdmin) {
  if (typeof isAdmin !== "boolean") {
    throw Error(
      APP_STRINGS.wrongTypeVariable("isAdmin", "boolean", typeof isAdmin)
    );
  }
  await UserSchema.update(id, {
    admin: isAdmin,
  });
}

module.exports = {
  updateUserNameById,
  updateIsAdminRoleById,
};
