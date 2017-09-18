window._ = require('lodash');

// jQuery and Bootstrap plugins.
try {
    window.$ = window.jQuery = require('jquery');

    require('bootstrap-sass');
} catch (e) {}

// Load in Axios.
window.axios = require('axios');

window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

// Load in Sweet Alert.
try {
    window.swal = require('sweetalert2');
} catch (e) {}
