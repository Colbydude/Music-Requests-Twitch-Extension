import Router from 'vue-router';
import Vue from 'vue';

import Config from './../components/Config';
import Mobile from './../components/Mobile';
import VideoComponent from './../components/VideoComponent';

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '*/config.html',
            name: 'Config',
            component: Config
        },
        {
            path: '/*mobile.html',
            name: 'Mobile',
            component: Mobile
        },
        {
            path: '*/video_component.html',
            name: 'VideoComponent',
            component: VideoComponent
        }
    ],
    mode: 'history'
});
