import Router from 'vue-router';
import Vue from 'vue';

import Config from './../components/config';
import LiveConfig from './../components/live-config';
import Overlay from './../components/overlay';

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '*/config.html',
            name: 'Config',
            component: Config
        },
        {
            path: '*/live_config.html',
            name: 'Live Config',
            component: LiveConfig
        },
        {
            path: '*/overlay.html',
            name: 'Overlay',
            component: Overlay
        }
    ],
    mode: 'history'
});
