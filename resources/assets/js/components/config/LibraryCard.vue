<template>
    <div>
        <div class="card">
            <div class="card-interior">
                <div class="card-header">
                    <h3>Library</h3>
                </div>
                <div class="mb-4">
                    <label for="current_request">
                        Add a Song
                    </label>
                    <div class="flex">
                        <input @keydown.enter="submit" v-model="input" class="form-control w-full" type="text">
                        <button @click="submit" class="flex-no-shrink btn btn-blue-dark ml-2">
                            Add
                        </button>
                    </div>
                </div>
                <div class="border-t border-b rounded sm:border">
                    <div class="border-b">
                        <div class="flex px-4 -mb-px">
                            <h4 class="font-normal py-4 font-semibold text-lg">Songs</h4>
                        </div>
                    </div>
                    <div class="border-b">
                        <div class="flex px-4 py-2">
                            <div class="w-full text-sm font-bold">Song</div>
                            <div class="flex-no-shrink text-sm font-bold ml-2">Actions</div>
                        </div>
                    </div>
                    <div v-if="library.length > 0">
                        <div class="list-wrap">
                            <div class="list-item" v-for="(song, index) in library" :key="song.id">
                                <div class="flex px-4 py-2 items-center">
                                    <div class="w-full text-sm">{{ song.name }}</div>
                                    <button @click="removeSong(index, song.id)" class="flex-no-shrink btn btn-sm btn-red-dark ml-2">
                                        <i class="fas fa-fw fa-trash"></i>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div v-else>
                        <div class="list-wrap">
                            <p class="text-center py-2">There are no songs in your library.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import { Urls } from './../../urls';
    import { mapState } from 'vuex';

    export default {
        name: 'LibraryCard',

        computed: mapState(['client']),

        data () {
            return {
                input: '',      // The "Add a Song" input.
                library: [],    // The songs in our library.
            };
        },

        created () {
            this.fetch();
        },

        methods: {
            /**
             * Add a song to the library.
             *
             * @param  {Object}  song
             * @return {void}
             */
            addSong (song) {
                this.library.unshift(song);
            },

            /**
             * Display an error.
             *
             * @param  {mixed}  error
             * @return {void}
             */
            error (error) {
                logger(error);
            },

            /**
             * Fetch the list of songs.
             *
             * @return {void}
             */
            fetch () {
                axios.get(Urls.Ebs + this.client.channel_id + '/songs')
                .then(response => this.library = response.data.data)
                .catch(error => this.error(error));
            },

            /**
             * Add a song to the library on our backend.
             *
             * @return {void}
             */
            submit () {
                this.input = this.input.trim();

                if (this.input === '') {
                    return;
                }

                axios.post(Urls.Ebs + this.client.channel_id + '/songs', {
                    name: this.input
                })
                .then(response => {
                    this.input = '';
                    this.addSong(response.data);
                })
                .catch(error => this.error(error));
            },

            /**
             * Remove a song from the library.
             *
             * @return {void}
             */
            removeSong (index, id) {
                axios.delete(Urls.Ebs + this.client.channel_id + '/songs/' + id)
                .then(response => {
                    this.library.splice(index, 1);
                    EventBus.$emit('song-deleted', id);
                })
                .catch(error => this.error(error));
            }
        },
    }
</script>
