const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const rootPath = process.cwd()
const entry = "src/index.tsx"

module.exports = {
    entry: path.resolve(rootPath, entry),
    output: {
        filename: '[name].[chunkhash:8].js',
        path: path.resolve(rootPath, 'gui'),
        publicPath: '/',
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.jsx', '.js'],
        modules: [path.resolve(rootPath, 'src'), 'node_modules'],
    },
    module: {
        rules: [
            {
                test: /\.(t|j)sx?$/,
                use: ['babel-loader'],
                exclude: /node_modules/
            },
            {
                test: /\.css$/,
                use: [
                  'style-loader', // 将 JS 字符串生成为 style 节点
                  'css-loader', // 将 CSS 转化成 CommonJS 模块
                ]
            }
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: '[name].[contenthash:8].css'
        }),
        new HtmlWebpackPlugin({
            template: path.resolve(rootPath, 'static/index.html'),
            filename: 'index.html'
        })
    ]
}