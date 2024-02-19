const client = require("../configs/redis.config");
const { CACHE_EXPIRED_TIME } = require("../utils/constants");

async function getCacheData(key) {
  const data = await client.get(key);
  if (!data) return null;
  return JSON.parse(data);
}

async function setCacheData(key, value, expiredTime = CACHE_EXPIRED_TIME) {
  await client.set(key, JSON.stringify(value), "EX", expiredTime);
}

async function removeCacheData(key) {
  await client.del(key);
}

module.exports = {
  getCacheData,
  setCacheData,
  removeCacheData,
};
