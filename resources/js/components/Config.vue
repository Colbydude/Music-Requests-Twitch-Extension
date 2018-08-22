<template>
    <div class="bg-grey-dark px-4">
        <notifications position="bottom right"></notifications>

        <div class="flex flex-wrap p-4 -mx-4" v-if="client.channel_id && booted">
            <request-card class="w-full lg:w-1/2 px-4 mb-6"></request-card>
            <library-card class="w-full lg:w-1/2 px-4 mb-6"></library-card>

            <div class="w-full lg:w-1/2 px-4 mb-6">
                <div class="card">
                    <div class="card-interior">
                        <div class="card-header">
                            <h3>{{ $t('config.extension_settings') }}</h3>
                        </div>
                        <div class="mb-4">
                            <label for="rate_limit">{{ $t('config.extension_setting_rate_limit') }}</label>
                            <div class="flex items-center">
                                <p class="w-full text-sm">{{ $t('config.extension_setting_rate_limit_help_text') }}</p>
                                <input
                                    type="number"
                                    id="rate_limit"
                                    name="rate_limit"
                                    class="flex-no-shrink form-control ml-2 mr-1"
                                    style="width: 92px;"
                                    v-model="settings.rate_limit"
                                    min="10"
                                    max="3600"
                                >
                                <span class="flex-no-shrink text-xs">{{ $t('common.time.seconds') }}</span>
                            </div>
                        </div>
                        <div class="mb-4">
                            <label for="rate_limit">{{ $t('config.extension_setting_menu_placement') }}</label>
                            <div class="flex items-center">
                                <p class="w-full text-sm">{{ $t('config.extension_setting_menu_placement_help_text') }}</p>
                                <button
                                    class="flex-no-shrink btn btn-outline-blue-dark w-1 ml-2 mr-1"
                                    :class="{active: settings.menu_position == 'left'}"
                                    style="width: 68px;"
                                    @click="settings.menu_position = 'left'"
                                >
                                    {{ $t('config.extension_setting_menu_placement_left') }}
                                </button>
                                <button
                                    class="flex-no-shrink btn btn-outline-blue-dark w-1 ml-1"
                                    :class="{active: settings.menu_position == 'right'}"
                                    style="width: 68px;"
                                    @click="settings.menu_position = 'right'"
                                >
                                    {{ $t('config.extension_setting_menu_placement_right') }}
                                </button>
                            </div>
                        </div>
                        <div class="mb-4">
                            <button class="btn btn-blue-dark" @click="saveSettings">{{ $t('config.extension_settings_save') }}</button>
                        </div>
                    </div>
                </div>
            </div>

            <div class="w-full lg:w-1/2 px-4 mb-6">
                <div class="card">
                    <div class="card-interior">
                        <div class="card-header">
                            <h3>{{ $t('config.streamer_widget') }}</h3>
                        </div>
                        <div class="mb-4">
                            <p class="mb-2">{{ $t('config.streamer_widget_help_text') }}</p>
                            <p><code>{{ widgetUrl }}</code></p>
                        </div>
                    </div>
                </div>
            </div>
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

        computed: {
            /**
             * Displays the current request widget url.
             *
             * @return {String}
             */
            widgetUrl () {
                return Urls.Ebs.replace('api/music-requests/', '') + this.auth.username + '/requests/current';
            },

            ...mapState(['auth', 'client'])
        },

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

                    if (this.settings == null) {
                        this.settings = {
                            rate_limit: 600,
                            menu_position: 'left'
                        };
                    }

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
                .then(response => {
                    this.$notify(this.$t('notifications.extension_settings_saved'));
                })
                .catch(error => this.error(error));
            }
        }
    }
</script>
