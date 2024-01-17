const { promisify } = require("util");

async function getSessionData(sessionStore, sessionId) {
  const getSession = promisify(sessionStore.get.bind(sessionStore));
  try {
    const sessionData = await getSession(sessionId);
    return sessionData;
  } catch (error) {
    return null;
  }
}

async function setSessionData(sessionStore, sessionId, sessionData) {
  const setSession = promisify(sessionStore.set.bind(sessionStore));
  try {
    return await setSession(sessionId, sessionData);
  } catch (error) {
    return null;
  }
}

module.exports = {
  getSessionData,
  setSessionData,
};
