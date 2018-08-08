import store from './store';
import { Urls } from './../urls';

// Twitch JS Helper stuff...
if (Twitch.ext) {
    window.TwitchDevRig = process.env.MIX_TWITCH_DEVELOPER_RIG == 'true';

    if (DebugMode) {
        // Set the use loopback in debug mode so we don't actually spend bits.
        Twitch.ext.bits.setUseLoopback(true);

        // Bind the logger to the developer rig console.
        if (TwitchDevRig) {
            logger = Twitch.ext.rig.log.bind(Twitch.ext.rig);
        }
    }

    // On authorized event.
    Twitch.ext.onAuthorized(function (auth) {
        // Log token payload.
        var parts = auth.token.split(".");
        var payload = JSON.parse(window.atob(parts[1]));

        logger(payload);

        // Set the token to be used in the header of all axios requests.
        axios.defaults.headers.common.Authorization = 'Bearer ' + auth.token;

        // Store the client information.
        store.commit('setClient', {
            channel_id: payload.channel_id,
            id: auth.clientId,
            platform: 'Twitch'
        });

        // Set authentication.
        store.commit('setAuth', {
            opaque_user_id: payload.opaque_user_id,
            user_id: payload.user_id || null
        });

        // If we have the user_id in the payload, that means the user
        // has granted the extension permissions.
        if (store.getters.auth.user_id) {
            // If we're not using the developer rig, fetch the username from the Twitch API.
            if (!TwitchDevRig) {
                axios.create({headers: {'Client-ID': auth.clientId}})
                .get(`${Urls.TwitchApi}/helix/users?id=${payload.user_id}`)
                .then((response) => store.commit('setAuthUsername', response.data.data[0].display_name))
                .catch((error) => logger(error));
            }
            // Otherwise, just store the user_id as the username as well.
            else {
                store.commit('setAuthUsername', payload.user_id);
            }
        }

        // Emit authentication event.
        EventBus.$emit('authenticated');
    });

    // On context event.
    Twitch.ext.onContext(function (context, contextFields) {
        logger(context);

        if (context.language) {
            store.commit('setClientLanguage', context.language);
        }
    });

    // On error event.
    Twitch.ext.onError(function (err) {
        logger(err);
    });
}
