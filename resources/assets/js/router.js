import Router from 'vue-router';
import Vue from 'vue';

import config from './components/config';
import live_config from './components/live_config';
import viewer from './components/viewer';

Vue.use(Router)

export default new Router({
    routes: [
        {
            path: '*/config.html',
            name: 'Config',
            component: config
        },
        {
            path: '*/live_config.html',
            name: 'Live Config',
            component: live_config
        },
        {
            path: '*/viewer.html',
            name: 'Viewer',
            component: viewer
        }
    ],
    mode: 'history'
})
