/**
 * Created by Jiazhan-Li on 2020/7/9.
 */

import Vue from 'vue';
import VueRouter from 'vue-router';
import globalRouter from './global-routes';
import guards from './guards';

Vue.use(VueRouter);

export default (pageRoutes = []) => {
    const router = new VueRouter({
        mode: 'hash',
        routes: pageRoutes.concat(globalRouter), // 合并页面路由和通用路由
        scrollBehavior() {
            return {
                x: 0,
                y: 0
            }
        }
    });

    guards(router); // 全局路由守卫

    return router;
};