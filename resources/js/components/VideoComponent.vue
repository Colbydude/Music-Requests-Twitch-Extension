<template>
    <div id="extension-overlay" @mouseover="buttonActive = true" @mouseleave="buttonActive = false" v-if="booted">
        <div class="menu-container" :class="settings.menu_position" v-if="auth.user_id">
            <transition name="fade">
                <div class="menu" v-show="menuActive && buttonActive">
                    <request-form :rate-limit="rateLimit"></request-form>
                    <queue-panel></queue-panel>
                </div>
            </transition>

            <transition name="fade">
                <button class="btn btn-blue-dark btn-menu" @click="toggleMenu" v-show="buttonActive">
                    <i class="fas fa-fw fa-times" v-if="menuActive"></i>
                    <i class="fas fa-fw fa-music" v-else></i>
                </button>
            </transition>
        </div>
        <div class="menu-container" :class="settings.menu_position" v-else>
            <transition name="fade">
                <div class="menu flex items-center p-4" style="height: 64px;" v-show="buttonActive">
                    <p class="text-white text-center">
                        {{ $t('viewer.grant_permissions_1') }} <i class="fas fa-puzzle-piece"></i> {{ $t('viewer.grant_permissions_2') }}
                    </p>
                </div>
            </transition>

            <transition name="fade">
                <button class="btn btn-blue-dark btn-menu" v-show="buttonActive" disabled>
                    <i class="fas fa-fw fa-music"></i>
                </button>
            </transition>
        </div>

        <notifications group="video-notifications" position="bottom" :class="settings.menu_position"></notifications>
    </div>
</template>

<script>
    import QueuePanel from './viewer/QueuePanel';
    import RequestForm from './viewer/RequestForm';
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
                this.$http.get(Urls.Ebs + this.client.channel_id)
                .then(response => {
                    this.settings = response.data.settings;

                    if (this.settings == null) {
                        this.settings = {
                            rate_limit: 600,
                            menu_position: 'left'
                        }
                    }

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
