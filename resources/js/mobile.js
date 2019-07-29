import Mobile from './views/Mobile';
import Lang from './utils/Lang';
import Notifications from 'vue-notification';
import VueI18n from 'vue-i18n';
import Vue from 'vue';

Vue.use(Notifications);
Vue.use(VueI18n);

const i18n = new VueI18n({
    fallbackLocale: 'en',
    locale: 'en',
    messages: Lang
});

export default new Vue({
    el: '#app',
    i18n,
    render: h => h(Mobile)
});
