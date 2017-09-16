<script>
    import { Config } from './../config.js';
    import { EventBus } from './../event-bus.js';

    export default {
        mounted () {
            EventBus.$on('authentication-verified', this.setInfo);
        },

        data () {
            return {
                channelId: null,    // Auth'd users's Channel ID.
                clientId: null      // Twitch Extension's Client ID.
            }
        },

        methods: {
            /**
             * Creates an artist on our backend.
             *
             * @param string name
             */
            createArtist (name) {
                console.log('' + name + ' ' + this.channelId);

                axios.post(Config.Url + '/artists', {
                        twitch_channel_id: this.channelId,
                        name: name
                     })
                     .then(response => {
                         EventBus.$emit('app-ready', this.channelId);
                     })
                     .catch(error => {
                         console.log(error);
                         //alert('There was an error creating this artist.');
                     });
            },

            /**
             * Gets user data from the Twitch API then call to create the artist.
             */
            getUserData () {
                axios.create({
                    headers: {'Client-ID': this.clientId}
                }).get(Config.TwitchApi + '/users?id=' + this.channelId)
                  .then(response => {
                      this.createArtist(response.data.data[0].display_name);
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

                this.verifyArtist();
            },

            /**
             * Verifies the artist exists on our backend. If it doesn't, call to create it.
             */
            verifyArtist () {
                axios.get(Config.Url + '/artists/' + this.channelId)
                     .then(response => {
                         EventBus.$emit('app-ready', this.channelId);
                     })
                     .catch(error => {
                         if (error.response.status == 404) {
                             this.getUserData();
                         }
                     });
            }
        }
    }
</script>
