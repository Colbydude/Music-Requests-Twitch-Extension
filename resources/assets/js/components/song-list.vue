<script>
    import { EventBus } from './../event-bus.js';

    export default {
        props: ['artistId'],

        mounted () {
            EventBus.$on('new-song-added', this.addSong);

            this.getSongs();
        },

        data () {
            return {
                songs: {}
            };
        },

        methods: {
            addSong(songObject) {
                this.songs.push(songObject);
            },

            getSongs() {
                var app = this;

                axios.get('https://twitch.colbydude.com/api/artist/' + this.artistId + '/songs')
                     .then(function (response) {
                         app.songs = response.data;
                     });
            },

            removeSong(index, id) {
                var app = this;

                axios.delete('https://twitch.colbydude.com/api/artist/' + this.artistId + '/songs/' + id)
                     .then(function (response) {
                         app.songs.splice(index, 1);
                     });
            }
        }
    }
</script>
