<script>
    export default {
        name: 'TwitchPubSub',

        data () {
            return {
                isListening: false  // Whether or not we're listening for Twitch PubSub events.
            };
        },

        created () {
            this.listen();
        },

        beforeDestroy () {
            this.unlisten();
        },

        methods: {
            /**
             * Begin listening for Twitch PubSub events.
             *
             * @return {void}
             */
            listen () {
                if (Twitch.ext && !this.isListening) {
                    this.isListening = true;

                    Twitch.ext.listen('broadcast', (target, contentType, message) => {
                        message = JSON.parse(message);

                        this.onPubSub(message);
                    });
                }
            },

            /**
             * Callback for when a PubSub message is received.
             *
             * @param  {Object}  message
             * @return {void}
             */
            onPubSub (message) {
                logger(message);
            },

            /**
             * Stop listening for Twitch PubSub events.
             *
             * @return {void}
             */
            unlisten () {
                if (Twitch.ext && this.isListening) {
                    this.isListening = false;
                    Twitch.ext.unlisten('broadcast');
                }
            }
        }
    }
</script>
