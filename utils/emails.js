function checkAllowedEmail(email) {
  const regex = new RegExp(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/);
  return regex.test(email);
}

module.exports = {
  checkAllowedEmail,
};
