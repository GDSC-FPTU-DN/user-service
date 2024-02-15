const client = require("../configs/redis.config");

async function getData(key) {
  const data = await client.get(key);
  return JSON.parse(data);
}

async function setData(key, value) {
  await client.set(key, JSON.stringify(value));
}

module.exports = {
  getData,
  setData,
};
