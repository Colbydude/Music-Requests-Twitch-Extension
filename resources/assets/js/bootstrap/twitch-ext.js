import { EventBus } from './../event-bus';
import { Urls } from './../urls';
import store from './store';

// Twitch JS Helper stuff...
if (window.Twitch.ext) {
    window.Twitch.ext.onAuthorized(function (auth) {
        var parts = auth.token.split(".");
        var payload = JSON.parse(window.atob(parts[1]));

        if (payload.user_id) {
            // User has granted permissions.
            // NOTE: User needs to grant permissions in order to submit requests.
            store.commit('setAuth', {
                auth_id: auth.userId,
                channel_id: payload.channel_id,
                client_id: auth.clientId,
                opaque_user_id: payload.opaque_user_id,
                token: auth.token,
                user_id: payload.user_id
            });

            // Fetch the username from the Twitch API via the user_id.
            axios.create({
                headers: {'Client-ID': auth.clientId}
            })
            .get(Urls.TwitchApi + '/helix/users?id=' + payload.user_id)
            .then(response => {
                store.commit('setAuthUsername', response.data.data[0].display_name);
            })
            .catch(error => {
                if (error.response.status == 401) {
                    return swal('Error.', 'Invalid Token!', 'error');
                }

                return swal('Error.', 'An unexpected error occurred.', 'error');
            });
        } else {
            // User has not granted permissions.
            store.commit('setAuth', {
                auth_id: auth.userId,
                channel_id: payload.channel_id,
                client_id: auth.clientId,
                opaque_user_id: payload.opaque_user_id,
                token: auth.token
            });
        }

        // Fetch the channel's username from the Twitch API via the channel_id.
        axios.create({
            headers: {'Client-ID': auth.clientId}
        })
        .get(Urls.TwitchApi + '/helix/users?id=' + payload.channel_id)
        .then(response => {
            store.commit('setChannelUsername', response.data.data[0].display_name);

            // Set the token to be used in the header of all axios requests.
            window.axios.defaults.headers.common.Authorization = 'Bearer ' + auth.token;

            // Initialize the components.
            EventBus.$emit('authentication-verified');
        })
        .catch(error => {
            if (error.response.status == 401) {
                return swal('Error.', 'Invalid Token!', 'error');
            }

            return swal('Error.', 'An unexpected error occurred.', 'error');
        });
    });

    window.Twitch.ext.onContext(function (context, contextFields) {
        //
    });

    window.Twitch.ext.onError(function (err) {
        //
    });
}
