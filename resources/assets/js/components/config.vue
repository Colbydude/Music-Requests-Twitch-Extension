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
        <div class="row">
            <div class="col-sm-6">
                <h3>Current Request Widget</h3>
                <p>You can add an automatically updating current request widget to your stream layout by adding a new BrowserSource plugin and setting the URL to the URL below and customizing the CSS to your liking.</p>
                <p><code>{{ widgetUrl }}</code></p>
            </div>
            <div class="col-sm-6">
                <h3>Requesting Songs Externally</h3>
                <p>Twitch Extensions are currently not available on all platforms. Until they are, viewers can visit the link below to requests songs on an external site. This is particularly useful for mobile users.</p>
                <p><code>{{ externalUrl }}</code></p>
            </div>
        </div>
    </div>
</template>

<script>
    import { EventBus } from './../event-bus';
    import { Urls } from './../urls';
    import { mapState } from 'vuex';

    export default {
        mounted () {
            EventBus.$on('authentication-verified', this.verifyArtist);
        },

        computed: {
            externalUrl () {
                return Urls.Ebs.replace('api', '') + this.auth.username + '/requests';
            },

            widgetUrl () {
                return Urls.Ebs.replace('api', '') + this.auth.username + '/requests/current';
            },

            ...mapState(['auth'])
        },

        methods: {
            /**
             * Creates an artist on our backend.
             *
             * @param string name
             */
            createArtist () {
                axios.post(Urls.Ebs + '/artists', {
                        twitch_channel_id: this.auth.channel_id,
                        name: this.auth.channelname
                     })
                     .then(response => {
                         EventBus.$emit('config-ready', this.channelId);
                     })
                     .catch(error => {
                         if (error.response.status == 401) {
                             return swal('Error.', 'Invalid Token!', 'error');
                         }

                         return swal('Error.', 'An unexpected error occurred.', 'error');
                     });
            },

            /**
             * Verifies the artist exists on our backend. If it doesn't, call to create it.
             */
            verifyArtist () {
                axios.get(Urls.Ebs + '/artists/' + this.auth.channel_id)
                     .then(response => {
                         EventBus.$emit('config-ready', this.channel_id);
                     })
                     .catch(error => {
                         if (error.response.status == 401) {
                             return swal('Error.', 'Invalid Token!', 'error');
                         }

                         if (error.response.status == 404) {
                             return this.createArtist();
                         }

                         return swal('Error.', 'An unexpected error occurred.', 'error');
                     });
            }
        }
    }
</script>
