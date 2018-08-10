<template>
    <div class="panel">
        <h2 class="tile">
            <div class="tile-content">Current Queue:</div>
        </h2>
        <section class="queue" v-if="currentRequest || requests.length > 0">
            <ul>
                <li class="active" v-if="currentRequest">
                    <div class="marquee">
                        <div class="inner">
                            {{ currentRequestText }}
                        </div>
                    </div>
                </li>
                <li v-for="(request, index) in requests" :key="request.id">
                    <div class="marquee">
                        <div class="inner">
                            {{ request.song.name }} | Requested by: {{ request.twitch_username }}
                        </div>
                    </div>
                </li>
            </ul>
        </section>
        <section class="text-white" v-else>
            <p class="text-center py-2">There are no requests in the queue.</p>
        </section>
    </div>
</template>

<script>
    import RequestQueue from './../common/RequestQueue.vue';

    export default {
        name: 'QueuePanel',
        extends: RequestQueue
    }
</script>
