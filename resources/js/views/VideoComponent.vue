<template>
    <div class="viewer-wrapper">
        <viewer
            :auth="auth"
            :finished-loading="finishedLoading"
            :settings="settings"
            :twitch="twitch"
        />

        <notifications group="video-notifications" position="bottom left" />
    </div>
</template>

<script>
    import Twitch from '@/mixins/Twitch';
    import Viewer from '@/components/Viewer';

    export default {
        name: 'VideoComponent',

        components: {
            Viewer
        },

        mixins: [
            Twitch
        ],

        data() {
            return {
                settings: {
                    language: 'en',
                    rate_limit: 600
                }
            };
        },

        methods: {
            /**
             * Boot the component on authorization.
             *
             * @return {Void}
             */
            boot() {
                this.fetchSettings()
                .then(() => this.finishedLoading = true);
            },

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
                return this.$api.Ebs.getSettings({
                    username: this.auth.username
                })
                .then(response => {
                    this.settings = { ...this.settings, ...response.data.settings };
                    this.changeLocale(this.settings.language);
                })
                .catch(error => logger(error));
            },
        }
    }
</script>
