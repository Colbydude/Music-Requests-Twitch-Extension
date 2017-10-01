import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
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
