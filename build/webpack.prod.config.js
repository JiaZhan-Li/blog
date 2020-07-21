/**
 * Created by Jiazhan-Li on 2020/6/23.
 */

const merge = require('webpack-merge');
const baseConfig = require('./webpack.base.config');

module.exports = (env) => {
    return merge(baseConfig(env), {
        plugins: [
            // 分析打包后的信息
            ...(
                process.env.npm_config_report
                    ? [new (require('webpack-bundle-analyzer').BundleAnalyzerPlugin)()]
                    : []
            ),
        ]
    });
};