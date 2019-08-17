import axios from 'axios';

export default class Twitch {
    /**
     * Construct a new instance of the Twitch API helper.
     *
     * @constructor
     */
    constructor() {
        this.instance = axios.create({
            baseURL: 'https://api.twitch.tv/helix',
            headers: {
                'X-Requested-With': 'XMLHttpRequest'
            }
        });
    }

    /**
     * Gets user information from the Twitch API with the given user id.
     *
     * @param  {String}  userId
     * @return {Promise}
     */
    getUser(userId) {
        return this.instance.get(`/users?id=${userId}`);
    }

    /**
     * Sets the client id so we can actually call the Twitch API.
     *
     * @param  {String}  clientId
     * @return {Void}
     */
    setClientId(clientId) {
        this.instance.defaults.headers.common['Client-ID'] = clientId;
    }
}
