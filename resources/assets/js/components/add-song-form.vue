<script>
    import { Config } from './../config.js';
    import { EventBus } from './../event-bus.js';

    export default {
        mounted () {
            EventBus.$on('app-ready', this.setUser);
        },

        data () {
            return {
                channelId: null,
                songname: ''
            };
        },

        methods: {
            addSong () {
                if (this.songname.trim() === "") {
                    return;
                }

                var app = this;

                axios.post(Config.url + '/artists/' + this.channelId + '/songs', {
                    artist_id: this.channelId,
                    name: this.songname
                })
                .then(function (response) {
                    app.songname = "";

                    EventBus.$emit('new-song-added', response.data);
                });
            },

            processForm (event) {
                if (event.keyCode == 13) {
                    this.addSong();
                }
            },

            setUser (channelId) {
                this.channelId = channelId;
            }
        }
    }
</script>
