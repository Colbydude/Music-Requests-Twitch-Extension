import axios from 'axios';

export default class Ebs {
    /**
     * Construct a new instance of the EBS helper.
     *
     * @constructor
     */
    constructor () {
        this.channelId = "";
        this.instance = axios.create({
            baseURL: process.env.MIX_EBS_URL,
            headers: {
                'X-Requested-With': 'XMLHttpRequest'
            }
        });
    }

    /**
     * Delete/skip the given request on the EBS.
     *
     * @param  {Number}  id
     * @return {Promise}
     */
    deleteRequest(id) {
        return this.instance.delete(`/${this.channelId}/requests/${id}`);
    }

    /**
     * Clear all requests for the user on the EBS.
     *
     * @return {Promise}
     */
    deleteRequests() {
        return this.instance.delete(`/${this.channelId}/requests`);
    }

    /**
     * Delete the given song from the user's library.
     *
     * @param  {Number}  id
     * @return {Promise}
     */
    deleteSong(id) {
        return this.instance.delete(`/${this.channelId}/songs/${id}`);
    }

    /**
     * Fetches the current request for the channel.
     *
     * @return {Promise}
     */
    getCurrentRequest() {
        return this.instance.get(`/${this.channelId}/requests/current`);
    }

    /**
     * Fetches the current axios instance.
     *
     * @return {Axios};
     */
    getInstance() {
        return this.instance;
    }

    /**
     * Get the requests in the queue from the EBS.
     *
     * @return {Promise}
     */
    getRequests() {
        return this.instance.get(`/${this.channelId}/requests`);
    }

    /**
     * Get the extension settings for the given channel from the EBS.
     *
     * @param  {Object}  params
     * @return {Promise}
     */
    getSettings(params = {}) {
        return this.instance.get(`/${this.channelId}`, {
            params
        });
    }

    /**
     * Get the user's song library from the EBS.
     *
     * @return {Promise}
     */
    getSongs() {
        return this.instance.get(`/${this.channelId}/songs`);
    }

    /**
     * Post/play the given request on the EBS
     *
     * @param  {Number}  id
     * @return {Promise}
     */
    postCurrentRequest(request_id) {
        return this.instance.post(`/${this.channelId}/requests/current`, { request_id });
    }

    /**
     * Post a new request on the EBS.
     *
     * @param  {Number}  song_id
     * @param  {String}  twitch_user_id
     * @param  {String}  twitch_username
     * @return {Promise}
     */
    postRequest(song_id, twitch_user_id, twitch_username) {
        return this.instance.post(`/${this.channelId}/requests`, {
            song_id,
            twitch_user_id,
            twitch_username
        });
    }

    /**
     * "Register" the user on our EBS.
     *
     * @param  {String}  username
     * @return {Promise}
     */
    postSettings(username) {
        return this.instance.post('/', {
            channel_id: this.channelId,
            username
        });
    }

    /**
     * Post a new song to the library on the EBS.
     *
     * @param  {String}  name
     * @return {Promise}
     */
    postSongs(name) {
        return this.instance.post(`/${this.channelId}/songs`, { name });
    }

    /**
     * Save the user's settings on the EBS.
     *
     * @param  {Object}  settings
     * @return {Promise}
     */
    putSettings(settings = {}) {
        return this.instance.put(`/${this.channelId}`, settings);
    }

    /**
     * Sets the channel id to be used with EBS requests.
     *
     * @param  {String}  channelId
     * @return {Void}
     */
    setChannelId(channelId) {
        this.channelId = channelId;
    }

    /**
     * Sets the JWT from Twitch to be used with EBS requests.
     *
     * @param  {String}  token
     * @return {Void}
     */
    setToken(token) {
        this.instance.defaults.headers.common.Authorization = `Bearer ${token}`;
    }

    /**
     * Return a URL based off the baseUrl.
     *
     * @param  {String}  path
     * @return {String}
     */
    url(path) {
        return process.env.MIX_EBS_URL + path;
    }
}
