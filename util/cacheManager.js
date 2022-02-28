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
    chalk.red(e)
  )
});

getOrSetCache = (key, cb, force = false) => {
  return new Promise((resolve, reject) => {
    if (force) redisClient.del(key)
    redisClient.get(key, async (err, result) => {
      if (err) reject(err)
      if (result) {
        console.log(
          chalk.green('CACHE HIT')
        )
        return resolve(JSON.parse(result))
      } else {
        console.log(
          chalk.yellow('CACHE MISS')
        )
        const freshData = await cb()
        redisClient.setex(key, 3600, JSON.stringify(freshData))
        return resolve(freshData)
      }
    })
  })
}

global.cache = redisClient;
module.exports = { redisClient, getOrSetCache};
