<script>
    import TwitchPubSub from './TwitchPubSub';
    import { isEmpty } from 'lodash';

    export default {
        name: 'RequestQueue',
        extends: TwitchPubSub,

        data () {
            return {
                currentRequest: null,   // Value of the current request textbox.
                lastPlayed: null,       // The last played request.
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
            this.getCurrentRequest();
            this.getRequests();
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

                this.requests.push(request);
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
                .catch(error => this.error(error));
            },

            /**
             * Get the requests from our backend.
             *
             * @return {void}
             */
            getRequests () {
                this.$api.Ebs.getRequests()
                .then(response => this.requests = response.data)
                .catch(error => this.error(error));
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
                    case 'Song Requested': this.addRequest(message); break;
                    case 'Song Skipped': this.removeRequest(message); break;
                }
            },

            /**
             * Remove a request from the list.
             *
             * @param  {Object}  request
             * @return {void}
             */
            removeRequest (request) {
                let item = this.requests.find(item => item.id === request.id);

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
