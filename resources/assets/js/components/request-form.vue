<template>
    <div>
        <div class="form-group has-feedback">
            <label for="songsearch">Song Name:</label>
            <input type="text"
                name="songsearch"
                id="songsearch"
                placeholder="Search for a song..."
                autocomplete="off"
                class="form-control"
                v-model="query"
                @keydown.down="down"
                @keydown.up="up"
                @keydown.enter="hit"
                @keydown.esc="reset"
                @input="update"/>

            <span class="form-control-feedback fa fa-spinner fa-spin" v-if="loading"></span>
            <template v-else>
                <span class="form-control-feedback fa fa-search" v-show="isEmpty"></span>
            </template>
        </div>
        <ul class="list-group request-results" v-show="hasItems">
            <li v-for="(item, $item) in items" :class="['list-group-item', activeClass($item)]" @mousedown="hit" @mousemove="setActive($item)">
                {{ item.name }}
            </li>
        </ul>
    </div>
</template>

<script>
    import { EventBus } from './../event-bus';
    import { Urls } from './../urls';
    import { mapState } from 'vuex';
    import VueTypeahead from 'vue-typeahead'

    export default {
        extends: VueTypeahead,

        mounted () {
            this.src = Urls.Ebs + '/artists/' + this.auth.channel_id + '/songs';
        },

        data () {
            return {
                // Type Ahead.
                src: null,                  // The source url. Updated on setInfo.
                data: {},                   // The data that would be sent by request.
                limit: 5,                   // Limit the number of items which is shown at the list.
                minChars: 3,                // The minimum character length needed before triggering.
                selectFirst: false,         // Highlight the first item in the list.
                queryParamName: 'search'    // Override the default value (`q`) of query parameter name.
            }
        },

        computed: mapState(['auth']),

        methods: {
            /**
             * The callback function which is triggered when the user hits on an item
             *
             * @param item
             */
            onHit (item) {
                this.requestSong(item.id);
            },

            /**
             * Request the song.
             *
             * @param integer songId
             */
            requestSong (songId) {
                axios.post(Urls.Ebs + '/artists/' + this.auth.channel_id + '/requests', {
                         song_id: songId,
                         twitch_user_id: this.auth.user_id,
                         twitch_user_name: this.auth.username
                     })
                     .then(response => {
                         this.reset();

                         swal({
                             title: 'Song Requested!',
                             text: 'The broadcaster will be notified shortly.',
                             type: 'success',
                             timer: 2000,
                             showConfirmButton: false
                         }).then(
                            function () {},
                            function (dismiss) {
                                //
                            }
                        );
                     })
                     .catch(error => {
                         if (error.response.status == 401) {
                             return swal('Error.', 'Invalid Token!', 'error');
                         }

                         return swal('Error.', 'An unexpected error occurred.', 'error');
                     })
            }
        }
    }
</script>
