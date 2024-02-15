const { checkAllowedEmail } = require("../utils/emails");
const { UserSchema } = require("../models/user.model");
const { getToday } = require("../utils/utilities");

// Update user information, create new user if it doesn't exist
// Return user information, or null if user is not allowed
async function updateOrCreateUser(email, name, avatar, userName = "") {
  // Check if email is allowed
  if (!checkAllowedEmail(email)) {
    return null;
  }

  // Find user by email
  let user = await UserSchema.findOne("email", email);

  // Create new user if it doesn't exist
  if (!user) {
    return await UserSchema.create({
      name,
      email,
      avatar,
      userName,
      admin: false,
      createDate: getToday(),
    });
  }

  // Update user information
  await UserSchema.update(user.id, {
    name,
    avatar,
  });
  return user;
}

module.exports = {
  updateOrCreateUser,
};
