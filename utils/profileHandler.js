function extractFromGoogleProfile(profile) {
  return {
    name: profile.displayName,
    email: profile.emails[0].value,
    avatar: profile.photos[0].value,
  };
}

module.exports = {
  extractFromGoogleProfile,
};
