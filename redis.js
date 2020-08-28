const 
  { REDIS_URL } = process.env,
  redis = require('redis').createClient(REDIS_URL),
  { promisify } = require('util');
  const getAsync = promisify(redis.get).bind(redis);


  redis.on("error", function(error) {
    console.error(error);
  });
   

module.exports = {redis, getAsync};


