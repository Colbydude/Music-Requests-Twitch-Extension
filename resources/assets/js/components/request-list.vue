<template>
    <div :class="{'request-wrapper': isDashboard}">
        <div :class="{'container-fluid': isDashboard}">
            <div class="form-group">
                <label for="current-request">Current Request:</label>
                <input type="text" name="current-request" id="current-request" class="form-control" placeholder="No Request Currently" v-model="currentRequest" disabled>
            </div>
        </div>
        <div class="panel panel-default">
            <div class="panel-heading">
                <div class="pull-right">
                    <button class="btn btn-danger btn-xs" @click="clearRequests">Clear</button>
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
                                    <button class="btn btn-primary btn-xs" @click="playRequest(index, request.id)">
                                        <span class="fa fa-play"></span>
                                    </button>
                                    <br>
                                    <button class="btn btn-danger btn-xs" @click="skipRequest(index, request.id)">
                                        <span class="fa fa-remove"></span>
                                    </button>
                                </td>
                                <td>{{ request.song.name }}</td>
                                <td v-if="request.twitch_user_name == null" class="text-right">Unknown</td>
                                <td v-else class="text-right">{{ request.twitch_user_name }}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import { EventBus } from './../event-bus';
    import { Urls } from './../urls';
    import { mapState } from 'vuex';

    export default {
        props: ['isDashboard'],

        mounted () {
            EventBus.$on((this.isDashboard ? 'authentication-verified' : 'config-ready'), this.initList);
            EventBus.$on('song-deleted', this.getRequests);
        },

        data () {
            return {
                currentRequest: '',         // Value of the current request textbox.
                lastPlayed: null,           // Last played request.
                requests: [],               // Artist's recent requests.
            };
        },

        computed: mapState(['auth']),

        methods: {
            /**
             * Add a request to the list (in real-time).
             *
             * @param Request requestObject
             */
            addRequest(requestObject) {
                let result = this.requests.find(o => o.id === requestObject.id);

                if (result === undefined) {
                    this.requests.unshift(requestObject);
                }
            },

            /**
             * Clear the entire request list.
             */
            clearRequests() {
                axios.delete(Urls.Ebs + '/artists/' + this.auth.channel_id + '/requests')
                     .then(response => {
                         this.requests = [];
                         this.currentRequest = '';
                     })
                     .catch(error => {
                         if (error.response.status == 401) {
                             return swal('Error.', 'Invalid Token!', 'error');
                         }

                         return swal('Error.', 'An unexpected error occurred.', 'error');
                     });
            },

            /**
             * Get the artist's current request.
             */
            getCurrentRequest() {
                axios.get(Urls.Ebs + '/artists/' + this.auth.channel_id + '/requests/current')
                     .then(response => {
                         if (!_.isEmpty(response.data)) {
                             this.currentRequest = response.data;
                         }
                     })
                     .catch(error => {
                         if (error.response.status == 401) {
                             return swal('Error.', 'Invalid Token!', 'error');
                         }

                         return swal('Error.', 'An unexpected error occurred.', 'error');
                     });
            },

            /**
             * Get the artist's requests from our backend.
             */
            getRequests () {
                axios.get(Urls.Ebs + '/artists/' + this.auth.channel_id + '/requests')
                     .then(response => {
                         this.requests = response.data;
                     })
                     .catch(error => {
                         if (error.response.status == 401) {
                             return swal('Error.', 'Invalid Token!', 'error');
                         }

                         return swal('Error.', 'An unexpected error occurred.', 'error');
                     });
            },

            /**
             * Set the channelId and get the list of requests on initialization.
             *
             * @param integer channelId
             */
            initList () {
                // Listen for new requests coming in.
                if (Twitch.ext) {
                    Twitch.ext.listen('whisper-U' + this.auth.channel_id, (target, contentType, message) => {
                        message = JSON.parse(message);

                        axios.get(Urls.Ebs + '/artists/' + this.auth.channel_id + '/requests/' + message.id)
                             .then(response => {
                                 this.addRequest(response.data);
                             })
                             .catch(error => {
                                 if (error.response.status == 401) {
                                     return swal('Error.', 'Invalid Token!', 'error');
                                 }

                                 return swal('Error.', 'An unexpected error occurred.', 'error');
                             });
                    });
                }

                this.getCurrentRequest();
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

                axios.post(Urls.Ebs + '/artists/' + this.auth.channel_id + '/requests/current', {
                         request_id: id
                     })
                     .then(response => {
                         this.requests.splice(index, 1);
                         this.getCurrentRequest();
                     })
                     .catch(error => {
                         if (error.response.status == 401) {
                             return swal('Error.', 'Invalid Token!', 'error');
                         }

                         return swal('Error.', 'An unexpected error occurred.', 'error');
                     });
            },

            /**
             * Skip a request.
             *
             * @param integer index
             * @param integer id
             */
            skipRequest (index, id) {
                axios.delete(Urls.Ebs + '/artists/' + this.auth.channel_id + '/requests/' + id)
                     .then(response => {
                         this.requests.splice(index, 1);
                     })
                     .catch(error => {
                         if (error.response.status == 401) {
                             return swal('Error.', 'Invalid Token!', 'error');
                         }

                         return swal('Error.', 'An unexpected error occurred.', 'error');
                     });
            }
        }
    }
</script>
