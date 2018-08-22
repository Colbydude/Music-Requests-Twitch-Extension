module.exports = {
    methods: {
        /**
         * Display an error.
         *
         * @param  {mixed}  error
         * @return {void}
         */
        error (error) {
            logger(error);
        }
    }
}
