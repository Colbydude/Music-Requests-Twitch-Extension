<template>
    <div class="container-fluid">
        <div class="row">
            <div class="col-sm-6">
                <request-list></request-list>
            </div>
            <div class="col-sm-6">
                <add-song-form></add-song-form>
                <song-list></song-list>
            </div>
        </div>
    </div>
</template>

<script>
    import { Config } from './../config';
    import { EventBus } from './../event-bus';
    import twitchExt from './../twitchExt';

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
                }).get(Config.TwitchApi + '/helix/users?id=' + this.channelId)
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
