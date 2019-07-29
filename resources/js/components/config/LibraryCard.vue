<template>
    <div>
        <div class="card">
            <div class="card-interior">
                <div class="card-header">
                    <h3>{{ $t('config.library') }}</h3>
                </div>
                <div class="mb-4">
                    <label for="current_request">
                        {{ $t('config.library_add_song') }}
                    </label>
                    <div class="flex">
                        <input @keydown.enter="submit" v-model="input" class="form-control w-full" type="text">
                        <button @click="submit" class="flex-no-shrink btn btn-blue-dark ml-2">
                            {{ $t('common.add') }}
                        </button>
                    </div>
                </div>
                <div class="border-t border-b rounded sm:border">
                    <div class="border-b">
                        <div class="flex px-4 -mb-px">
                            <h4 class="font-normal py-4 font-semibold text-lg">{{ $t('common.songs') }}</h4>
                        </div>
                    </div>
                    <div class="border-b">
                        <div class="flex px-4 py-2">
                            <div class="w-full text-sm font-bold">{{ $t('common.song') }}</div>
                            <div class="flex-no-shrink text-sm font-bold ml-2">{{ $t('common.actions') }}</div>
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
                            <p class="text-center py-2">{{ $t('config.library_empty') }}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'LibraryCard',

        data () {
            return {
                input: '',      // The "Add a Song" input.
                library: [],    // The songs in our library.
            };
        },

        mounted () {
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
             * Fetch the list of songs.
             *
             * @return {void}
             */
            fetch () {
                this.$api.Ebs.getSongs()
                .then(response => this.library = response.data.data)
                .catch(error => this.log(error));
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

                this.$api.Ebs.postSongs(this.input)
                .then(response => {
                    this.input = '';
                    this.addSong(response.data);
                })
                .catch(error => this.log(error));
            },

            /**
             * Remove a song from the library.
             *
             * @return {void}
             */
            removeSong (index, id) {
                this.$api.Ebs.deleteSong(id)
                .then(() => this.library.splice(index, 1))
                .catch(error => this.log(error));
            }
        },
    }
</script>
