process.env.NODE_ENV = process.env.NODE_ENV || 'development';

const environment = require('./environment');
const config = environment.toWebpackConfig();
config.devServer.watchContentBase = false;
module.exports = config;