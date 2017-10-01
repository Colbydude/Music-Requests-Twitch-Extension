import { EventBus } from './../event-bus';
import store from './store';

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
