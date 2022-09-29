const path = require('path');
const { merge } = require('webpack-merge');
const common = require('./webpack.common.config.js');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const rootPath = process.cwd()

module.exports = merge(common, {
    mode: 'development',
    devServer: {
        static: {
            directory: path.join(__dirname, 'ui'),
        },
        port: 9000,
        compress: true,
        allowedHosts: '127.0.0.1'
    }
})