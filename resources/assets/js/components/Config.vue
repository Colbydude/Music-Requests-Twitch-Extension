<template>
    <div class="px-4">
        <div class="flex flex-wrap p-4 -mx-4" v-if="client.channel_id && booted">
            <!-- Current Request -->
            <request-card class="w-full lg:w-1/2 px-4"></request-card>

            <!-- Song Library -->
            <library-card class="w-full lg:w-1/2 px-4"></library-card>
        </div>
    </div>
</template>

<script>
    import LibraryCard from './config/LibraryCard';
    import RequestCard from './config/RequestCard';
    import { Urls } from './../urls';
    import { mapState } from 'vuex';

    export default {
        name: 'Config',

        components: {
            LibraryCard,
            RequestCard
        },

        data () {
            return {
                booted: false,  // Whether or not the config has booted.
                settings: {}    // Broadcaster's extension settings.
            };
        },

        computed: mapState(['auth', 'client']),

        created () {
            EventBus.$on('authenticated', this.fetchSettings);
        },

        methods: {
            /**
             * Fetch settings.
             *
             * @return {void}
             */
            fetchSettings () {
                this.$http.get(Urls.Ebs + this.client.channel_id, {
                    params: {
                        username: this.auth.username
                    }
                })
                .then(response => {
                    this.settings = response.data.settings;
                    this.booted = true;
                })
                .catch(error => {
                    // If we can't find the user, register it.
                    if (error.response.status == 404) {
                        return this.register();
                    }

                    this.error(error);
                });
            },

            /**
             * Register the user in our EBS.
             *
             * @return {void}
             */
            register () {
                this.$http.post(Urls.Ebs, {
                    channel_id: this.client.channel_id,
                    username: this.auth.username
                })
                .then(response => {
                    this.settings = response.data.settings;
                    this.booted = true;
                })
                .catch(error => this.error(error));
            },

            /**
             * Save the user's settings.
             *
             * @return {void}
             */
            saveSettings () {
                this.$http.put(Urls.Ebs + this.client.channel_id, this.settings)
                .catch(error => this.error(error));
            }
        }
    }
</script>
