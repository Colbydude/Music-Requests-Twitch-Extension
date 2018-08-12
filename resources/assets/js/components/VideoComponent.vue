<template>
    <div id="extension-overlay" @mouseover="buttonActive = true" @mouseleave="buttonActive = false" v-if="booted">
        <div class="menu-container" :class="settings.menu_position">
            <div class="menu" v-show="menuActive">
                <request-form :rate-limit="rateLimit"></request-form>
                <queue-panel></queue-panel>
            </div>

            <button class="btn btn-blue-dark btn-menu" @click="toggleMenu">
                <i class="fas fa-fw fa-times" v-if="menuActive"></i>
                <i class="fas fa-fw fa-music" v-else></i>
            </button>
        </div>
    </div>
</template>

<script>
    import QueuePanel from './video-component/QueuePanel';
    import RequestForm from './video-component/RequestForm';
    import { Urls } from './../urls';
    import { mapState } from 'vuex';

    export default {
        name: 'VideoComponent',

        components: {
            QueuePanel,
            RequestForm
        },

        data () {
            return {
                booted: false,          // Whether or not the config has booted.
                buttonActive: false,    // Whether or not the button is visible.
                menuActive: false,      // Whether or not the menu is visible.
                settings: null          // The broadcaster's extension settings.
            };
        },

        computed: {
            /**
             * How often the user can submit requests.
             *
             * @return {Number}
             */
            rateLimit () {
                return parseInt(this.settings.rate_limit) * 1000;
            },

            ...mapState(['client'])
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
                this.$http.get(Urls.Ebs + this.client.channel_id)
                .then(response => {
                    this.settings = response.data.settings;
                    this.booted = true;
                })
                .catch(error => this.error(error));
            },

            /**
             * Toggles the menu.
             *
             * @return {void}
             */
            toggleMenu () {
                this.menuActive = !this.menuActive;
            }
        }
    }
</script>
