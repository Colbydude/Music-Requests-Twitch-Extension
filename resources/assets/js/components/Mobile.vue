<template>
    <div v-if="booted">
        <div>
            <request-form :rate-limit="rateLimit"></request-form>
            <queue-panel></queue-panel>
        </div>

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
