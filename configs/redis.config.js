const { createClient } = require("redis");
require("dotenv").config();

const client = createClient({
  host: process.env.REDIS_HOST || "redis",
  port: process.env.REDIS_PORT || 6379,
});

client.on("error", (error) => {
  console.error(error);
});

client.on("connect", () => {
  console.log("✨ Connected to Redis");
});

module.exports = client;
