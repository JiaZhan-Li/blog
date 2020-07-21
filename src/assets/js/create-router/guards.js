/**
 * Created by Jiazhan-Li on 2020/7/9.
 */

export default (router) => {
    // 全局前置守卫
    router.beforeEach((to, from, next) => {
        // 登陆权限相关业务逻辑
        next();
    });
};
