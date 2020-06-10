<template>
    <div>
        <div class="card">
            <div class="card-interior">
                <div class="card-header">
                    <h3>{{ $t('config.requests') }}</h3>
                </div>
                <div class="mb-4">
                    <label for="current_request">
                        {{ $t('config.requests_current_request') }}
                    </label>
                    <input v-model="currentRequestText" class="form-control" type="text" :placeholder="$t('config.requests_current_request_placeholder')" disabled>
                </div>
                <div class="border-t border-b rounded sm:border">
                    <div class="border-b">
                        <div class="flex items-center px-4 -mb-px">
                            <h4 class="w-full font-normal py-4 font-semibold text-lg">{{ $t('common.queue') }}</h4>
                            <button @click="clearRequests" class="flex-no-shrink btn btn-sm btn-red-dark ml-2">{{ $t('common.clear') }}</button>
                        </div>
                    </div>
                    <div class="border-b">
                        <div class="flex px-4 py-2">
                            <div class="w-full text-sm font-bold mr-1">{{ $t('common.song') }}</div>
                            <template v-if="settings.group_requests">
                                <div class="flex-no-shrink text-sm text-right font-bold ml-1 mr-1">{{ $t('common.amount') }}</div>
                            </template>
                            <div class="flex-no-shrink text-sm text-right font-bold ml-1 mr-1">{{ $t('common.requested_by') }}</div>
                            <div class="flex-no-shrink text-sm text-right font-bold ml-1">{{ $t('common.actions') }}</div>
                        </div>
                    </div>
                    <div v-if="requests.length > 0">
                        <div class="list-wrap">
                            <div class="list-item" v-for="(request, index) in requests" :key="request.id">
                                <div class="flex px-4 py-2 items-center">
                                    <div class="w-full text-sm mr-1">{{ request.song.name }}</div>
                                    <template v-if="settings.group_requests">
                                        <div class="flex-no-shrink text-sm text-right font-semibold ml-1 mr-1">{{ request.amount }}</div>
                                    </template>
                                    <div class="flex-no-shrink text-sm text-right font-semibold ml-1 mr-1">{{ request.twitch_username.split(',').join(', ') }}</div>
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
                            <p class="text-center py-2">{{ $t('config.requests_empty') }}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import RequestQueue from '@/components/common/RequestQueue';

    export default {
        name: 'RequestCard',
        extends: RequestQueue,

        props: {
            settings: {
                type: Object,
                required: true
            }
        },

        methods: {
            /**
             * Clear the entire request list.
             *
             * @return {void}
             */
            clearRequests () {
                this.$api.Ebs.deleteRequests()
                .catch(error => logger(error));
            },

            /**
             * Play the request.
             *
             * @param  {Number}  index
             * @param  {Number}  id
             */
            playRequest (id) {
                this.$api.Ebs.postCurrentRequest(id)
                .catch(error => logger(error));
            },

            /**
             * Skip the request.
             *
             * @param  {Number}  index
             * @param  {Number}  id
             * @return {void}
             */
            skipRequest (id) {
                this.$api.Ebs.deleteRequest(id)
                .catch(error => logger(error));
            }
        }
    }
</script>
