import Authentication from '@/utils/Authentication';

export default {
    data () {
        return {
            auth: new Authentication(),                         // The auth object containing user and channel information.
            finishedLoading: false,                             // Whether or not the component has authenticated/finished loading.
            twitch: window.Twitch ? window.Twitch.ext : null    // The Twitch helper utility.
        };
    },

    mounted () {
        if (this.twitch) {
            if (this.twitch.rig) {
                window.logger = this.twitch.rig.log.bind(this.twitch);
            }

            // Setup our auth and API and ready the extension for use.
            this.twitch.onAuthorized(async (auth) => {
                this.auth.setToken(auth.token, auth.userId);
                this.$api.Ebs.setChannelId(auth.channelId);
                this.$api.Ebs.setToken(auth.token);
                this.$api.Twitch.setClientId(auth.clientId);

                // Fetch username from the Twitch API if their identity was shared.
                if (this.auth.getUserId()) {
                    let user = await this.$api.Twitch.getUser(this.auth.getUserId());
                    this.auth.setUsername(user.data.data[0].display_name);
                }

                if (!this.finishedLoading) {
                    this.boot();
                }
            });

            // Handle context updates.
            this.twitch.onContext((context, delta) => {
                this.contextUpdate(context, delta);
            });
        }
    },

    methods: {
        boot() {
            this.finishedLoading = true;
        },

        contextUpdate(context, delta) {
            // @TODO when needed
        },
    }
}
