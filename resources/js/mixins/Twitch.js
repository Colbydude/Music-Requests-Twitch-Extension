import Authentication from '@/utils/Authentication';

export default {
    data () {
        return {
            auth: new Authentication(),                         // The auth object containing user and channel information.
            finishedLoading: false,                             // Whether or not the component has authenticated/finished loading.
            twitch: window.Twitch ? window.Twitch.ext : null    // The Twitch helper utility.
        };
    },

    async beforeMount () {
        if (this.twitch) {
            if (process.env.NODE_ENV === 'development') {
                window.logger = this.twitch.rig.log.bind(this.twitch);
            }

            // Setup our auth and API and ready the extension for use.
            await this.twitch.onAuthorized(async (auth) => {
                this.auth.setToken(auth.token, auth.userId);
                this.$api.Ebs.setChannelId(auth.channelId);
                this.$api.Ebs.setToken(auth.token);

                // Fetch username from the Twitch API if their identity was shared.
                if (this.auth.getUserId()) {
                    let { data } = await this.$api.Ebs.getUsername(this.auth.getUserId());
                    this.auth.setUsername(data.username);
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
        /**
         * Prompt to ask for authentication.
         *
         * @return {void}
         */
        askForAuth() {
            this.twitch.actions.requestIdShare();
        },

        /**
         * Auth has been verified, finish "booting"
         *
         * @return {void}
         */
        boot() {
            this.finishedLoading = true;
        },

        contextUpdate(context, delta) {
            // @TODO when needed
        },
    }
}
