<script>
    import { Config } from './../config';
    import { EventBus } from './../event-bus';

    export default {
        mounted () {
            EventBus.$on('new-song-added', this.addSong);
            EventBus.$on('app-ready', this.initList)
        },

        data () {
            return {
                channelId: null,    // Channel ID our frontend is being served on.
                songs: [],          // Artist's catalog of songs.
                userId: null        // ID of the currently auth'd user.
            };
        },

        methods: {
            /**
             * Add a song to the (beginning of) list.
             *
             * @param Song songObject
             */
            addSong (songObject) {
                this.songs.unshift(songObject);
            },

            /**
             * Get the artist's song catalog from our backend.
             */
            getSongs () {
                axios.get(Config.Url + '/artists/' + this.channelId + '/songs')
                     .then(response => {
                         this.songs = response.data;
                     })
                     .catch(error => {
                         console.log(error);
                     });
            },

            /**
             * Set the channelId and get the list of songs on initialization.
             *
             * @param integer channelId
             */
            initList (channelId) {
                this.channelId = channelId;
                this.getSongs();
            },

            /**
             * Remove a song from the artist's catalog.
             *
             * @param integer index
             * @param integer id
             */
            removeSong (index, id) {
                axios.delete(Config.Url + '/artists/' + this.channelId + '/songs/' + id)
                     .then(response => {
                         this.songs.splice(index, 1);
                         EventBus.$emit('song-deleted', id);
                     });
            }
        }
    }
</script>
