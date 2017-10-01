window._ = require('lodash');

// Load in Axios.
window.axios = require('axios');

window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

// Load in Sweet Alert.
try {
    window.swal = require('sweetalert2');
} catch (e) {}
