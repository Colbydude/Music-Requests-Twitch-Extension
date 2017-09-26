// Load in our JavaScript dependencies.
require('./bootstrap');
import app from './components/app';
import { Config } from './config';
import { EventBus } from './event-bus';
import router from './router'
import Vue from 'vue';
import Vuex from 'vuex';

// Create a fresh Vue instance and attach it to the page.
Vue.prototype.$http = axios;
Vue.use(Vuex);

Vue.component('add-song-form', require('./components/add-song-form.vue'));
Vue.component('app', require('./components/app.vue'));
Vue.component('config', require('./components/config.vue'));
Vue.component('live_config', require('./components/live_config.vue'));
Vue.component('request-form', require('./components/request-form.vue'));
Vue.component('request-list', require('./components/request-list.vue'));
Vue.component('song-list', require('./components/song-list.vue'));
Vue.component('viewer', require('./components/viewer.vue'));

let store = new Vuex.Store({
    state: {
        auth: {
            channel_id: null,
            channelname: null,
            client_id: null,
            opaque_user_id: null,
            token: null,
            user_id: null,
            username: null
        }
    },

    getters: {
        isAuthenticated: state => {
            return state.auth.user_id ? true : false;
        }
    },

    mutations: {
        setAuth (state, auth) {
            state.auth = {...state.auth, ...auth};
        },

        setAuthUsername(state, username) {
            state.auth.username = username;
        },

        setChannelUsername(state, username) {
            state.auth.channelname = username;
        }
    }
});

new Vue({
    el: '#app',
    router,
    store,
    render: h => h(app)
});

// Twitch JS Helper stuff...
if (window.Twitch.ext) {
    window.Twitch.ext.onAuthorized(function (auth) {
        var parts = auth.token.split(".");
        var payload = JSON.parse(window.atob(parts[1]));
        //console.log({payload, auth});

        if (payload.user_id) {
            // User has granted permissions.
            // NOTE: User needs to grant permissions in order to submit requests.
            store.commit('setAuth', {
                channel_id: payload.channel_id,
                client_id: auth.clientId,
                opaque_user_id: payload.opaque_user_id,
                token: auth.token,
                user_id: payload.user_id
            });

            // Fetch the username from the Twitch API via the user_id.
            axios.create({
                headers: {'Client-ID': auth.clientId}
            }).get(Config.TwitchApi + '/helix/users?id=' + payload.user_id)
              .then(response => {
                  store.commit('setAuthUsername', response.data.data[0].display_name);
              })
              .catch(error => {
                  console.log(error);
              });
        } else {
            // User has not granted permissions.
            store.commit('setAuth', {
                channel_id: payload.channel_id,
                client_id: auth.clientId,
                opaque_user_id: payload.opaque_user_id,
                token: auth.token
            });
        }

        // Set the token to be used in the header of all axios requests.
        window.axios.defaults.headers.common['Authorization'] = 'Bearer ' + auth.token;

        // Initialize the components.
        EventBus.$emit('authentication-verified');

        // Fetch the channel's username from the Twitch API via the channel_id.
        axios.create({
            headers: {'Client-ID': auth.clientId}
        }).get(Config.TwitchApi + '/helix/users?id=' + payload.channel_id)
          .then(response => {
              store.commit('setChannelUsername', response.data.data[0].display_name);
          })
          .catch(error => {
              console.log(error);
          });
    });

    window.Twitch.ext.onContext(function (context, contextFields) {
        //console.log(context);
        //console.log(contextFields);
    });

    window.Twitch.ext.onError(function (err) {
        //console.error(err);
    });
}

// Spoof Twitch.ext auth if we're testing locally.
if (process.env.APP_DEBUG == 'true') {
    var jwt = require('jsonwebtoken');
    var expiration = Math.floor(Date.now() / 1000) + (60 * 60 * 24);
    var token = jwt.sign({exp: expiration, debug: 'yes'}, new Buffer(process.env.JWT_SECRET, 'base64'));

    let auth = {
        channel_id: process.env.TWITCH_CHANNEL_ID,
        channelname: process.env.TWITCH_USERNAME,
        client_id: process.env.TWITCH_CLIENT_ID,
        token: token,
        user_id: process.env.TWITCH_USER_ID,
        username: process.env.TWITCH_USERNAME
    };

    window.axios.defaults.headers.common['Authorization'] = 'Bearer ' + auth.token;

    console.log('DEBUG AUTH BEING USED');
    //console.log(auth);

    // Set global auth object.
    store.commit('setAuth', auth);

    // Initialize the components.
    EventBus.$emit('authentication-verified');
}
