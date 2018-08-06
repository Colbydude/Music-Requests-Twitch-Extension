<template>
    <div class="form-group">
        <label for="songname">Song Name:</label>
        <div class="input-group">
            <input type="text" name="songname" id="songname" class="form-control" v-model="songname" @keydown.enter="addSong" required>
            <span class="input-group-btn">
                <button type="submit" class="btn btn-primary" @click="addSong">Add</button>
            </span>
        </div>
    </div>
</template>

<script>
    import { EventBus } from './../event-bus';
    import { Urls } from './../urls';
    import { mapState } from 'vuex';

    export default {
        data () {
            return {
                songname: ''    // Song Name input value.
            };
        },

        computed: mapState(['auth']),

        methods: {
            /**
             * Add a song to the catalogue on our backend.
             */
            addSong () {
                if (this.songname.trim() === "") {
                    this.songname = "";
                    return;
                }

                axios.post(Urls.Ebs + '/music-requests/' + this.auth.channel_id + '/songs', {
                    name: this.songname.trim()
                })
                .then(response => {
                    this.songname = "";
                    EventBus.$emit('new-song-added', response.data);
                })
                .catch(error => {
                    if (error.response.status == 401) {
                        return swal('Error.', 'Invalid Token!', 'error');
                    }

                    return swal('Error.', 'An unexpected error occurred.', 'error');
                });
            }
        }
    }
</script>
