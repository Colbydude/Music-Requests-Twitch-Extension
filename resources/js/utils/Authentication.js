import jwt from 'jsonwebtoken';

/**
 * Helper class for authentication against an EBS service. Allows the storage of a token to be accessed across componenents.
 * This is not meant to be a source of truth. Use only for presentational purposes.
 *
 * @class Authentication
 */
export default class Authentication {
    /**
     * Create a new instance of the Authentication util.
     *
     * @param  {String} token
     * @param  {String} opaque_id
     * @constructor
     */
    constructor(token, opaque_id) {
        this.channel_id = false;
        this.opaque_id = opaque_id;
        this.role = "";
        this.token = token;
        this.username = false;
        this.user_id = false;
    }

    /**
     * Fetch the auth'd opaque id.
     *
     * @return {String}
     */
    getOpaqueId() {
        return this.opaque_id;
    }

    /**
     * Fetch the auth'd user id.
     *
     * @return {String}
     */
    getUserId() {
        return this.user_id;
    }

    /**
     * Checks to ensure there is a valid token in the state.
     *
     * @return {Boolean}
     */
    isAuthenticated() {
        if (this.token && this.opaque_id) {
            return true;
        }

        return false;
    }

    /**
     * Determine whether the user is logged in or not.
     *
     * @return {Boolean}
     */
    isLoggedIn() {
        return this.opaque_id[0] === 'U' ? true : false;
    }

    /**
     * Set the token in the state.
     *
     * @param  {String}  token
     * @param  {String}  opaque_id
     * @return {Void}
     */
    setToken(token, opaque_id) {
        let channel_id = "";
        let role = "";
        let user_id = "";

        try {
            let decoded = jwt.decode(token);

            channel_id = decoded.channel_id;
            role = decoded.role;
            user_id = decoded.user_id;
        } catch (e) {
            token = '';
            opaque_id = '';
        }

        this.channel_id = channel_id;
        this.opaque_id = opaque_id;
        this.role = role;
        this.token = token;
        this.user_id = user_id;
    }

    /**
     * Sets the username in the state.
     *
     * @param  {String}  username
     * @return {Void}
     */
    setUsername(username) {
        this.username = username;
    }
}
