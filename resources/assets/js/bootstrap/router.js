import Router from 'vue-router';
import Vue from 'vue';

import Component from './../components/component';
import Config from './../components/config';
import LiveConfig from './../components/live-config';

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '*/component.html',
            name: 'Component',
            component: Component
        },
        {
            path: '*/config.html',
            name: 'Config',
            component: Config
        },
        {
            path: '*/live_config.html',
            name: 'Live Config',
            component: LiveConfig
        }
    ],
    mode: 'history'
});
