const {
  getCacheData,
  setCacheData,
  removeCacheData,
} = require("../services/redis.service");

async function caching(key, callback) {
  let data = await getCacheData(key);
  if (!data) {
    data = await callback();
    await setCacheData(key, data);
  }
  return data;
}

async function unCache(keys) {
  if (Array.isArray(keys)) {
    keys.forEach(async (key) => {
      await removeCacheData(key);
    });
  } else {
    await removeCacheData(keys);
  }
}

module.exports = {
  caching,
  unCache,
};
