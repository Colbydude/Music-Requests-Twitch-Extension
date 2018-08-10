// Load in our JavaScript dependencies.
require('./bootstrap/bootstrap');
import App from './components/App';
import store from './bootstrap/store';
import router from './bootstrap/router';
import Vue from 'vue';
import Vuex from 'vuex';

// Map global objects to Vue.
Vue.prototype.$http = axios;
Vue.mixin(require('./mixin'));

// Create a fresh Vue instance and attach it to the page.
new Vue({
    el: '#app',
    router,
    store,
    render: h => h(App)
});

// Setup for Twitch Extension auth stuff.
require('./bootstrap/twitch-ext');
