<template>
    <div v-if="booted">
        <template v-if="auth.user_id">
            <request-form :rate-limit="rateLimit"></request-form>
            <queue-panel></queue-panel>
        </template>
        <template v-else>
            <p class="p-4 text-white text-center">Grant access in <i class="fas fa-puzzle-piece"></i> to make requests!</p>
        </template>

        <notifications group="video-notifications" position="bottom left"></notifications>
    </div>
</template>

<script>
    import VideoComponent from './VideoComponent';

    export default {
        name: 'Mobile',
        extends: VideoComponent
    }
</script>
