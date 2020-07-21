/**
 * Created by Jiazhan-Li on 2020/7/9.
 */

import Vue from 'vue';
import App from './App.vue';

export default ({ router } = {}) => {
    new Vue({
        el: '#app',
        router,
        render: h => h(App)
    });
}
