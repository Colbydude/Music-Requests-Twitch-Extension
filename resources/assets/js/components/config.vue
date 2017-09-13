<script>
    import { Config } from './../config.js';
    import { EventBus } from './../event-bus.js';

    export default {
        mounted () {
            EventBus.$on('authentication-verified', this.setInfo);
        },

        data () {
            return {
                channelId: null,
                clientId: null
            }
        },

        methods: {
            createArtist (name) {
                var app = this;

                console.log('' + name + ' ' + this.channelId);

                axios.post(Config.url + '/artists', {
                        twitch_channel_id: this.channelId,
                        name: name
                     })
                     .then(function (response) {
                         console.log(response);
                         EventBus.$emit('app-ready', app.channelId);
                     })
                     .catch(function (error) {
                         console.log(error);
                         //alert('There was an error creating this artist.');
                     });
            },

            getUserData() {
                var app = this;

                axios.create({
                    headers: {'Client-ID': app.clientId}
                }).get(Config.TwitchApi + '/users?id=' + app.channelId)
                  .then(function (response) {
                      console.log(response);
                      app.createArtist(response.data.data[0].display_name);
                  })
                  .catch(function (error) {
                      console.log(error);
                      //alert('Twitch API error.');
                  });
            },

            setInfo (auth) {
                this.channelId = auth.channelId;
                this.clientId = auth.clientId;

                this.verifyArtist();
            },

            verifyArtist() {
                var app = this;

                axios.get(Config.url + '/artists/' + this.channelId)
                     .then(function (response) {
                         console.log(response);
                         EventBus.$emit('app-ready', app.channelId);
                     })
                     .catch(function (error) {
                         if (error.response.status == 404) {
                             app.getUserData();
                         }
                     });
            }
        }
    }
</script>
