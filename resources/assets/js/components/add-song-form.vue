<template>
    <div class="form-group">
        <label for="songname">Song Name:</label>
        <div class="input-group">
            <input type="text" name="songname" id="songname" class="form-control" v-model="songname" v-on:keyup="processForm" required>
            <span class="input-group-btn">
                <button type="submit" class="btn btn-primary" v-on:click="addSong">Add</button>
            </span>
        </div>
    </div>
</template>

<script>
    import { Config } from './../config';
    import { EventBus } from './../event-bus';

    export default {
        mounted () {
            EventBus.$on('app-ready', this.setUser);
        },

        data () {
            return {
                channelId: null,    // Channel ID our frontend is being served on.
                songname: ''        // Song Name input value.
            };
        },

        methods: {
            /**
             * Add a song to the artist's catalog on our backend.
             */
            addSong () {
                if (this.songname.trim() === "") {
                    this.songname = "";
                    return;
                }

                axios.post(Config.Url + '/artists/' + this.channelId + '/songs', {
                    name: this.songname
                })
                .then(response => {
                    this.songname = "";
                    EventBus.$emit('new-song-added', response.data);
                });
            },

            /**
             * Add a song on hitting "enter."
             */
            processForm (event) {
                if (event.keyCode == 13) {
                    this.addSong();
                }
            },

            /**
             * Set the channel ID on initialization.
             *
             * @param integer channelId
             */
            setUser (channelId) {
                this.channelId = channelId;
            }
        }
    }
</script>
