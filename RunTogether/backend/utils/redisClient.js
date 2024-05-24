const Redis = require("ioredis");
const redisUrl =
  process.env.REDIS ||
  "rediss://default:Aa6cAAIncDFjYWUzMDJkMWY4NjE0MzY0OTc4OWMyMjRiZTYzZmIzMHAxNDQ3MDA@harmless-seasnail-44700.upstash.io:6379";

if (!redisUrl) {
  throw new Error("REDIS_URL not found in .env file");
}

module.exports.redis = new Redis(redisUrl);
