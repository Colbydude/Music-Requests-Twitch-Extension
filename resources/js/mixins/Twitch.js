import Authentication from '@/utils/Authentication';

export default {
    data () {
        return {
            auth: new Authentication(),                         // The auth object containing user and channel information.
            finishedLoading: false,                             // Whether or not the component has authenticated/finished loading.
            loadingCallbacks: [],                               // Callbacks to be ran after we're finished loading.
            twitch: window.Twitch ? window.Twitch.ext : null    // The Twitch helper utility.
        };
    },

    mounted () {
        if (this.twitch) {
            // Setup our auth and API and ready the extension for use.
            this.twitch.onAuthorized(async (auth) => {
                this.auth.setToken(auth.token, auth.userId);
                this.$api.Ebs.setChannelId(auth.channelId);
                this.$api.Ebs.setToken(auth.token);
                this.$api.Twitch.setClientId(auth.clientId);

                // Fetch username from the Twitch API.
                let user = await this.$api.Twitch.getUser(this.auth.getUserId());
                this.auth.setUsername(user.data.data[0].display_name);

                if (!this.finishedLoading) {
                    // Fire off any registered callbacks.
                    this.loadingCallbacks.forEach(async (callback) => {
                        await callback();
                    });

                    this.finishedLoading = true;
                }
            });

            // Handle context updates.
            this.twitch.onContext((context, delta) => {
                this.contextUpdate(context, delta);
            });
        }
    },

    methods: {
        contextUpdate(context, delta) {
            // @TODO
        }
    }
}
