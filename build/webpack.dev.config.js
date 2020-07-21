/**
 * Created by Jiazhan-Li on 2020/6/23.
 */

const path = require('path');
const merge = require('webpack-merge');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
const portfinder = require('portfinder');
const baseConfig = require('./webpack.base.config');
const config = require('./utils/config');

module.exports = async (env) => {
    portfinder.basePort = config.dev.basePort;
    const port = await portfinder.getPortPromise();

    return merge(baseConfig(env), {
        devServer: {
            port,
            host: config.dev.host,
            disableHostCheck: true, // 搭配 host: '0.0.0.0'
            contentBase: path.join(__dirname, '../static'),
            publicPath: '/',
            hot: true,
            inline: true,
            open: !!process.env.npm_config_open || false,
            progress: true,
            quiet: true, // necessary for friendly-errors-webpack-plugin
            compress: true,
            clientLogLevel: 'warning',
            index: 'home-page.html',
            historyApiFallback: {
                rewrites: [{
                    from: /.*/,
                    to: '/home-page.html'
                }]
            },
            overlay: {
                warning: false,
                errors: true
            },
        },

        plugins: [
            new FriendlyErrorsWebpackPlugin({
                compilationSuccessInfo: {
                    messages: [`Your application is running here: http://${config.dev.host}:${port}`]
                },
            }),
        ]
    });
};