import axios from 'axios';
import { EventBus } from './event-bus';

export default function () {
    if (window.Twitch.ext) {
        window.Twitch.ext.onAuthorized(function (auth) {
            console.log(auth);
            EventBus.$emit('authentication-verified', auth);
        });

        window.Twitch.ext.onContext(function (context, contextFields) {
            console.log(context);
            console.log(contextFields);
        });

        window.Twitch.ext.onError(function (err) {
            console.error(err);
        });
    }
}
