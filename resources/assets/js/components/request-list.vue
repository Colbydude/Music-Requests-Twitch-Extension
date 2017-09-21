<template>
    <div :class="{'request-wrapper': isDashboard}">
        <div :class="{'container-fluid': isDashboard}">
            <div class="form-group">
                <label for="current-request">Current Request:</label>
                <input type="text" name="current-request" id="current-request" class="form-control" :placeholder="currentRequest" v-model="currentRequestValue" disabled>
            </div>
        </div>
        <div class="panel panel-default">
            <div class="panel-heading">
                <div class="pull-right">
                    <button class="btn btn-danger btn-xs" v-on:click="clearRequests">Clear</button>
                </div>
                <h4 class="panel-title">Requests</h4>
            </div>
            <div class="scrollable">
                <table class="table table-condensed table-striped">
                    <thead>
                        <tr>
                            <th>&nbsp;</th>
                            <th>Song</th>
                            <th class="text-right">Requested By</th>
                        </tr>
                    </thead>
                </table>
                <div class="body">
                    <table class="table table-condensed table-striped">
                        <tbody>
                            <tr v-for="(request, index) in requests">
                                <td>
                                    <button class="btn btn-primary btn-xs" v-on:click="playRequest(index, request.id)">
                                        <span class="fa fa-play"></span>
                                    </button>
                                    <br>
                                    <button class="btn btn-danger btn-xs" v-on:click="skipRequest(index, request.id)">
                                        <span class="fa fa-remove"></span>
                                    </button>
                                </td>
                                <td>{{ request.song.name }}</td>
                                <td class="text-right">{{ request.twitch_user_name }}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import { Config } from './../config';
    import { EventBus } from './../event-bus';

    export default {
        props: ['isDashboard'],

        mounted () {
            EventBus.$on('authentication-verified', this.initList);
            EventBus.$on('song-deleted', this.getRequests);
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
             * Clear the entire request list.
             */
            clearRequests() {
                axios.delete(Config.Url + '/artists/' + this.channelId + '/requests')
                     .then(response => {
                         this.requests = [];
                     });
            },

            /**
             * Get the artist's requests from our backend.
             */
            getRequests () {
                axios.get(Config.Url + '/artists/' + this.channelId + '/requests')
                     .then(response => {
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

                // Listen for new requests coming in.
                if (Twitch.ext) {
                    Twitch.ext.listen('whisper-U' + this.channelId, (target, contentType, message) => {
                        console.log(message);
                    });
                }

                this.getRequests();
            },

            /**
             * Play a request.
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
            },

            /**
             * Skip a request.
             *
             * @param integer index
             * @param integer id
             */
            skipRequest (index, id) {
                axios.delete(Config.Url + '/artists/' + this.channelId + '/requests/' + id)
                     .then(response => {
                         this.requests.splice(index, 1);
                     });
            }
        }
    }
</script>
