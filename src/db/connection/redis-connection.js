const Redis = require('redis');
const redisHost = process.env.REDIS_HOST;
const redisPort = process.env.REDIS_PORT;
const redisPassword = process.env.REDIS_PASSWORD;

const RedisClient = Redis.createClient({
    host: redisHost,
    port: redisPort,
    password: redisPassword
});

RedisClient.connect();

RedisClient.on('connect', function() {
    console.log('Cliente conectado a redis');
});

RedisClient.on('error', function(err) {
    console.log('Error =>',err);
});

module.exports = RedisClient