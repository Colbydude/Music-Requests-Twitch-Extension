<script>
    import { Config } from './../config.js';
    import { EventBus } from './../event-bus.js';

    export default {
        mounted () {
            EventBus.$on('authentication-verified', this.setInfo);
        },

        data () {
            return {
                channelId: null,    // Auth'd user's Channel ID.
                channelName: null,  // Auth'd user's Channel Name.
                clientId: null      // Twitch Extension's Client ID.
            }
        },

        methods: {
            /**
             * Gets user data from the Twitch API to set the viewer name.
             */
            getUserData () {
                axios.create({
                    headers: {'Client-ID': this.clientId}
                }).get(Config.TwitchApi + '/users?id=' + this.channelId)
                  .then(response => {
                      this.channelName = response.data.data[0].display_name;
                  })
                  .catch(error => {
                      console.log(error);
                      //alert('Twitch API error.');
                  });
            },

            /**
             * Sets the info from the auth object on initialization.
             *
             * @param Auth auth
             */
            setInfo (auth) {
                this.channelId = auth.channelId;
                this.clientId = auth.clientId;

                this.getUserData();
            }
        }
    }
</script>
