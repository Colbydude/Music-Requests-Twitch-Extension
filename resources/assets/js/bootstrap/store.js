import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        auth: {                     // User authentication object.
            opaque_user_id: null,
            user_id: null,
            username: null
        },
        client: {                   // Client information object.
            channel_id: null,
            id: null,
            language: "en",
            platform: null
        }
    },

    getters: {
        auth: (state) => {
            return state.auth;
        },

        client: (state) => {
            return state.client;
        },
    },

    mutations: {
        setAuth (state, auth) {
            state.auth = {...state.auth, ...auth};
        },

        setAuthUserId (state, user_id) {
            state.auth.user_id = user_id;
        },

        setAuthUsername (state, username) {
            state.auth.username = username;
        },

        setClient (state, client) {
            state.client = {...state.client, ...client};
        },

        setClientId (state, id) {
            state.client.id = id;
        },

        setClientLanguage (state, language) {
            state.client.language = language;
        },

        setClientPlatform (state, platform) {
            state.client.platform = platform;
        }
    }
});
