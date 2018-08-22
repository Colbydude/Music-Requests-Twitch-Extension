// Load in our JavaScript dependencies.
require('./bootstrap/bootstrap');
import App from './components/App';
import store from './bootstrap/store';
import router from './bootstrap/router';

import Vue from 'vue';
import Notifications from 'vue-notification';
import VueI18n from 'vue-i18n';
import Vuex from 'vuex';
import { lang } from './lang';

// Map global objects to Vue.
Vue.prototype.$http = axios;
Vue.use(VueI18n);
Vue.use(Notifications);
Vue.mixin(require('./mixin'));

const i18n = new VueI18n({
    locale: 'en',
    messages: lang
});

// Create a fresh Vue instance and attach it to the page.
new Vue({
    el: '#app',
    router,
    store,
    i18n,
    render: h => h(App)
});

// Setup for Twitch Extension auth stuff.
require('./bootstrap/twitch-ext');
