
/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */

require('./bootstrap');
import { Config } from './config.js';
import { EventBus } from './event-bus.js';

if (window.Twitch.ext) {
    window.Twitch.ext.onAuthorized(function(auth) {
        console.log(auth);
        EventBus.$emit('authentication-verified', auth);
    });

    window.Twitch.ext.onContext(function(context, contextFields) {
        console.log(context);
        console.log(contextFields);
    });

    window.Twitch.ext.onError(function(err) {
        console.error(err);
    });
}

window.Vue = require('vue');

/**
 * Next, we will create a fresh Vue application instance and attach it to
 * the page. Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
 */

Vue.component('config', require('./components/config.vue'));
Vue.component('add-song-form', require('./components/add-song-form.vue'));
Vue.component('request-list', require('./components/request-list.vue'));
Vue.component('request-modal', require('./components/request-modal.vue'));
Vue.component('song-list', require('./components/song-list.vue'));
Vue.component('viewer', require('./components/viewer.vue'));

const app = new Vue({
    el: '#app'
});
