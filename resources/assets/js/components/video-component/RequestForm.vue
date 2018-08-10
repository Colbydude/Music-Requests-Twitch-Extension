<template>
    <div id="song-request" class="panel">
        <h2 class="tile">
            <div class="tile-content">Request A Song</div>
        </h2>
        <div class="search-bar">
            <form @submit="submit">
                <input type="text"
                    class="form-control"
                    placeholder="Search user's library"
                    name="search"
                    id="search"
                    autocomplete="off"
                    v-model="query"
                    @keydown.down="down"
                    @keydown.up="up"
                    @keydown.enter="hit"
                    @keydown.esc="reset"
                    @input="search"
                >
                <button class="btn btn-blue-dark btn-sm" type="button" @click="search">
                    <i class="fa fa-search"></i>
                </button>
                <i class="clear fas fa-times-circle" @click="reset" v-if="query.length > 0"></i>
            </form>
        </div>
        <div class="results" v-show="hasItems">
            <h2 class="tile">
                <div class="tile-content">Search Results:</div>
            </h2>
            <section>
                <ul>
                    <li v-for="(item, $item) in items" :key="item.id" :class="activeClass($item)" @mousedown="hit" @mousemove="setActive($item)">
                        <div class="marquee">
                            <div class="inner">
                                {{ item.name }}
                            </div>
                        </div>
                    </li>
                </ul>
            </section>
        </div>
        <div class="results" v-show="!hasItems && query.length >= 3">
            <h2 class="tile">
                <div class="tile-content">Search Results:</div>
            </h2>
            <section class="text-white">
                <p class="text-center py-2">No results found.</p>
            </section>
        </div>
    </div>
</template>

<script>
    import _ from 'lodash';
    import VueTypeahead from 'vue-typeahead';
    import { Urls } from './../../urls';
    import { mapState } from 'vuex';

    export default {
        name: 'RequestForm',
        extends: VueTypeahead,

        data () {
            return {
                // Type Ahead.
                src: null,                  // The source url. Updated on setInfo.
                data: {},                   // The data that would be sent by request.
                limit: 5,                   // Limit the number of items which is shown at the list.
                minChars: 3,                // The minimum character length needed before triggering.
                selectFirst: true,          // Highlight the first item in the list.
                queryParamName: 'search'    // Override the default value (`q`) of query parameter name.
            };
        },

        mounted () {
            this.src = Urls.Ebs + this.client.channel_id + '/songs';
        },

        computed: mapState(['auth', 'client']),

        methods: {
            /**
             * The callback function which is triggered when the user hits on an item
             *
             * @param  {Object}  item
             * @return {void}
             */
            onHit (item) {
                this.requestSong(item.id);
            },

            /**
             * Request the song.
             *
             * @param  {Number}  id
             * @return {void}
             */
            requestSong (id) {
                this.reset();

                this.$http.post(Urls.Ebs + this.client.channel_id + '/requests', {
                    song_id: id,
                    twitch_user_id: this.auth.user_id,
                    twitch_username: this.auth.username
                })
                .catch(error => this.error(error));
            },

            /**
             * Run the vue-typeahead method after debouncing.
             *
             * @return {void}
             */
            search: _.debounce(function (e) {
                this.update();
            }, 300, { 'maxWait': 1000 }),

            /**
             * Quick wrapper around submit so the form won't cause a refresh.
             *
             * @param  {Event}  e
             * @return {void}
             */
            submit (e) {
                e.preventDefault();
            },

            /**
             * Overwrite vue-typeahead update method.
             *
             * @return {void}
             */
            update () {
                this.cancel();

                if (!this.query) {
                    return this.reset();
                }

                if (this.minChars && this.query.length < this.minChars) {
                    return;
                }

                this.loading = true;

                this.fetch().then((response) => {
                    if (response && this.query) {
                        let data = response.data.data;
                        data = this.prepareResponseData ? this.prepareResponseData(data) : data;

                        this.items = this.limit ? data.slice(0, this.limit) : data;
                        this.current = -1;
                        this.loading = false;

                        if (this.selectFirst) {
                            this.down();
                        }
                    }
                });
            }
        }
    }
</script>
