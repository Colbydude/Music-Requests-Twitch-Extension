<script>
    import TwitchPubSub from './TwitchPubSub';
    import isEmpty from 'lodash/isEmpty';

    export default {
        name: 'RequestQueue',
        extends: TwitchPubSub,

        props: {
            settings: {
                type: Object,
                required: true
            }
        },

        data () {
            return {
                currentRequest: null,   // Value of the current request textbox.
                requests: []            // The request queue.
            };
        },

        computed: {
            /**
             * Current request text.
             *
             * @return {String}
             */
            currentRequestText () {
                if (!this.currentRequest) {
                    return '';
                }

                return `${this.currentRequest.song.name} | ${this.$t('common.requested_by')}: ${this.currentRequest.twitch_username}`;
            }
        },

        mounted () {
            this.refresh();
            this.listen();
        },

        methods: {
            /**
             * Add a request to the list.
             *
             * @param  {Object}  request
             * @return {void}
             */
            addRequest (request) {
                this.$notify({
                    group: 'video-notifications',
                    title: request.song.name,
                    text: this.$t('common.requested_by') + ` ${request.twitch_username}`
                });

                if (this.settings.group_requests) {
                    let foundRequest = this.requests.find(item => item.song_id === request.song_id);

                    if (!foundRequest) {
                        this.requests.push({ amount: 1, ...request });
                    } else {
                        foundRequest.amount++;

                        const ids = foundRequest.twitch_user_id.split(',');
                        const usernames = foundRequest.twitch_username.split(',');

                        ids.push(request.twitch_user_id);
                        usernames.push(request.twitch_username);

                        foundRequest.twitch_user_id = ids.filter((v, i, a) => a.indexOf(v) === i).join(',');
                        foundRequest.twitch_username = usernames.filter((v, i, a) => a.indexOf(v) === i).join(',');

                        this.requests.sort((a, b) =>  {
                            if (a.amount === b.amount) {
                                return b.created_at - a.created_at;
                            }

                            return b.amount > a.amount ? 1 : -1;
                        });
                    }
                } else {
                    this.requests.push(request);
                }
            },

            /**
             * Clear the request list.
             *
             * @return {void}
             */
            clear () {
                this.requests = [];
                this.currentRequest = '';
            },

            /**
             * Get the current request.
             *
             * @return {void}
             */
            getCurrentRequest () {
                this.$api.Ebs.getCurrentRequest()
                .then(response => {
                    if (!isEmpty(response.data)) {
                        this.currentRequest = response.data;
                    }
                })
                .catch(error => logger(error));
            },

            /**
             * Get the requests from our backend.
             *
             * @return {void}
             */
            getRequests () {
                this.$api.Ebs.getRequests()
                .then(response => this.requests = response.data)
                .catch(error => logger(error));
            },

            /**
             * Callback for when a PubSub message is received.
             *
             * @param  {Object}  message
             * @return {void}
             */
            onPubSub (message) {
                logger(message);

                if (!message.header) {
                    return;
                }

                switch (message.header) {
                    case 'Current Request Updated': this.setCurrentRequest(message); break;
                    case 'Requests Cleared': this.clear(); break;
                    case 'Settings Saved': this.refresh(); break;
                    case 'Song Requested': this.addRequest(message); break;
                    case 'Song Skipped': this.removeRequest(message); break;
                }
            },

            /**
             * Get the current request and request queue.
             *
             * @return {void}
             */
            refresh () {
                this.getCurrentRequest();
                this.getRequests();
            },

            /**
             * Remove a request from the list.
             *
             * @param  {Object}  request
             * @return {void}
             */
            removeRequest (request) {
                let item;

                if (this.settings.group_requests) {
                    item = this.requests.find(item => item.song_id === request.song_id);
                }
                else {
                    item = this.requests.find(item => item.id === request.id);
                }

                if (item) {
                    this.requests.splice(this.requests.indexOf(item), 1);
                }
            },

            /**
             * Set the current request.
             *
             * @param  {Object}  request
             * @return {void}
             */
            setCurrentRequest (request) {
                this.currentRequest = request;
                this.removeRequest(request);
            }
        }
    }
</script>
