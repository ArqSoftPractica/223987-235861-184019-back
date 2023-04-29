const Redis = require('redis');
const redisHost = process.env.REDIS_HOST;
const redisPort = process.env.REDIS_PORT;
const redisPassword = process.env.REDIS_PASSWORD;
const logger = require('../../logger/systemLogger')

const RedisClient = Redis.createClient({
    host: redisHost,
    port: redisPort,
    password: redisPassword
});

RedisClient.connect();

RedisClient.on('connect', function() {
    logger.logInfo('Cliente conectado a redis')
});

RedisClient.on('error', function(err) {
    logger.logError('Sequelize connection error:', err)
});

module.exports = RedisClient