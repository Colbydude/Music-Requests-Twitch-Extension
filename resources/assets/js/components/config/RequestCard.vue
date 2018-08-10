<template>
    <div>
        <div class="card">
            <div class="card-interior">
                <div class="card-header">
                    <h3>Requests</h3>
                </div>
                <div class="mb-4">
                    <label for="current_request">
                        Current Request
                    </label>
                    <input v-model="currentRequest" class="form-control" type="text" placeholder="No Request Currently" disabled>
                </div>
                <div class="border-t border-b rounded sm:border">
                    <div class="border-b">
                        <div class="flex items-center px-4 -mb-px">
                            <h4 class="w-full font-normal py-4 font-semibold text-lg">Queue</h4>
                            <button @click="clearRequests" class="flex-no-shrink btn btn-sm btn-red-dark ml-2">Clear</button>
                        </div>
                    </div>
                    <div class="border-b">
                        <div class="flex px-4 py-2">
                            <div class="w-full text-sm font-bold">Song</div>
                            <div class="flex-no-shrink text-sm font-bold ml-2 mr-1">Requested By</div>
                            <div class="flex-no-shrink text-sm font-bold ml-1">Actions</div>
                        </div>
                    </div>
                    <div v-if="requests.length > 0">
                        <div class="list-wrap">
                            <div class="list-item" v-for="(request, index) in requests" :key="request.id">
                                <div class="flex px-4 py-2 items-center">
                                    <div class="w-full text-sm">{{ request.song.name }}</div>
                                    <div class="flex-no-shrink text-sm font-semibold ml-2 mr-1">{{ request.twitch_username }}</div>
                                    <button @click="playRequest(index, request.id)" class="flex-no-shrink btn btn-sm btn-blue-dark ml-1">
                                        <i class="fas fa-fw fa-check"></i>
                                    </button>
                                    <button @click="skipRequest(index, request.id)" class="flex-no-shrink btn btn-sm btn-red-dark ml-1">
                                        <i class="fas fa-fw fa-times"></i>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div v-else>
                        <div class="list-wrap">
                            <p class="text-center py-2">There are no requests in the queue.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import { Urls } from './../../urls';
    import { mapState } from 'vuex';

    export default {
        name: 'RequestCard',

        data () {
            return {
                currentRequest: '', // Value of the current request textbox.
                lastPlayed: null,   // The last played request,
                requests: []        // The request queue.
            };
        },

        computed: mapState(['client']),

        created () {
            this.getCurrentRequest();
            this.getRequests();
            this.listen();
        },

        beforeDestroy () {
            this.unlisten();
        },

        methods: {
            /**
             * Add a request to the list.
             *
             * @param  {Object}  request
             * @return {void}
             */
            addRequest (request) {
                this.requests.push(request);
            },

            /**
             * Clear the entire request list.
             *
             * @return {void}
             */
            clearRequests () {
                this.$http.delete(Urls.Ebs + this.client.channel_id + '/requests')
                .then(response => {
                    this.requests = [];
                    this.currentRequest = '';
                })
                .catch(error => this.error(error));
            },

            /**
             * Get the current request.
             *
             * @return {void}
             */
            getCurrentRequest () {
                this.$http.get(Urls.Ebs + this.client.channel_id + '/requests/current')
                .then(response => {
                    if (!_.isEmpty(response.data)) {
                        this.currentRequest = response.data;
                    }
                })
                .catch(error => this.error(error));
            },

            /**
             * Get the requests from our backend.
             *
             * @return {void}
             */
            getRequests () {
                this.$http.get(Urls.Ebs + this.client.channel_id + '/requests')
                .then(response => this.requests = response.data)
                .catch(error => this.error(error));
            },

            /**
             * Begin listening for Twitch PubSub events.
             *
             * @return {void}
             */
            listen () {
                if (Twitch.ext && !this.isListening) {
                    this.isListening = true;

                    Twitch.ext.listen('broadcast', (target, contentType, message) => {
                        message = JSON.parse(message);
                        logger(message);

                        this.addRequest(message);
                    });
                }
            },

            /**
             * Play the request.
             *
             * @param  {Number}  index
             * @param  {Number}  id
             */
            playRequest (index, id) {
                this.lastPlayed = this.requests[index];

                this.$http.post(Urls.Ebs + this.client.channel_id + '/requests/current', {
                    request_id: id
                })
                .then(response => {
                    this.requests.splice(index, 1);
                    this.getCurrentRequest();
                })
                .catch(error => this.error(error));
            },

            /**
             * Skip the request.
             *
             * @param  {Number}  index
             * @param  {Number}  id
             * @return {void}
             */
            skipRequest (index, id) {
                this.$http.delete(Urls.Ebs + this.client.channel_id + '/requests/' + id)
                .then(response => this.requests.splice(index, 1))
                .catch(error => this.error(error));
            },

            /**
             * Stop listening for Twitch PubSub events.
             *
             * @return {void}
             */
            unlisten () {
                if (Twitch.ext && this.isListening) {
                    this.isListening = false;
                    Twitch.ext.unlisten('broadcast');
                }
            }
        }
    }
</script>
