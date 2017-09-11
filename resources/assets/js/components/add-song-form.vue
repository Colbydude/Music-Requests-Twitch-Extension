<script>
    import { EventBus } from './../event-bus.js';

    export default {
        props: ['artistId'],

        data () {
            return {
                songname: ''
            };
        },

        methods: {
            addSong () {
                if (this.songname.trim() === "") {
                    return;
                }

                var app = this;

                axios.post('https://twitch.colbydude.com/api/artist/' + this.artistId + '/songs', {
                    name: this.songname
                })
                .then(function (response) {
                    //console.log(response);
                    app.songname = "";

                    EventBus.$emit('new-song-added', response.data);
                });
            }
        }
    }
</script>
