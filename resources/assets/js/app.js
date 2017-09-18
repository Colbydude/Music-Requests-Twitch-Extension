// Load in our JavaScript dependencies.
require('./bootstrap');
import { EventBus } from './event-bus';
import twitchExt from './twitchExt';
import Vue from 'vue';

// Create a fresh Vue instance and attach it to the page.
Vue.use(twitchExt);

Vue.component('add-song-form', require('./components/add-song-form.vue'));
Vue.component('config', require('./components/config.vue'));
Vue.component('request-list', require('./components/request-list.vue'));
Vue.component('request-modal', require('./components/request-modal.vue'));
Vue.component('song-list', require('./components/song-list.vue'));
Vue.component('viewer', require('./components/viewer.vue'));

const app = new Vue({
    el: '#app'
});

// Spoof Twitch.ext auth if we're testing locally.
if (process.env.APP_DEBUG == 'true') {
    let auth = {
        channelId: process.env.TWITCH_CHANNEL_ID,
        clientId: process.env.TWITCH_CHANNEL_ID,
        userId: process.env.TWITCH_USER_ID
    };

    console.log('DEBUG AUTH BEING USED');
    console.log(auth);

    EventBus.$emit('authentication-verified', auth);
}
