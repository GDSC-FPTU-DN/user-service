var express = require("express");
const {
  getAllUsers,
  getUserById,
  getUserByUserName,
} = require("../controllers/getUser.controller");
const {
  updateUserNameById,
  updateIsAdminRoleById,
} = require("../controllers/updateUser.controller");
const { deleteUserById } = require("../controllers/deleteUser.controller");
const responseObject = require("../utils/response");
const authenticateMiddleware = require("../middlewares/authenticate.middleware");
const userGuardMiddleware = require("../middlewares/userGuard.middleware");
const { APP_STRINGS, MASTER_EMAIL } = require("../utils/constants");
const {
  getSessionData,
  setSessionData,
} = require("../services/sessionFile.service");
const { createUser } = require("../controllers/createUser.controller");
const { caching, unCache } = require("../controllers/caching.controller");

var router = express.Router();

// Get all users
router.get("/", async function (req, res, next) {
  // Caching wrapper
  const users = await caching("users", async () => {
    return await getAllUsers();
  });
  res.status(200).send(responseObject(users));
});

// Get user by Id
router.get("/:id", async function (req, res, next) {
  const userId = req.params.id;
  // Caching wrapper
  const user = await caching(`user:${userId}`, async () => {
    return await getUserById(userId);
  });
  // If user not found, return 404
  if (!user) {
    res
      .status(404)
      .send(responseObject(null, APP_STRINGS.userNotFound(userId)));
  } else {
    res.status(200).send(responseObject(user));
  }
});

// Check username is available
router.get("/check/:uname", async function (req, res, next) {
  const userName = req.params.uname;
  // Caching wrapper
  const user = await caching(`userName:${userName}`, async () => {
    return await getUserByUserName(userName);
  });
  // If user not found, return 200
  if (!user) {
    res
      .status(200)
      .send(responseObject(true, APP_STRINGS.userNameAvailable(userName)));
  } else {
    res
      .status(200)
      .send(responseObject(false, APP_STRINGS.userNameNotAvailable(userName)));
  }
});

// Create user. Only for admin
router.post(
  "/",
  authenticateMiddleware,
  userGuardMiddleware(["admin"]),
  async function (req, res, next) {
    const user = await createUser(req.body);
    // Remove cache of users, user:${userId}, userName:${userName}
    await unCache(["users", `user:${user.id}`, `userName:${user.userName}`]);
    return res
      .status(200)
      .send(responseObject(null, APP_STRINGS.createdUser(user.id)));
  }
);

// Update user
router.put("/", authenticateMiddleware, async function (req, res, next) {
  // Get user id from authenticateMiddleware
  const id = req.user?.id;
  // Update userName if userName in request body.
  const userName = req.body.userName;
  if (userName) {
    await updateUserNameById(id, userName);
  }

  // Update user in session store.
  const updatedUser = {
    ...req.user,
    userName,
  };
  // Update session data by sessionId from authenticationMiddleware
  const sessionData = await getSessionData(req.sessionStore, req.sessionId);
  if (!sessionData) {
    sessionData.user = updatedUser;
    await setSessionData(req.sessionStore, req.sessionId, sessionData);
  }

  // Remove cache of users, user:${userId}, userName:${userName}
  await unCache(["users", `user:${id}`, `userName:${userName}`]);

  res.status(200).send(responseObject(null, APP_STRINGS.updateSuccess(id)));
});

// Update user isAdmin role. Only for master email.
router.put(
  "/admin/:id",
  authenticateMiddleware,
  userGuardMiddleware([`email:${MASTER_EMAIL}`]),
  async function (req, res, next) {
    const id = req.params.id;
    const admin = req.body.admin;
    // Block master email update isAdmin role of itself.
    if (id === req.user?.id) {
      return res
        .status(405)
        .send(responseObject(null, APP_STRINGS.notAllowedEmail(MASTER_EMAIL)));
    }
    // Update isAdmin role
    await updateIsAdminRoleById(id, admin);
    // Delete cache of users, user:${userId}
    await unCache(["users", `user:${id}`]);
    // Delete session. This action will force user with userName re-login to get new admin.
    // TODO: Update when complete Admin website.
    res.status(200).send(responseObject(null, APP_STRINGS.updateSuccess(id)));
  }
);

// Update userName by Id. Only for admin
router.put(
  "/:id",
  authenticateMiddleware,
  userGuardMiddleware(["admin"]),
  async function (req, res, next) {
    const id = req.params.id;
    const userName = req.body.userName;
    await updateUserNameById(id, userName);
    // Remove cache of users, user:${userId}, userName:${userName}
    await unCache(["users", `user:${id}`, `userName:${userName}`]);
    // Delete session. This action will force user with userName re-login to get new userName.
    // TODO: Update when complete Admin website.
    res.status(200).send(responseObject(null, APP_STRINGS.updateSuccess(id)));
  }
);

// Delete user. Block master email delete itself.
router.delete(
  "/",
  authenticateMiddleware,
  userGuardMiddleware([`!email:${MASTER_EMAIL}`]),
  async function (req, res, next) {
    // Get user email from authenticateMiddleware
    const id = req.user?.id;
    await deleteUserById(id);
    // Remove cache of users, user:${userId}
    await unCache(["users", `user:${id}`]);
    res.status(200).send(responseObject(null, APP_STRINGS.deleteSuccess(id)));
  }
);

// Delete user with Id. Only for admin
router.delete(
  "/:id",
  authenticateMiddleware,
  userGuardMiddleware(["admin"]),
  async function (req, res, next) {
    const userId = req.params.id;
    await deleteUserById(userId);
    // Remove cache of users, user:${userId}
    await unCache(["users", `user:${userId}`]);
    res
      .status(200)
      .send(responseObject(null, APP_STRINGS.deleteSuccess(userId)));
  }
);

module.exports = router;
