const FirebaseSchema = require("../services/firebase.service");

const UserSchema = new FirebaseSchema("User");

module.exports = { UserSchema };
