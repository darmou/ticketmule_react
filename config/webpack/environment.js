const { environment } = require('@rails/webpacker');
const customConfig = require('./custom');

// Merge custom config
environment.config.merge(customConfig);

module.exports = environment;
