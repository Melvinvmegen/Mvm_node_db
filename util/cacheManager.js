const Redis = require('redis'),
      chalk = require("chalk")

let redisClient;

(async () => {
  redisClient = Redis.createClient({ url: process.env.REDIS_URL })
})();

redisClient.on("connected", function () {
  console.log(
    chalk.green("Redis is connected")
  )
});
redisClient.on("error", function (err) {
  console.debug(
    chalk.red("Redis error :"),
    chalk.red(err)
  )
});

getOrSetCache = (key, cb, force = false) => {
  return new Promise((resolve, reject) => {
    redisClient.get(key, async (err, result) => {
      if (err) reject(err)
      if (result && !force) {
        console.log(
          chalk.green(key, 'CACHE HIT')
        )
        resolve(JSON.parse(result))
      } else {
        const redisKey = force ? `filtered_${key}` : key
        console.log(
          chalk.yellow(redisKey, 'CACHE MISS')
        )
        const freshData = await cb()
        redisClient.setex(redisKey, 3600, JSON.stringify(freshData))
        resolve(freshData)
      }
    })
  })
}

invalidateCache = (key) => {
  return new Promise((resolve, reject) => {
    redisClient.del(key, async (err, result) => {
      if (err) {
        reject(err)
      } 
      if (!result) {
        reject('Cache not found')
      } else {
        console.log(
          chalk.green(key, 'CACHE INVALIDATED')
        )
        resolve(JSON.parse(result))
      }
    })
  })
}

global.cache = redisClient;
module.exports = { redisClient, getOrSetCache};
