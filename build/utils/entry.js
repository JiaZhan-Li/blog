/**
 * Created by Jiazhan-Li on 2020/6/23.
 */

const path = require('path');
const fs = require('fs');

const pagesRootDir = path.resolve(__dirname, '../../src/pages/'); // 页面根目录
let entryNamesCache = null; // 缓存入口文件名

/**
 * 获取入口文件名
 * @returns ex: ['entryName1', 'entryName2']
 */
exports.getEntryNames = () => {
    if (!entryNamesCache) {
        // 当 npm 命令中带 --dir=xxx 参数时忽略除 xxx 以外当其他入口文件
        const dirList = process.env.npm_config_dir ? process.env.npm_config_dir.split(',') : null;
        entryNamesCache = fs.readdirSync(pagesRootDir).filter((name) => {
            const fullPath = path.posix.join(pagesRootDir, name, 'index.js');
            return (!dirList || dirList.includes(name)) && fs.existsSync(fullPath);
        });
    }
    return entryNamesCache;
};

/**
 * 获取页面级入口配置
 * @returns
 */
exports.getEntryPaths = () => this.getEntryNames().reduce((acc, name) => {
    acc[name] = path.posix.join(pagesRootDir, name, 'index.js');
    return acc;
}, {});

exports.getCommonChunks = () => {};
