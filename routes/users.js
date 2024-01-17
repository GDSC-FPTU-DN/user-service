var express = require("express");
const {
  getAllUsers,
  getUserById,
  getUserByEmail,
  getUserByUserName,
} = require("../controllers/getUser.controller");
const {
  updateUserNameByEmail,
} = require("../controllers/updateUser.controller");
const {
  deleteUserByEmail,
  deleteUserById,
} = require("../controllers/deleteUser.controller");
const responseObject = require("../utils/response");
const authenticateMiddleware = require("../middlewares/authenticate.middleware");
const { APP_STRINGS } = require("../utils/constants");
const {
  getSessionData,
  setSessionData,
} = require("../services/sessionFile.service");

var router = express.Router();

router.get("/", async function (req, res, next) {
  const users = await getAllUsers();
  res.status(200).send(responseObject(users));
});

router.get("/:id", async function (req, res, next) {
  const userId = req.params.id;
  const user = await getUserById(userId);
  if (!user) {
    res.status(404).send(APP_STRINGS.userNotFound(userId));
  } else {
    res.status(200).send(responseObject(user));
  }
});

router.get("/check/:uname", async function (req, res, next) {
  const userName = req.params.uname;
  const user = await getUserByUserName(userName);
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

router.post("/update", authenticateMiddleware, async function (req, res, next) {
  // Get user email from authenticateMiddleware
  const email = req.user?.email;
  if (!email) {
    res.status(401).send(responseObject(false, "Something went wrong"));
    return;
  }
  // Update user name
  const userName = req.body.userName;
  await updateUserNameByEmail(email, userName);
  // Update user
  const updatedUser = {
    ...req.user,
    userName,
  };
  const sessionData = await getSessionData(req.sessionStore, req.sessionId);
  if (!sessionData) {
    sessionData.user = updatedUser;
    await setSessionData(req.sessionStore, req.sessionId, sessionData);
  }
  res.status(200).send(responseObject(true, APP_STRINGS.updateSuccess(email)));
});

router.delete(
  "/delete",
  authenticateMiddleware,
  async function (req, res, next) {
    // Get user email from authenticateMiddleware
    const email = req.user?.email;
    await deleteUserByEmail(email);
    res.status(200).send(APP_STRINGS.deleteSuccess(email));
  },
);

router.delete(
  "/delete/:id",
  authenticateMiddleware,
  async function (req, res, next) {
    // Get user email from authenticateMiddleware
    const email = req.user.email;
    // Find user by email
    const user = await getUserByEmail(email);
    // Check if user is admin
    if (user.admin) {
      await deleteUserById(req.params.id);
      res.status(200).send(APP_STRINGS.deleteSuccess(email));
    } else {
      res.status(405).send(APP_STRINGS.notAllowedEmail(email));
    }
  },
);

module.exports = router;
