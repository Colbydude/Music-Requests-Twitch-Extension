// Load in our JavaScript dependencies.
require('./bootstrap');
import app from './components/app';
import { EventBus } from './event-bus';
import twitchExt from './twitchExt';
import router from './router'
import Vue from 'vue';

// Create a fresh Vue instance and attach it to the page.
Vue.prototype.$http = axios;
Vue.use(twitchExt);

Vue.component('add-song-form', require('./components/add-song-form.vue'));
Vue.component('app', require('./components/app.vue'));
Vue.component('config', require('./components/config.vue'));
Vue.component('live_config', require('./components/live_config.vue'));
Vue.component('request-form', require('./components/request-form.vue'));
Vue.component('request-list', require('./components/request-list.vue'));
Vue.component('song-list', require('./components/song-list.vue'));
Vue.component('viewer', require('./components/viewer.vue'));

new Vue({
    el: '#app',
    router,
    render: h => h(app)
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
