<template>
    <div class="bg-grey-dark px-4" v-if="finishedLoading">
        <notifications position="bottom right" />

        <div class="flex flex-wrap p-4 -mx-4" v-if="finishedLoading">
            <request-card class="w-full lg:w-1/2 px-4 mb-6" />
            <library-card class="w-full lg:w-1/2 px-4 mb-6" />

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
                            <label for="language">{{ $t('config.extension_setting_language') }}</label>
                            <div class="flex items-center">
                                <p class="w-full text-sm">{{ $t('config.extension_setting_language_help_text') }}</p>
                                <select
                                    id="language"
                                    name="language"
                                    class="flex-no-shrink form-control ml-2 mr-1"
                                    style="width: 151px;"
                                    v-model="settings.language"
                                    @change="e => changeLocale(e.target.value)"
                                >
                                    <option value="en">English</option>
                                    <option value="es">Español</option>
                                </select>
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
        <h1 v-else>Loading...</h1>
    </div>
</template>

<script>
    import LibraryCard from '@/components/config/LibraryCard';
    import RequestCard from '@/components/config/RequestCard';
    import Twitch from '@/mixins/Twitch';

    export default {
        name: 'Config',

        components: {
            LibraryCard,
            RequestCard
        },

        mixins: [
            Twitch
        ],

        data () {
            return {
                loadingCallbacks: [
                    this.fetchSettings
                ],
                settings: {
                    language: 'en',
                    rate_limit: 600
                }
            };
        },

        computed: {
            /**
             * Displays the current request widget url.
             *
             * @return {String}
             */
            widgetUrl() {
                return `https://twitch.colbydude.com/${this.auth.username}/requests/current`;
            }
        },

        methods: {
            /**
             * Change the locale for the extension.
             *
             * @param  {String}  locale
             * @return {Void}
             */
            changeLocale(locale) {
                this.$i18n.locale = locale;
            },

            /**
             * Fetch settings from the EBS.
             *
             * @return {Void}
             */
            fetchSettings() {
                this.$api.Ebs.getSettings({
                    username: this.auth.username
                })
                .then(response => {
                    this.settings = { ...this.settings, ...response.data.settings };
                    this.changeLocale(this.settings.language);
                })
                .catch(error => {
                    // If we can't find the user, register it.
                    if (error.response.status == 404) {
                        return this.register();
                    }

                    console.log(error);
                });
            },

            /**
             * Register the user in our EBS.
             *
             * @return {Void}
             */
            register() {
                this.$api.Ebs.postSettings()
                .then(response => {
                    this.settings = { ...this.settings, ...response.data.settings };
                })
                .catch(error => console.log(error));
            },

            /**
             * Save the user's settings.
             *
             * @return {Void}
             */
            saveSettings() {
                this.$api.Ebs.putSettings(this.settings)
                .then(response => {
                    this.$notify(this.$t('notifications.extension_settings_saved'));
                })
                .catch(error => console.log(error));
            }
        }
    }
</script>
