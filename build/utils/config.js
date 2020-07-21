/**
 * Created by Jiazhan-Li on 2020/7/1.
 */

const os = require('os');

module.exports = {
    // 开发环境
    dev: {
        host: os.type().toUpperCase().includes('WINDOWS') ? '127.0.0.1' : '0.0.0.0',
        basePort: 8080,
    },

    // 生产环境
    prod: {}
};