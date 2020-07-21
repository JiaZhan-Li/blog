/**
 * Created by Jiazhan-Li on 2020/7/10.
 */

const fs = require('fs');

module.exports = {
    plugins: [
        require('postcss-assets')({
            loadPaths: ['src/assets/img'],
            relative: true
        }),

        require('postcss-preset-env')({
            stage: 1, // 支持的垫片功能：http://preset-env.cssdb.org/features#stage-1
            importFrom: 'src/assets/styles/variable.css', // 全局引入变量，无需 postcss-import 插件
            preserve: false, // 在没有 postcss-import 插件支持，且没有设置 exportTo 参数的情况下必须设置为 false，否则在高级浏览器会有问题
        }),
    ]
};
