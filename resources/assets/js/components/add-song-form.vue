<script>
    import { Config } from './../config.js';
    import { EventBus } from './../event-bus.js';

    export default {
        mounted () {
            EventBus.$on('app-ready', this.setUser);
        },

        data () {
            return {
                channelId: null,    // Auth'd user's Channel ID.
                songname: ''        // Song Name input value.
            };
        },

        methods: {
            /**
             * Add a song to the artist's catalog on our backend.
             */
            addSong () {
                if (this.songname.trim() === "") {
                    this.songname = "";
                    return;
                }

                axios.post(Config.Url + '/artists/' + this.channelId + '/songs', {
                    name: this.songname
                })
                .then(response => {
                    this.songname = "";
                    EventBus.$emit('new-song-added', response.data);
                });
            },

            /**
             * Add a song on hitting "enter."
             */
            processForm (event) {
                if (event.keyCode == 13) {
                    this.addSong();
                }
            },

            /**
             * Set the channel ID on initialization.
             *
             * @param integer channelId
             */
            setUser (channelId) {
                this.channelId = channelId;
            }
        }
    }
</script>
