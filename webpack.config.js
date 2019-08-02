'use strict';

const path = require('path');
const mode = process.env.NODE_ENV || 'production';
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');

const config = {
    mode: mode,
    entry: {
        index: './src/index.ts'
    },
    output: {
        filename: '[name].js',
        publicPath: '/dist/',
        path: path.resolve(__dirname, './dist'),
        libraryTarget: 'umd',
        pathinfo: true,
        umdNamedDefine: true
    },
    devtool: 'inline-source-map',
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                loader: 'ts-loader',
            }
        ]
    },
    resolve: {
        extensions: [ '.ts', '.tsx', '.js', '.css', '.json' ],
        plugins: [ new TsconfigPathsPlugin({ configFile: './tsconfig.json' }) ],
    },
};

module.exports = config;