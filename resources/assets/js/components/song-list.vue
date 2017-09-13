<script>
    import { Config } from './../config.js';
    import { EventBus } from './../event-bus.js';

    export default {
        mounted () {
            EventBus.$on('new-song-added', this.addSong);
            EventBus.$on('app-ready', this.initList)
        },

        data () {
            return {
                channelId: null,
                songs: {}
            };
        },

        methods: {
            addSong (songObject) {
                this.songs.push(songObject);
            },

            getSongs () {
                var app = this;

                axios.get(Config.url + '/artists/' + this.channelId + '/songs')
                     .then(function (response) {
                         app.songs = response.data;
                     });
            },

            initList (channelId) {
                this.channelId = channelId;
                this.getSongs();
            },

            removeSong (index, id) {
                var app = this;

                axios.delete(Config.url + '/artists/' + this.channelId + '/songs/' + id)
                     .then(function (response) {
                         app.songs.splice(index, 1);
                     });
            }
        }
    }
</script>
