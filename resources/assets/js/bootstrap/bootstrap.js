window._ = require('lodash');

// Debug Mode.
window.DebugMode = process.env.MIX_APP_DEBUG == 'true';

// Global logger.
window.logger = DebugMode ? console.log.bind(console) : function () {};

// Load in Axios.
window.axios = require('axios');
axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
