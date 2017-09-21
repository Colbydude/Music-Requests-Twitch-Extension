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
    import { Config } from './../config';
    import { EventBus } from './../event-bus';
    import twitchExt from './../twitchExt';
    import VueTypeahead from 'vue-typeahead'

    export default {
        extends: VueTypeahead,

        mounted () {
            EventBus.$on('authentication-verified', this.setInfo);
        },

        data () {
            return {
                channelId: null,            // Channel ID our frontend is being served on.
                clientId: null,             // Twitch Extension's Client ID.
                userId: null,               // ID of the currently auth'd user.
                userName: null,             // Username of the currently auth'd user.

                // Type Ahead.
                src: null,                  // The source url. Updated on setInfo.
                data: {},                   // The data that would be sent by request.
                limit: 5,                   // Limit the number of items which is shown at the list.
                minChars: 3,                // The minimum character length needed before triggering.
                selectFirst: false,         // Highlight the first item in the list.
                queryParamName: 'search'    // Override the default value (`q`) of query parameter name.
            }
        },

        methods: {
            /**
             * Gets user data from the Twitch API then call to create the request.
             */
            getUserData () {
                axios.create({
                    headers: {'Client-ID': this.clientId}
                }).get(Config.TwitchApi + '/helix/users?id=' + this.userId)
                  .then(response => {
                      this.userName = response.data.data[0].display_name;
                  })
                  .catch(error => {
                      console.log(error);
                      //alert('Twitch API error.');
                  });
            },

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
                axios.post(Config.Url + '/artists/' + this.channelId + '/requests', {
                         song_id: songId,
                         twitch_user_id: this.userId,
                         twitch_user_name: this.userName
                     })
                     .then(response => {
                         // Send whisper pubsub to update the broadcaster's request list in real-time.
                         Twitch.ext.send('whisper-U' + this.channelId, 'application/json', response.data);

                         this.reset();

                         swal({
                             title: "Song Requested!",
                             text: "The broadcaster will be notified shortly.",
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
                         console.log(error);
                     })
            },

            /**
             * Sets the info from the auth object on initialization.
             *
             * @param Auth auth
             */
            setInfo (auth) {
                this.channelId = auth.channelId;
                this.clientId = auth.clientId;
                this.src = Config.Url + '/artists/' + this.channelId + '/songs';
                this.userId = auth.userId.substr(1);

                this.getUserData();
            }
        }
    }
</script>
