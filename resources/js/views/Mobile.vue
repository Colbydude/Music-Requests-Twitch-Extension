<template>
    <div v-if="finishedLoading">
        <template v-if="auth.user_id">
            <!-- <request-form :rate-limit="rateLimit" /> -->
            <!-- <queue-panel /> -->
        </template>
        <template v-else>
            <p class="p-4 text-white text-center">
                {{ $t('viewer.grant_permissions_1') }} <i class="fas fa-puzzle-piece"></i> {{ $t('viewer.grant_permissions_2') }}
            </p>
        </template>

        <notifications group="video-notifications" position="bottom left" />
    </div>
</template>

<script>
    import Twitch from './../mixins/Twitch';

    export default {
        name: 'Mobile',

        mixins: [
            Twitch
        ]
    }
</script>
