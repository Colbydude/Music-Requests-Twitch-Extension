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
                    <input v-model="currentRequestText" class="form-control" type="text" placeholder="No Request Currently" disabled>
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
                                    <button @click="playRequest(request.id)" class="flex-no-shrink btn btn-sm btn-blue-dark ml-1">
                                        <i class="fas fa-fw fa-check"></i>
                                    </button>
                                    <button @click="skipRequest(request.id)" class="flex-no-shrink btn btn-sm btn-red-dark ml-1">
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
    import RequestQueue from './../common/RequestQueue';
    import { Urls } from './../../urls';

    export default {
        name: 'RequestCard',
        extends: RequestQueue,

        methods: {
            /**
             * Clear the entire request list.
             *
             * @return {void}
             */
            clearRequests () {
                this.$http.delete(Urls.Ebs + this.client.channel_id + '/requests')
                .catch(error => this.error(error));
            },

            /**
             * Play the request.
             *
             * @param  {Number}  index
             * @param  {Number}  id
             */
            playRequest (id) {
                this.lastPlayed = this.currentRequest;

                this.$http.post(Urls.Ebs + this.client.channel_id + '/requests/current', {
                    request_id: id
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
            skipRequest (id) {
                this.$http.delete(Urls.Ebs + this.client.channel_id + '/requests/' + id)
                .catch(error => this.error(error));
            }
        }
    }
</script>
