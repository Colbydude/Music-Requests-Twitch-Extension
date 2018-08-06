import Router from 'vue-router';
import Vue from 'vue';

import Config from './../components/config';
import LiveConfig from './../components/live-config';
import VideoComponent from './../components/video-component';

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
            name: 'LiveConfig',
            component: LiveConfig
        },
        {
            path: '*/video_component.html',
            name: 'VideoComponent',
            component: VideoComponent
        }
    ],
    mode: 'history'
});
