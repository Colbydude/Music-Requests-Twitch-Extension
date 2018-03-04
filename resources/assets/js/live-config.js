// Load in our JavaScript dependencies.
require('./bootstrap/bootstrap');
import app from './components/app';
import store from './bootstrap/store';
import router from './bootstrap/router';
import Vue from 'vue';
import Vuex from 'vuex';

// Map global objects to Vue.
Vue.prototype.$http = axios;
Vue.use(Vuex);

// Register components.
Vue.component('app', require('./components/app.vue'));
Vue.component('live-config', require('./components/live-config.vue'));
Vue.component('request-list', require('./components/request-list.vue'));

// Create a fresh Vue instance and attach it to the page.
new Vue({
    el: '#app',
    router,
    store,
    render: h => h(app)
});

// Setup for Twitch Extension auth stuff.
require('./bootstrap/twitch-ext');
