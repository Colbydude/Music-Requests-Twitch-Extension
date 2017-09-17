<script>
    import { Config } from './../config.js';
    import { EventBus } from './../event-bus.js';

    export default {
        mounted () {
            EventBus.$on('authentication-verified', this.setInfo);
        },

        data () {
            return {
                channelId: null,    // Channel ID our frontend is being served on.
                clientId: null,     // Twitch Extension's Client ID.
                songs: [],          // List of songs the user can request.
                songname: '',       // Song to be requested.
                userId: null        // ID of the currently auth'd user.
            }
        },

        methods: {
            /**
             * Get the artist's song catalog from our backend.
             */
            getSongs () {
                axios.get(Config.Url + '/artists/' + this.channelId + '/songs')
                     .then(response => {
                         this.songs = response.data;
                         console.log(this.songs);
                     })
                     .catch(error => {
                         console.log(error);
                     });
            },

            getSongFromName() {
                return this.songs.find(song => song.name === this.songname);
            },

            requestSong () {
                let songObject = this.getSongFromName();

                if (songObject === undefined) {
                    console.log('Error song not found.');
                    return;
                }

                axios.post(Config.Url + '/artists/' + this.channelId + '/requests', {
                         song_id: songObject.id,
                         twitch_user_id: this.userId
                     })
                     .then(response => {
                         this.songname = '';
                         swal({
                             title: "Song Requested!",
                             text: "The broadcaster will be notified shortly.",
                             type: 'success',
                             timer: 2000,
                             showConfirmButton: false
                         }).then(
                            function () {},
                            function (dismiss) {
                                //
                            }
                        );
                     })
                     .catch(error => {
                         console.log(error);
                     })
            },

            /**
             * Sets the info from the auth object on initialization.
             *
             * @param Auth auth
             */
            setInfo (auth) {
                this.channelId = auth.channelId;
                this.clientId = auth.clientId;
                this.userId = auth.userId.substr(1);

                this.getSongs();
            }
        }
    }
</script>
