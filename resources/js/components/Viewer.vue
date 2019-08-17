<template>
    <div class="viewer" v-if="finishedLoading">
        <request-form
            :auth="auth"
            :rate-limit="this.rateLimit"
            v-if="auth.user_id"
        />
        <p class="p-4 text-white text-center" v-else>
            {{ $t('viewer.grant_permissions_1') }} <i class="fas fa-cog"></i> {{ $t('viewer.grant_permissions_2') }}
        </p>
        <queue-panel style="overflow: auto;" />
    </div>
</template>

<script>
    import QueuePanel from './viewer/QueuePanel';
    import RequestForm from './viewer/RequestForm';

    export default {
        name: 'Viewer',

        components: {
            QueuePanel,
            RequestForm
        },

        props: {
            auth: {
                type: Object,
                required: true
            },
            finishedLoading: {
                type: Boolean,
                required: true
            },
            settings: {
                type: Object,
                required: true
            },
            twitch: {
                type: Object,
                required: true
            }
        },

        computed: {
            /**
             * How often the user can submit requests.
             *
             * @return {Number}
             */
            rateLimit () {
                return parseInt(this.settings.rate_limit) * 1000;
            }
        }
    }
</script>
