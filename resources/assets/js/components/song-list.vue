<template>
    <div class="panel panel-default">
        <div class="panel-heading"><h4 class="panel-title">Songs</h4></div>
        <div class="scrollable">
            <table class="table table-condensed table-striped">
                <thead>
                    <tr>
                        <th>Song</th>
                        <th>&nbsp;</th>
                    </tr>
                </thead>
            </table>
            <div class="body">
                <table class="table table-condensed table-striped">
                    <tbody>
                        <tr v-for="(song, index) in songs">
                            <td>{{ song.name }}</td>
                            <td class="text-right">
                                <!--<button class="btn btn-warning btn-xs"><span class="fa fa-pencil"></span></button>-->
                                <button class="btn btn-danger btn-xs" @click="removeSong(index, song.id)"><span class="fa fa-trash"></span></button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>

<script>
    import { EventBus } from './../event-bus';
    import { Urls } from './../urls';
    import { mapState } from 'vuex';

    export default {
        mounted () {
            EventBus.$on('new-song-added', this.addSong);
            EventBus.$on('config-ready', this.getSongs)
        },

        data () {
            return {
                songs: []   // Artist's catalog of songs.
            };
        },

        computed: mapState(['auth']),

        methods: {
            /**
             * Add a song to (the beginning of) the list.
             *
             * @param Song songObject
             */
            addSong (songObject) {
                this.songs.unshift(songObject);
            },

            /**
             * Get the artist's song catalog from our backend.
             */
            getSongs () {
                axios.get(Urls.Ebs + '/artists/' + this.auth.channel_id + '/songs')
                     .then(response => {
                         this.songs = response.data;
                     })
                     .catch(error => {
                         if (error.response.status == 401) {
                             return swal('Error.', 'Invalid Token!', 'error');
                         }

                         return swal('Error.', 'An unexpected error occurred.', 'error');
                     });
            },

            /**
             * Remove a song from the artist's catalog.
             *
             * @param integer index
             * @param integer id
             */
            removeSong (index, id) {
                axios.delete(Urls.Ebs + '/artists/' + this.auth.channel_id + '/songs/' + id)
                     .then(response => {
                         this.songs.splice(index, 1);
                         EventBus.$emit('song-deleted', id);
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
