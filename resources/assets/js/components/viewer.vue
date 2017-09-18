<script>
    import { Config } from './../config';
    import { EventBus } from './../event-bus';

    export default {
        mounted () {
            EventBus.$on('authentication-verified', this.setInfo);
        },

        data () {
            return {
                channelId: null,    // Channel ID our frontend is being served on.
                clientId: null      // Twitch Extension's Client ID.
            }
        },

        methods: {
            /**
             * Sets the info from the auth object on initialization.
             *
             * @param Auth auth
             */
            setInfo (auth) {
                this.channelId = auth.channelId;
                this.clientId = auth.clientId;
            }
        }
    }
</script>
