/**
 * Created by Jiazhan-Li on 2020/6/23.
 */

const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const { getEntryPaths, getEntryNames } = require('./utils/entry');
const { getOutputForJs } = require('./utils/output');

const resolve = (dir) => path.resolve(__dirname, '../', dir);

/**
 * 导出为一个函数
 * @param env: development | production
 */
module.exports = (env = 'development') => {
    return {
        mode: env,

        context: path.resolve(__dirname, '../'),

        devtool: env === 'development' ? 'eval-source-map' : 'source-map',

        entry: getEntryPaths(),

        output: getOutputForJs(env),

        resolve: {
            extensions: ['.js', '.vue', '.json'],

            alias: {
                '@': resolve('src'),
            }
        },

        optimization: {
            runtimeChunk: true, // 输出 runtime

            splitChunks: {
                chunks: 'all',
                minSize: 30000,
                maxSize: 0,
                minChunks: 1,
                maxAsyncRequests: 5,
                maxInitialRequests: 3,
                automaticNameDelimiter: '~',
                name: true,

                // 提取公共 chunk
                cacheGroups: {
                    vendors: {
                        test: /[\\/]node_modules[\\/]/,
                        priority: -10
                    },
                    default: {
                        minChunks: 2,
                        priority: -20,
                        reuseExistingChunk: true
                    }
                }
            },
        },

        module: {
            rules: [
                {
                    test: /\.(vue|js)$/,
                    loader: 'eslint-loader',
                    include: [resolve('src')],
                    enforce: 'pre',
                    options: {
                        formatter: require('eslint-friendly-formatter'),
                        emitWarning: true
                    }
                },

                {
                    test: /\.js$/,
                    loader: 'babel-loader',
                    include: [resolve('src')],
                    exclude: [resolve('node_modules')],
                    options: {
                        // 仅在测试环境开启
                        cacheDirectory: env === 'development'
                    }
                },

                {
                    test: /\.vue$/,
                    loader: 'vue-loader'
                },

                {
                    test: /\.css$/,
                    use: [
                        {
                            loader: MiniCssExtractPlugin.loader,
                            options: {
                                publicPath: '/'
                            }
                        },
                        {
                            loader: 'css-loader',
                            options: {
                                importLoaders: 1,
                                sourceMap: env === 'development',
                                modules: {
                                    localIdentName: '[name]__[local]--[hash:base64:5]',
                                }
                            }
                        },
                        'postcss-loader'
                    ]
                },

                {
                    test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                    loader: 'url-loader',
                    options: {
                        limit: 10000,
                        name: `img/[name]${ env === 'production' ? '.[hash:5]' : ''}.[ext]`
                    }
                },
            ]
        },

        plugins: [
            new CleanWebpackPlugin(),

            new VueLoaderPlugin(),

            new MiniCssExtractPlugin({
                filename: `css/[name]${ env === 'production' ? '.[contenthash:5]' : ''}.css`,
                chunkFilename: `css/[id]${ env === 'production' ? '.[contenthash:5]' : ''}.css`,
            }),

            ...getEntryNames().map((name) => {
                return new HtmlWebpackPlugin({
                    filename: `${name}.html`,
                    template: 'index.html',
                    chunks: [name],
                    inject: true,
                });
            }),
        ]
    };
};