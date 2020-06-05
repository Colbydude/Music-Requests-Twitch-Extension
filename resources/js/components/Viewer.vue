<template>
    <div class="viewer" v-if="finishedLoading">
        <request-form
            :auth="auth"
            :rate-limit="this.rateLimit"
            v-if="auth.user_id"
        />
        <div class="text-center" v-else>
            <p class="p-4 text-white">
                {{ $t('viewer.grant_permissions') }}
            </p>
            <p>
                <button class="btn btn-blue-dark" @click="askForAuth">{{ $t('common.click_here') }}</button>
            </p>
        </div>
        <queue-panel :settings="settings" style="overflow: auto;" />
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
            askForAuth: {
                type: Function,
                required: true
            },
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
