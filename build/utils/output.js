/**
 * Created by Jiazhan-Li on 7/14/20.
 */

const path = require('path');

const resolve = (dir) => path.resolve(__dirname, '../../', dir);

// bundle 输出配置
exports.getOutputForJs = (env = 'development') => {
    return {
        development: {
            path: resolve('dist'),
            filename: 'js/[name].js',
            publicPath: '/'
        },
        production: {
            path: resolve('dist'),
            filename: 'js/[name].[chunkhash:5].js',
            chunkFilename: 'js/[id].[chunkhash:5].js',
            publicPath: '/'
        }
    }[env];
};