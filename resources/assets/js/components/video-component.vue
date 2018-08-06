<template>
    <div id="extension-overlay" @mouseover="buttonActive = true" @mouseleave="buttonActive = false">
        <div class="menu-container">
            <div class="menu" v-if="menuActive">
                <div id="song-request" class="panel">
                    <h2 class="tile">
                        <div class="tile-content">Request A Song</div>
                    </h2>
                    <div class="search-bar">
                        <form @submit="search">
                            <input type="text" v-model="input" class="form-control" placeholder="Search user's library">
                            <button class="btn btn-blue-dark btn-small">
                                <i class="fa fa-search"></i>
                            </button>
                            <i class="clear fas fa-times-circle" @click="clear" v-if="input.length > 0"></i>
                        </form>
                    </div>
                    <div class="queue">
                        <h2 class="tile">
                            <div class="tile-content">Current Queue:</div>
                        </h2>
                        <section>
                            <ul>
                            </ul>
                        </section>
                    </div>
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
    export default {
        data () {
            return {
                buttonActive: false,
                input: '',
                menuActive: false
            };
        },

        methods: {
            /**
             * Clear the input.
             *
             * @return {void}
             */
            clear () {
                this.input = '';
            },

            /**
             * Search for a song in the library.
             *
             * @return {void}
             */
            search (event) {
                event.preventDefault();
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
