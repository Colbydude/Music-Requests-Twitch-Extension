
/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */

require('./bootstrap');
import { EventBus } from './event-bus.js';

window.Vue = require('vue');

/**
 * Next, we will create a fresh Vue application instance and attach it to
 * the page. Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
 */

Vue.component('add-song-form', require('./components/add-song-form.vue'));
Vue.component('song-list', require('./components/song-list.vue'));

const app = new Vue({
    el: '#app'
});


if (window.Twitch.ext) {
    window.Twitch.ext.onAuthorized(function(auth) {
        console.log(auth);
    });

    window.Twitch.ext.onContext(function(context, contextFields) {
        console.log(context);
        console.log(contextFields);
    });

    window.Twitch.ext.onError(function(err) {
        console.error(err);
    });
}
