<template>
    <div id="extension-overlay" @mouseover="buttonActive = true" @mouseleave="buttonActive = false">
        <div class="menu-container">
            <div class="menu" v-if="menuActive && client.channel_id">
                <request-form></request-form>
                <div class="panel">
                    <h2 class="tile">
                        <div class="tile-content">Current Queue:</div>
                    </h2>
                    <section class="queue">
                        <ul>
                        </ul>
                    </section>
                </div>
            </div>

            <button class="btn btn-blue-dark btn-menu" @click="toggleMenu">
                <i class="fas fa-fw fa-times" v-if="menuActive"></i>
                <i class="fas fa-fw fa-music" v-else></i>
            </button>
        </div>
    </div>
</template>

<script>
    import RequestForm from './video-component/RequestForm';
    import { mapState } from 'vuex';

    export default {
        name: 'VideoComponent',

        components: {
            RequestForm
        },

        data () {
            return {
                buttonActive: false,
                menuActive: false
            };
        },

        computed: mapState(['client']),

        methods: {
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
