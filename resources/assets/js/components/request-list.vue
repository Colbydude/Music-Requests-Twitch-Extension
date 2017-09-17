<script>
    import { Config } from './../config.js';
    import { EventBus } from './../event-bus.js';

    export default {
        mounted () {
            EventBus.$on('authentication-verified', this.initList)
        },

        data () {
            return {
                channelId: null,            // Channel ID our frontend is being served on.
                currentRequestValue: '',    // Text value of the current request textbox.
                lastPlayed: null,           // Last played request.
                requests: [],               // Artist's recent requests.
            };
        },

        computed: {
            currentRequest () {
                if (this.currentRequestValue !== '') {
                    return this.currentRequestValue;
                }

                if (this.lastPlayed !== null) {
                    return this.lastPlayed.song.name + ' - ' + this.lastPlayed.twitch_user_name;
                }

                return '';
            }
        },

        methods: {
            /**
             * Get the artist's requests from our backend.
             */
            getRequests () {
                axios.get(Config.Url + '/artists/' + this.channelId + '/requests')
                     .then(response => {
                         console.log(response);
                         this.requests = response.data;
                     })
                     .catch(error => {
                         console.log(error);
                     });
            },

            /**
             * Set the channelId and get the list of requests on initialization.
             *
             * @param integer channelId
             */
            initList (auth) {
                this.channelId = auth.channelId;
                this.getRequests();
            },

            /**
             * Remove a song from the artist's catalog.
             *
             * @param integer index
             * @param integer id
             */
            playRequest (index, id) {
                this.lastPlayed = this.requests[index];

                axios.patch(Config.Url + '/artists/' + this.channelId + '/requests/' + id, {
                         is_taken: true
                     })
                     .then(response => {
                         this.requests.splice(index, 1);
                     });
            }
        }
    }
</script>
