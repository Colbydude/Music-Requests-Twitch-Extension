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
                    :disabled="onCooldown"
                    @keydown.down="down"
                    @keydown.up="up"
                    @keydown.enter="hit"
                    @keydown.esc="reset"
                    @input="search"
                >
                <button class="btn btn-blue-dark btn-sm" type="button" @click="search" v-if="!onCooldown">
                    <i class="fa fa-search"></i>
                </button>
                <i class="clear fas fa-times-circle" @click="reset" v-if="query.length > 0 && !onCooldown"></i>
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
        <div class="results" v-show="!hasItems && !onCooldown && query.length >= minChars">
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

        props: {
            rateLimit: {
                type: Number,
                default: 60
            }
        },

        data () {
            return {
                // vue-typeahead.
                src: null,                  // The source url. Updated on setInfo.
                data: {},                   // The data that would be sent by request.
                limit: 5,                   // Limit the number of items which is shown at the list.
                minChars: 3,                // The minimum character length needed before triggering.
                selectFirst: true,          // Highlight the first item in the list.
                queryParamName: 'search',   // Override the default value (`q`) of query parameter name.

                onCooldown: false
            };
        },

        mounted () {
            this.src = Urls.Ebs + this.client.channel_id + '/songs';
        },

        computed: mapState(['auth', 'client']),

        methods: {
            /**
             * Display the proper cooldown text.
             *
             * @param  {Number}  time (in ms)
             * @return {String}
             */
            cooldownText (time) {
                let units = 'seconds';

                // Convert ms to minutes or seconds.
                if (time > (1000 * 60)) {
                    units = 'minutes';
                    time = Math.floor((time % (1000 * 60 * 60)) / (1000 * 60));
                }
                else {
                    time = Math.floor((time % (1000 * 60)) / 1000);
                }

                // Cheaply get the singular of the string.
                if (time == 1) {
                    units = units.substring(0, units.length - 1);
                }

                return `Wait ${time} ${units} to request again.`;
            },

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
                if (this.onCooldown || this.cooldown > 0) {
                    return;
                }

                this.reset();

                this.$http.post(Urls.Ebs + this.client.channel_id + '/requests', {
                    song_id: id,
                    twitch_user_id: this.auth.user_id,
                    twitch_username: this.auth.username
                })
                .then(response => this.startCooldown())
                .catch(error => this.error(error));
            },

            /**
             * Debounce update so we're not spamming on input/submit.
             *
             * @return {void}
             */
            search: _.debounce(function (e) {
                this.update();
            }, 300, { 'maxWait': 1000 }),

            /**
             * Start the rate limit cooldown.
             *
             * @return {void}
             */
            startCooldown () {
                this.onCooldown = true;
                this.query = this.cooldownText(this.rateLimit - 1000);
                let cooldownEndTime = new Date().getTime() + this.rateLimit;

                let cooldownInterval = setInterval(() => {
                    let now = new Date().getTime();
                    let distance = cooldownEndTime - now;

                    this.query = this.cooldownText(distance);

                    if (distance <= 0) {
                        clearInterval(cooldownInterval);
                        this.onCooldown = false;
                        this.query = '';
                    }
                }, 1000);
            },

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
