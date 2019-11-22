const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const AppManifestWebpackPlugin = require('app-manifest-webpack-plugin');

module.exports = {
    mode: process.env.NODE_ENV || 'development',
    context: path.resolve('src'),
    entry: {
        bundle: ['babel-polyfill', './app/index.js', './app/styles/index.scss'],
        sw: ['babel-polyfill', './sw/index.js'],
    },
    plugins: [
        new CleanWebpackPlugin({ cleanOnceBeforeBuildPatterns: ['**/*', '!.gitkeep'] }),
        new HtmlWebpackPlugin({
            template: './template.ejs',
            title: 'daily',
            excludeChunks: ['sw'],
        }),
        new AppManifestWebpackPlugin ({
            logo: './assets/images/logo.png',
            output: 'assets/',
            prefix: '/assets',
            persistentCache: false,
            config: {
                appName: 'daily',
                appDescription: '',
                background: '#00000000',
                theme_color: '#fff',
                start_url: '/',
            },
        }),
    ],
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: 'babel-loader',
            },
            {
                test: /\.scss$/,
                use: [
                    'style-loader',
                    'css-loader',
                    'sass-loader',
                ],
            },
        ],
    },
    devtool: 'source-map',
    devServer: {
        stats: 'errors-only',
    },
};
